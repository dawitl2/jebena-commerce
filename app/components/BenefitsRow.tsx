import { FiGlobe, FiHeadphones, FiRefreshCw, FiShield } from "react-icons/fi";
import { benefits } from "../data/products";

const icons = { globe: FiGlobe, returns: FiRefreshCw, secure: FiShield, support: FiHeadphones };

export function BenefitsRow() {
  return (
    <section className="benefits-row" aria-label="Shopping benefits">
      {benefits.map(({ icon, title, text }) => {
        const Icon = icons[icon as keyof typeof icons];
        return <article key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>;
      })}
    </section>
  );
}
