"use client";

import { ChangeEvent, useState } from "react";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import type { Product, ProductCategory } from "../data/products";
import { ProductCard } from "./ProductCard";

const categories: Array<"All" | ProductCategory> = ["All", "Jebena", "Rekebot", "Sini", "Basket"];

type ShopExperienceProps = {
  products: Product[];
  initialCategory?: string;
  initialSearch?: string;
};

export function ShopExperience({ products, initialCategory = "All", initialSearch = "" }: ShopExperienceProps) {
  const [query, setQuery] = useState(initialSearch);
  const [category, setCategory] = useState(categories.includes(initialCategory as "All" | ProductCategory) ? initialCategory : "All");
  const [sort, setSort] = useState("featured");
  const [customOnly, setCustomOnly] = useState(false);

  const filtered = products
    .filter((product) => category === "All" || product.category === category)
    .filter((product) => !customOnly || product.customizable)
    .filter((product) => `${product.name} ${product.category} ${product.material}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.id - b.id);

  const hasFilters = query || category !== "All" || customOnly || sort !== "featured";

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setSort("featured");
    setCustomOnly(false);
  }

  return (
    <div className="shop-experience">
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <FiSearch /><span className="sr-only">Search products</span>
          <input value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} placeholder="Search pieces, materials…" />
        </label>
        <label className="sort-control"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label>
      </div>

      <div className="filter-row">
        <div className="filter-scroll" role="group" aria-label="Product categories">
          {categories.map((item) => <button className={category === item ? "active" : ""} type="button" key={item} onClick={() => setCategory(item)}>{item === "All" ? "All pieces" : item}</button>)}
          <button className={customOnly ? "active" : ""} type="button" onClick={() => setCustomOnly((value) => !value)}><FiSliders /> Customizable</button>
        </div>
        {hasFilters && <button className="clear-button" type="button" onClick={clearFilters}><FiX /> Clear</button>}
      </div>

      <div className="results-line"><p><strong>{filtered.length}</strong> pieces</p><span>{category === "All" ? "The full Jebena collection" : `${category} collection`}</span></div>
      {filtered.length ? <div className="catalog-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>No pieces found</h2><p>Try a broader search or clear your filters.</p><button type="button" onClick={clearFilters}>Clear all filters</button></div>}
    </div>
  );
}
