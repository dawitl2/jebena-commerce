import type { Metadata } from "next";
import { Customizer } from "../components/Customizer";
import { getProduct } from "../data/products";

export const metadata: Metadata = { title: "Custom Studio" };
export default async function CustomizePage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product: slug } = await searchParams;
  const product = slug ? getProduct(slug) : undefined;
  const initialPiece = product?.category === "Sini" ? "Sini Set" : product?.category === "Basket" ? "Coffee Basket" : "Classic Jebena";
  return <main className="inner-page customizer-page"><Customizer initialPiece={initialPiece} /></main>;
}
