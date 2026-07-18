"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { FiAlertCircle, FiArrowLeft, FiArrowRight, FiCheckCircle, FiLoader, FiLock, FiMinus, FiPlus, FiSmartphone, FiTrash2, FiX } from "react-icons/fi";
import { SiPaypal } from "react-icons/si";

const initialItems = [
  { id: 1, name: "Classic Jebena", detail: "Coffee · Burnished clay", price: 4500, quantity: 1, image: "/images/product-placeholder.jpg" },
  { id: 3, name: "Ceremony Sini Set", detail: "Terracotta · Glazed ceramic", price: 2900, quantity: 1, image: "/images/sample-3.jpg" },
];

type CheckoutStep = "closed" | "methods" | "details" | "redirecting" | "verifying" | "complete" | "failed";

function formatBirr(value: number) {
  return `ETB ${value.toLocaleString()}`;
}

function cleanPaymentQuery() {
  const url = new URL(window.location.href);
  url.searchParams.delete("chapa");
  url.searchParams.delete("tx_ref");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function CartMock() {
  const [items, setItems] = useState(initialItems);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("closed");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifiedReference, setVerifiedReference] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txRef = params.get("tx_ref");
    if (params.get("chapa") !== "return" || !txRef) return;
    setCheckoutStep("verifying");
    void verifyTransaction(txRef);
  }, []);

  function changeQuantity(id: number, delta: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  }

  async function verifyTransaction(txRef: string) {
    try {
      const response = await fetch("/api/chapa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txRef }),
      });
      const result = await response.json() as { verified?: boolean; status?: string; reference?: string; error?: string; message?: string };
      if (!response.ok) throw new Error(result.error || "Chapa could not verify the transaction.");

      if (result.verified) {
        setVerifiedReference(result.reference || txRef);
        setCheckoutStep("complete");
      } else {
        setErrorMessage(result.status === "pending" ? "This test payment is still pending. You can return and try again shortly." : result.message || "The Chapa test payment was not completed.");
        setCheckoutStep("failed");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "The Chapa test payment could not be verified.");
      setCheckoutStep("failed");
    } finally {
      cleanPaymentQuery();
    }
  }

  async function submitChapaPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setCheckoutStep("redirecting");

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/chapa/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ id, quantity }) => ({ id, quantity })),
          customer: {
            fullName: form.get("fullName"),
            phone: form.get("phone"),
            email: form.get("email"),
          },
        }),
      });
      const result = await response.json() as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Chapa could not start the test payment.");
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Chapa could not start the test payment.");
      setCheckoutStep("details");
    }
  }

  function closeCheckout() {
    cleanPaymentQuery();
    setCheckoutStep("closed");
    setErrorMessage("");
  }

  function goBack() {
    if (checkoutStep === "details") setCheckoutStep("methods");
    else closeCheckout();
  }

  return (
    <>
      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {items.length ? items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-thumb"><Image src={item.image} alt={item.name} fill sizes="120px" /></div>
              <div className="cart-item-copy"><h2>{item.name}</h2><p>{item.detail}</p><strong>{formatBirr(item.price)}</strong></div>
              <div className="cart-item-actions"><div className="quantity-control"><button type="button" aria-label="Decrease" onClick={() => changeQuantity(item.id, -1)}><FiMinus /></button><span>{item.quantity}</span><button type="button" aria-label="Increase" onClick={() => changeQuantity(item.id, 1)}><FiPlus /></button></div><button className="remove-button" type="button" aria-label={`Remove ${item.name}`} onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}><FiTrash2 /></button></div>
            </article>
          )) : <div className="empty-state"><h2>Your cart is empty</h2><p>Find a piece that feels like home.</p><Link href="/shop">Browse the shop</Link></div>}
        </section>
        <aside className="order-summary">
          <p className="eyebrow">Your order</p><h2>Summary</h2>
          <div><span>Subtotal</span><strong>{formatBirr(subtotal)}</strong></div>
          <div><span>Shipping</span><span>Calculated at checkout</span></div>
          <div className="summary-total"><span>Total</span><strong>{formatBirr(subtotal)}</strong></div>
          <button type="button" disabled={!items.length} onClick={() => setCheckoutStep("methods")}>Continue to checkout <FiArrowRight /></button>
          <Link href="/shop">Continue shopping</Link>
        </aside>
      </div>

      {checkoutStep !== "closed" && (
        <div className="checkout-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <section className="checkout-modal">
            <div className="checkout-topbar">
              {!["complete", "verifying", "redirecting"].includes(checkoutStep) ? <button type="button" onClick={goBack}><FiArrowLeft /> Back</button> : <span />}
              <button className="checkout-close" type="button" aria-label="Close checkout" onClick={closeCheckout}><FiX /></button>
            </div>

            {checkoutStep === "methods" && (
              <div className="checkout-content">
                <p className="eyebrow">Secure test checkout</p>
                <h2 id="checkout-title">Choose how to pay.</h2>
                <p>Chapa is connected in Test Mode. No real money will be collected.</p>
                <div className="payment-methods">
                  <button type="button" onClick={() => setCheckoutStep("details")}><span className="chapa-mark"><FiSmartphone /> Chapa</span><small>Test cards, banks, and mobile money</small><FiArrowRight /></button>
                  <button className="payment-coming-soon" type="button" disabled><span className="paypal-mark"><SiPaypal /> PayPal</span><small>Sandbox connection coming soon</small><span>Coming soon</span></button>
                </div>
                <div className="checkout-security"><FiLock /> Chapa Test Mode · server-verified checkout</div>
              </div>
            )}

            {checkoutStep === "details" && (
              <form className="checkout-content checkout-form" onSubmit={submitChapaPayment}>
                <p className="eyebrow">Chapa Test Mode</p>
                <h2 id="checkout-title">Continue with Chapa.</h2>
                <p>{formatBirr(subtotal)} · You will continue to Chapa’s secure sandbox checkout.</p>
                <label>Full name<input name="fullName" type="text" autoComplete="name" placeholder="Your full name" required /></label>
                <label>Phone number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="0912 345 678" required /></label>
                <label>Email receipt<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                {errorMessage && <div className="checkout-error" role="alert"><FiAlertCircle /> {errorMessage}</div>}
                <button className="checkout-submit" type="submit">Pay {formatBirr(subtotal)} with Chapa <FiLock /></button>
                <small>Sandbox only. No real charge will be made.</small>
              </form>
            )}

            {(checkoutStep === "redirecting" || checkoutStep === "verifying") && (
              <div className="checkout-content checkout-loading">
                <FiLoader />
                <p className="eyebrow">Chapa Test Mode</p>
                <h2 id="checkout-title">{checkoutStep === "redirecting" ? "Opening secure checkout…" : "Verifying your payment…"}</h2>
                <p>Please keep this window open while the sandbox transaction is checked.</p>
              </div>
            )}

            {checkoutStep === "complete" && (
              <div className="checkout-content checkout-complete">
                <FiCheckCircle />
                <p className="eyebrow">Payment verified</p>
                <h2 id="checkout-title">Your test order is confirmed.</h2>
                <p>Chapa verified the sandbox transaction successfully. No real money was collected.</p>
                {verifiedReference && <small>Reference: {verifiedReference}</small>}
                <button type="button" onClick={closeCheckout}>Return to cart</button>
              </div>
            )}

            {checkoutStep === "failed" && (
              <div className="checkout-content checkout-failed">
                <FiAlertCircle />
                <p className="eyebrow">Payment not verified</p>
                <h2 id="checkout-title">Let’s try that again.</h2>
                <p>{errorMessage}</p>
                <button type="button" onClick={() => setCheckoutStep("methods")}>Return to payment options</button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
