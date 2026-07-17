import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = { title: "Collections" };

const collections = [
  { name: "The Jebena Edit", text: "Clay silhouettes for the center of the ceremony.", href: "/shop?category=Jebena", tone: "collection-dark" },
  { name: "Sini for Sharing", text: "Cups that make room for one more guest.", href: "/shop?category=Sini", tone: "collection-light" },
  { name: "Woven at Home", text: "Baskets and stands shaped by patient hands.", href: "/shop?category=Basket", tone: "collection-warm" },
];

export default function CollectionsPage() {
  return <main className="inner-page"><header className="page-header wide"><p className="eyebrow">Curated rituals</p><h1>Collections with a sense of place.</h1><p>Shop by object, mood, and the way you gather.</p></header><section className="collection-cards">{collections.map((collection) => <Link className={`collection-card ${collection.tone}`} href={collection.href} key={collection.name}><div><p>Jebena collection</p><h2>{collection.name}</h2><span>{collection.text}</span><strong>Explore <FiArrowRight /></strong></div><Image src="/images/product-placeholder.jpg" alt="" fill sizes="(max-width: 700px) 94vw, 33vw" /></Link>)}</section><section className="collection-callout"><p className="eyebrow">One of one</p><h2>Can’t find the exact piece?</h2><p>Build a custom object with your choice of material, tone, and motif.</p><Link className="dark-button" href="/customize">Visit the Custom Studio <FiArrowRight /></Link></section></main>;
}
