import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheck, FiPackage, FiShield } from "react-icons/fi";
import { ProductActions } from "../../components/ProductActions";
import { ProductCard } from "../../components/ProductCard";
import { getProduct, products } from "../../data/products";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <main className="inner-page product-page">
      <Link className="back-link" href="/shop"><FiArrowLeft /> Back to shop</Link>
      <section className="product-detail">
        <div className="product-gallery"><div className="detail-image"><Image className={product.imageClass} src={product.image} alt={product.name} fill priority sizes="(max-width: 800px) 94vw, 55vw" /></div><div className="gallery-notes"><span>Handmade</span><span>Small batch</span><span>Ethiopian inspired</span></div></div>
        <div className="product-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-subtitle">{product.description}</p>
          <strong className="detail-price">ETB {product.price.toLocaleString()}</strong>
          <p className="detail-description">{product.longDescription}</p>
          <dl><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Size</dt><dd>{product.dimensions}</dd></div><div><dt>Finish</dt><dd>Hand-applied, naturally varied</dd></div></dl>
          <ProductActions slug={product.slug} customizable={product.customizable} />
          <div className="product-assurances"><p><FiCheck /> Artisan-finished</p><p><FiPackage /> Carefully packed</p><p><FiShield /> 30-day returns</p></div>
        </div>
      </section>
      <section className="related-section"><div className="section-heading-row"><div><p className="eyebrow">Keep exploring</p><h2>You may also like</h2></div><Link href="/shop">Shop all →</Link></div><div className="catalog-grid related-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
    </main>
  );
}
