"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiShoppingBag } from "react-icons/fi";

const pieceOptions = ["Classic Jebena", "Sini Set", "Coffee Basket"];
const materials = ["Burnished clay", "Glazed ceramic", "Natural fiber"];
const colors = [{ name: "Coffee", value: "#3d2417" }, { name: "Terracotta", value: "#a85232" }, { name: "Ochre", value: "#c88934" }, { name: "Forest", value: "#394c38" }, { name: "Ivory", value: "#e9dfcf" }];
const motifs = ["Woven lines", "Axum geometry", "Coffee leaf", "Minimal band"];

export function Customizer({ initialPiece = pieceOptions[0] }: { initialPiece?: string }) {
  const [piece, setPiece] = useState(pieceOptions.includes(initialPiece) ? initialPiece : pieceOptions[0]);
  const [material, setMaterial] = useState(materials[0]);
  const [color, setColor] = useState(colors[0]);
  const [motif, setMotif] = useState(motifs[0]);
  const [added, setAdded] = useState(false);

  return (
    <div className="customizer">
      <div className="customizer-preview">
        <div className="preview-glow" style={{ backgroundColor: color.value }} />
        <div className="preview-image"><Image src="/images/product-placeholder.jpg" alt={`Preview of ${piece}`} fill sizes="(max-width: 800px) 90vw, 48vw" /></div>
        <div className="preview-caption"><span>Live concept</span><strong>{piece}</strong><p>{color.name} · {material} · {motif}</p></div>
      </div>
      <div className="customizer-controls">
        <p className="eyebrow">Custom studio</p>
        <h1>Make the ritual yours.</h1>
        <p className="page-intro">Choose the foundation, then shape the finish. This is a visual mockup—our makers would confirm final details before production.</p>
        <fieldset><legend>1. Choose your piece</legend><div className="option-grid">{pieceOptions.map((option) => <button className={piece === option ? "selected" : ""} type="button" key={option} onClick={() => setPiece(option)}>{piece === option && <FiCheck />}{option}</button>)}</div></fieldset>
        <fieldset><legend>2. Select material</legend><div className="option-grid">{materials.map((option) => <button className={material === option ? "selected" : ""} type="button" key={option} onClick={() => setMaterial(option)}>{material === option && <FiCheck />}{option}</button>)}</div></fieldset>
        <fieldset><legend>3. Set the color</legend><div className="color-options">{colors.map((option) => <button className={color.name === option.name ? "selected" : ""} type="button" key={option.name} onClick={() => setColor(option)} aria-label={option.name}><i style={{ backgroundColor: option.value }} /><span>{option.name}</span></button>)}</div></fieldset>
        <fieldset><legend>4. Add a motif</legend><div className="option-grid motif-grid">{motifs.map((option) => <button className={motif === option ? "selected" : ""} type="button" key={option} onClick={() => setMotif(option)}>{motif === option && <FiCheck />}{option}</button>)}</div></fieldset>
        <div className="custom-total"><div><span>Concept total</span><strong>ETB 6,800</strong></div><button type="button" onClick={() => setAdded(true)}>{added ? <><FiCheck /> Saved to cart</> : <><FiShoppingBag /> Add custom piece</>}</button></div>
        {added && <Link className="go-cart-link" href="/cart">Continue to mock cart →</Link>}
      </div>
    </div>
  );
}
