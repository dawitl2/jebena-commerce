import { chapaEndpoint, getChapaSecret, isValidTransactionReference } from "../../../lib/chapa";

type VerifyBody = { txRef?: string };

export async function POST(request: Request) {
  try {
    const body = await request.json() as VerifyBody;
    const txRef = body.txRef?.trim() ?? "";
    if (!isValidTransactionReference(txRef)) {
      return Response.json({ error: "The transaction reference is invalid." }, { status: 400 });
    }

    const chapaResponse = await fetch(chapaEndpoint(`/transaction/verify/${encodeURIComponent(txRef)}`), {
      headers: { Authorization: `Bearer ${getChapaSecret()}` },
      cache: "no-store",
    });
    const data = await chapaResponse.json().catch(() => null) as { status?: string; message?: string; data?: { status?: string; reference?: string } } | null;

    if (!chapaResponse.ok || !data) {
      return Response.json({ error: data?.message || "Chapa could not verify this transaction." }, { status: 502 });
    }

    const status = String(data.data?.status || data.status || "pending").toLowerCase();
    return Response.json({
      status,
      verified: status === "success",
      reference: data.data?.reference || txRef,
      message: data.message || "Transaction checked.",
    });
  } catch (error) {
    if (error instanceof Error && ["CHAPA_NOT_CONFIGURED", "CHAPA_TEST_KEY_REQUIRED"].includes(error.message)) {
      return Response.json({ error: "Chapa Test Mode is not configured correctly." }, { status: 503 });
    }
    return Response.json({ error: "The transaction could not be verified." }, { status: 500 });
  }
}
