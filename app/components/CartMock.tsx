"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiLock, FiMinus, FiPlus, FiSmartphone, FiTrash2, FiX } from "react-icons/fi";
import { SiPaypal } from "react-icons/si";

const initialItems = [
  { id: 1, name: "Classic Jebena", detail: "Coffee · Burnished clay", price: 4500, quantity: 1, image: "/images/product-placeholder.jpg" },
  { id: 2, name: "Ceremony Sini Set", detail: "Terracotta · Glazed ceramic", price: 2900, quantity: 1, image: "/images/sample-3.jpg" },
];

type PaymentMethod = "chapa" | "paypal";
type CheckoutStep = "closed" | "methods" | "details" | "complete";

function formatBirr(value: number) {
  return `ETB ${value.toLocaleString()}`;
}

export function CartMock() {
  const [items, setItems] = useState(initialItems);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("closed");
  const [method, setMethod] = useState<PaymentMethod>("chapa");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function changeQuantity(id: number, delta: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  }

  function chooseMethod(nextMethod: PaymentMethod) {
    setMethod(nextMethod);
    setCheckoutStep("details");
  }

  function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutStep("complete");
  }

  function goBack() {
    if (checkoutStep === "details") setCheckoutStep("methods");
    else setCheckoutStep("closed");
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
              {checkoutStep !== "complete" ? <button type="button" onClick={goBack}><FiArrowLeft /> Back</button> : <span />}
              <button className="checkout-close" type="button" aria-label="Close checkout" onClick={() => setCheckoutStep("closed")}><FiX /></button>
            </div>

            {checkoutStep === "methods" && (
              <div className="checkout-content">
                <p className="eyebrow">Secure mock checkout</p>
                <h2 id="checkout-title">Choose how to pay.</h2>
                <p>Select a developer-mode payment experience. No real charge will be made.</p>
                <div className="payment-methods">
                  <button type="button" onClick={() => chooseMethod("chapa")}><span className="chapa-mark"><FiSmartphone /> Chapa</span><small>Cards, bank, and mobile money</small><FiArrowRight /></button>
                  <button type="button" onClick={() => chooseMethod("paypal")}><span className="paypal-mark"><SiPaypal /> PayPal</span><small>Pay with your PayPal account</small><FiArrowRight /></button>
                </div>
                <div className="checkout-security"><FiLock /> Developer-mode payment preview</div>
              </div>
            )}

            {checkoutStep === "details" && (
              <form className="checkout-content checkout-form" onSubmit={submitPayment}>
                <p className="eyebrow">{method === "chapa" ? "Chapa checkout" : "PayPal checkout"}</p>
                <h2 id="checkout-title">{method === "chapa" ? "Complete with Chapa." : "Continue with PayPal."}</h2>
                <p>{formatBirr(subtotal)} · No real payment will be processed.</p>
                {method === "chapa" ? (
                  <><label>Full name<input type="text" placeholder="Your name" required /></label><label>Phone number<input type="tel" placeholder="+251 9__ ___ ___" required /></label><label>Email receipt<input type="email" placeholder="you@example.com" required /></label></>
                ) : (
                  <><label>PayPal email<input type="email" placeholder="you@example.com" required /></label><label>Password<input type="password" placeholder="••••••••" minLength={6} required /></label></>
                )}
                <button className="checkout-submit" type="submit">Pay {formatBirr(subtotal)} <FiLock /></button>
                <small>This is a UI preview. Chapa and PayPal APIs are not connected yet.</small>
              </form>
            )}

            {checkoutStep === "complete" && (
              <div className="checkout-content checkout-complete">
                <FiCheckCircle />
                <p className="eyebrow">Payment preview complete</p>
                <h2 id="checkout-title">Your order looks good.</h2>
                <p>The mock {method === "chapa" ? "Chapa" : "PayPal"} payment completed successfully. No charge was made.</p>
                <button type="button" onClick={() => setCheckoutStep("closed")}>Return to cart</button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
