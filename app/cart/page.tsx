import type { Metadata } from "next";
import { CartMock } from "../components/CartMock";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <main className="inner-page">
      <header className="page-header">
        <p className="eyebrow">Your selection</p>
        <h1>Shopping cart</h1>
        <p>Complete a secure Chapa Test Mode checkout. No real money will be collected.</p>
      </header>
      <CartMock />
    </main>
  );
}
