import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 · Lost in the ceremony</p><h1>This page has finished its coffee.</h1><p>Return to the collection and find your way back.</p><div><Link className="dark-button" href="/shop">Go to shop</Link><Link className="outline-button" href="/">Back home</Link></div></main>;
}
