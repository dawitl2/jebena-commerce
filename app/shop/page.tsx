import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { ShopExperience } from "../components/ShopExperience";
import { CustomizeBanner } from "../components/CustomizeBanner";
import { products } from "../data/products";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; search?: string }> }) {
  const params = await searchParams;
  return (
    <main className="inner-page shop-page">
      <section className="shop-hero"><div><p className="eyebrow">The full collection</p><h1>Objects for the coffee ritual.</h1><p>Explore handcrafted pots, cups, stands, and baskets—each rooted in Ethiopian ceremony.</p></div><Link href="/customize">Create your own <FiArrowRight /></Link></section>
      <ShopExperience products={products} initialCategory={params.category} initialSearch={params.search} />
      <CustomizeBanner />
    </main>
  );
}
