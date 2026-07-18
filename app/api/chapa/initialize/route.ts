import { calculateOrder, chapaEndpoint, getChapaSecret, isValidEthiopianPhone, normalizePhone, type CartLine } from "../../../lib/chapa";

type InitializeBody = {
  items?: CartLine[];
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
};

function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function chapaErrorMessage(value: unknown) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const first = Object.values(value).flat().find((entry) => typeof entry === "string");
    if (typeof first === "string") return first;
  }
  return "Chapa could not initialize this test payment.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as InitializeBody;
    const fullName = body.customer?.fullName?.trim() ?? "";
    const email = body.customer?.email?.trim().toLowerCase() ?? "";
    const phone = normalizePhone(body.customer?.phone ?? "");

    if (fullName.length < 2 || fullName.length > 70) return errorResponse("Enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 100) return errorResponse("Enter a valid email address.");
    if (!isValidEthiopianPhone(phone)) return errorResponse("Use an Ethiopian phone number beginning with 09 or 07.");

    const order = calculateOrder(body.items ?? []);
    const [firstName, ...remainingNames] = fullName.split(/\s+/);
    const lastName = remainingNames.join(" ") || "Customer";
    const txRef = `jebena-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const appUrl = (process.env.APP_URL?.trim() || new URL(request.url).origin).replace(/\/$/, "");
    const returnUrl = `${appUrl}/cart?chapa=return&tx_ref=${encodeURIComponent(txRef)}`;

    const chapaResponse = await fetch(chapaEndpoint("/transaction/initialize"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getChapaSecret()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: String(order.amount),
        currency: "ETB",
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        tx_ref: txRef,
        return_url: returnUrl,
        customization: {
          title: "Jebena",
          description: "Ethiopian coffee ceremony pieces",
        },
        meta: {
          payment_reason: "Jebena sandbox order",
          invoices: order.items.map((item) => ({ key: item.name, value: `${item.quantity} piece${item.quantity === 1 ? "" : "s"}` })),
        },
      }),
      cache: "no-store",
    });

    const data = await chapaResponse.json().catch(() => null) as { status?: string; message?: unknown; data?: { checkout_url?: string } } | null;
    const checkoutUrl = data?.data?.checkout_url;

    if (!chapaResponse.ok || data?.status !== "success" || !checkoutUrl) {
      return errorResponse(chapaErrorMessage(data?.message), 502);
    }

    const parsedCheckoutUrl = new URL(checkoutUrl);
    if (parsedCheckoutUrl.protocol !== "https:" || !parsedCheckoutUrl.hostname.endsWith("chapa.co")) {
      return errorResponse("Chapa returned an invalid checkout address.", 502);
    }

    return Response.json({ checkoutUrl, txRef });
  } catch (error) {
    if (error instanceof Error && error.message === "CHAPA_NOT_CONFIGURED") {
      return errorResponse("Chapa Test Mode is not configured on this computer.", 503);
    }
    if (error instanceof Error && error.message === "CHAPA_TEST_KEY_REQUIRED") {
      return errorResponse("A Chapa Test Mode secret key is required.", 503);
    }
    if (error instanceof Error && ["EMPTY_CART", "INVALID_CART", "INVALID_PRODUCT"].includes(error.message)) {
      return errorResponse("The cart could not be validated. Refresh and try again.");
    }
    return errorResponse("The Chapa test payment could not be started.", 500);
  }
}
