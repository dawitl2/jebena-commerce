"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export function SearchPanel() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="search-page">
      <p className="eyebrow">Find your piece</p>
      <h1>Search the Jebena collection.</h1>
      <p>Try “clay”, “Sini”, “woven”, or the name of a piece.</p>
      <form onSubmit={submit}><FiSearch /><label className="sr-only" htmlFor="site-search">Search products</label><input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" autoFocus /><button type="submit">Search</button></form>
      <div className="search-suggestions"><span>Popular:</span>{["Classic Jebena", "Sini", "Customizable", "Natural fiber"].map((term) => <button type="button" key={term} onClick={() => router.push(`/shop?search=${encodeURIComponent(term)}`)}>{term}</button>)}</div>
    </section>
  );
}
