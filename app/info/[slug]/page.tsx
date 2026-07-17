import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiMail } from "react-icons/fi";

const pages: Record<string, { title: string; eyebrow: string; intro: string; sections: Array<{ heading: string; body: string }> }> = {
  faqs: { title: "Frequently asked questions", eyebrow: "Help", intro: "A few useful answers while the full Jebena shop is still in its frontend stage.", sections: [{ heading: "Are these pieces handmade?", body: "The storefront is designed around handmade, small-batch products. Product and maker details are mock content for now." }, { heading: "Can I customize an item?", body: "Yes—the Custom Studio lets you preview the intended color, material, and motif experience." }, { heading: "Does checkout work?", body: "Not yet. Cart and account flows are interactive visual demos without backend storage or payment processing." }] },
  shipping: { title: "Shipping", eyebrow: "Delivery", intro: "A clear preview of how Jebena delivery information will be organized.", sections: [{ heading: "Worldwide delivery", body: "The final shop is intended to support international delivery from Ethiopia, with live rates added in a later backend phase." }, { heading: "Careful packing", body: "Fragile clay and ceramic pieces will be wrapped, cushioned, and boxed for safe transit." }] },
  returns: { title: "Returns", eyebrow: "Peace of mind", intro: "The future policy will keep the handmade nature of every object in view.", sections: [{ heading: "30-day window", body: "Unused standard pieces are planned to be returnable within 30 days of delivery." }, { heading: "Custom work", body: "Personalized pieces may not be returnable unless damaged, because they are created specifically for one customer." }] },
  "care-guide": { title: "Care guide", eyebrow: "Keep it beautiful", intro: "Simple habits for clay, ceramic, and woven ceremony pieces.", sections: [{ heading: "Clay Jebena", body: "Rinse gently, avoid sudden temperature changes, and let the piece dry completely before storing." }, { heading: "Ceramic cups", body: "Hand washing preserves painted and hand-applied finishes longer than high-heat machine cycles." }, { heading: "Woven pieces", body: "Dust with a dry soft cloth and store away from direct moisture or prolonged sunlight." }] },
  privacy: { title: "Privacy policy", eyebrow: "Legal", intro: "This frontend prototype does not collect, transmit, or store personal customer data.", sections: [{ heading: "Prototype status", body: "Forms and account actions exist only to demonstrate the intended experience. No backend is connected." }, { heading: "Future updates", body: "A production privacy policy will be added before any real account, analytics, or payment systems launch." }] },
  terms: { title: "Terms of service", eyebrow: "Legal", intro: "The current experience is a design prototype and not a live commercial service.", sections: [{ heading: "Mock commerce", body: "Prices, products, availability, account states, and checkout messages are illustrative only." }, { heading: "Final terms", body: "Complete purchasing and service terms will be published before transactional features become available." }] },
};

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return <main className="inner-page info-page"><Link className="back-link" href="/"><FiArrowLeft /> Home</Link><header className="page-header"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></header><section className="info-sections">{page.sections.map((section) => <article key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></article>)}</section><aside className="contact-card"><FiMail /><div><h2>Still need help?</h2><p>Our support route is a visual placeholder. Future contact tools will live here.</p></div><Link href="/shop">Browse shop</Link></aside></main>;
}
