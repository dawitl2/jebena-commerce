"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

export function ProductActions({ slug, customizable }: { slug: string; customizable: boolean }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="product-actions">
      <div className="quantity-control" aria-label="Quantity">
        <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><FiMinus /></button>
        <span>{quantity}</span>
        <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><FiPlus /></button>
      </div>
      <button className="add-button" type="button" onClick={() => setAdded(true)}>{added ? <><FiCheck /> Added to mock cart</> : <><FiShoppingBag /> Add to cart</>}</button>
      {customizable && <Link className="outline-button" href={`/customize?product=${slug}`}>Customize this piece</Link>}
      {added && <Link className="go-cart-link" href="/cart">View cart →</Link>}
    </div>
  );
}
