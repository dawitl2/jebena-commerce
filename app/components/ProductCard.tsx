import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-image-wrap" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Image className={`product-image ${product.imageClass}`} src={product.image} alt={product.name} fill sizes="(max-width: 600px) 82vw, (max-width: 900px) 45vw, 25vw" />
      </Link>
      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>ETB {product.price.toLocaleString()}</strong>
          <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><FiArrowUpRight /></Link>
        </div>
      </div>
    </article>
  );
}
