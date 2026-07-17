import Link from "next/link";
import { FiArrowRight, FiAward, FiHeart, FiPackage, FiSun } from "react-icons/fi";
import { BenefitsRow } from "./components/BenefitsRow";
import { ProductCard } from "./components/ProductCard";
import { StoryBanner } from "./components/StoryBanner";
import { featuredProducts, features } from "./data/products";

const featureIcons = { craft: FiAward, heritage: FiHeart, design: FiSun, delivery: FiPackage };

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Rooted in tradition</p>
          <h1 id="hero-title">Brew Culture. Share <span>Heritage.</span></h1>
          <p className="hero-description">Discover handcrafted Ethiopian coffee pieces inspired by the timeless Jebena ceremony.</p>
        </div>
        <div className="hero-stage" aria-hidden="true">
          <div className="halo" />
          <img className="bean bean-one" src="/images/bean.png" alt="" />
          <img className="bean bean-two" src="/images/bean.png" alt="" />
          <img className="bean bean-three" src="/images/bean.png" alt="" />
          <img className="bean bean-four" src="/images/bean.png" alt="" />
          <img className="hero-pot" src="/images/hero-pote.png" alt="" />
          <div className="stage-shadow" />
        </div>
        <Link className="primary-button" href="/shop">Shop Collection <FiArrowRight /></Link>
      </section>

      <section className="feature-row" aria-label="Why shop Jebena">
        {features.map(({ icon, title, text }) => {
          const Icon = featureIcons[icon as keyof typeof featureIcons];
          return <article className="feature" key={title}><span className="feature-icon"><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>;
        })}
      </section>

      <section className="collection-section" id="collections" aria-labelledby="collection-title">
        <div className="section-heading section-heading-row">
          <div><p className="eyebrow">Explore our collection</p><h2 id="collection-title">Essential for Every Coffee Ritual</h2></div>
          <Link className="section-shop-button" href="/shop">Shop all pieces <FiArrowRight /></Link>
        </div>
        <div className="product-grid home-product-rail">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        <Link className="view-all" href="/shop">View All Products <FiArrowRight /></Link>
      </section>

      <StoryBanner />
      <BenefitsRow />
    </main>
  );
}
