import Link from "next/link";
import { FiArrowRight, FiEdit3, FiLayers } from "react-icons/fi";

export function CustomizeBanner() {
  return (
    <section className="custom-banner" aria-labelledby="custom-banner-title">
      <div className="custom-copy">
        <p className="eyebrow">Made by you</p>
        <h2 id="custom-banner-title">Your ritual, your design.</h2>
        <p>Choose the piece, material, color, and motif. We’ll turn your choices into a one-of-one ceremony object.</p>
        <Link className="dark-button" href="/customize">Open the Custom Studio <FiArrowRight /></Link>
      </div>
      <div className="custom-visual" aria-hidden="true">
        <div className="custom-product"><img src="/images/custom-ad.jpg" alt="" /></div>
        <div className="floating-panel panel-material"><FiLayers /><span>Material</span><strong>Burnished clay</strong></div>
        <div className="floating-panel panel-pattern"><FiEdit3 /><span>Motif</span><strong>Woven lines</strong></div>
        <div className="swatches"><i /><i /><i /><i /></div>
      </div>
    </section>
  );
}
