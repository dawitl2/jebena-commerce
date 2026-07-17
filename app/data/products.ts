export type ProductCategory = "Jebena" | "Rekebot" | "Sini" | "Basket";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  longDescription: string;
  price: number;
  material: string;
  dimensions: string;
  badge?: string;
  customizable: boolean;
  imageClass: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "classic-jebena",
    name: "Classic Jebena",
    category: "Jebena",
    description: "The heart of Ethiopian coffee",
    longDescription: "A balanced, hand-finished coffee pot inspired by the silhouettes used in homes across Ethiopia. Made for slow brewing, generous pouring, and gatherings that last.",
    price: 4500,
    material: "Burnished clay",
    dimensions: "28 × 19 cm",
    badge: "Best Seller",
    customizable: true,
    imageClass: "product-one",
    image: "/images/product-placeholder.jpg",
  },
  {
    id: 2,
    slug: "heritage-rekebot",
    name: "Heritage Rekebot",
    category: "Rekebot",
    description: "A graceful stage for every brew",
    longDescription: "A woven ceremony stand designed to bring height, texture, and a strong sense of place to the coffee table.",
    price: 3800,
    material: "Woven grass & reed",
    dimensions: "36 × 24 cm",
    badge: "Artisan Pick",
    customizable: true,
    imageClass: "product-two",
    image: "/images/product-placeholder.jpg",
  },
  {
    id: 3,
    slug: "ceremony-sini-set",
    name: "Ceremony Sini Set",
    category: "Sini",
    description: "Small cups made for sharing",
    longDescription: "Six hand-glazed sini cups with a warm, tactile finish and a profile made for the measured rhythm of a traditional pour.",
    price: 2900,
    material: "Glazed ceramic",
    dimensions: "6 cups · 90 ml each",
    customizable: true,
    imageClass: "product-three",
    image: "/images/sample-3.jpg",
  },
  {
    id: 4,
    slug: "woven-coffee-basket",
    name: "Woven Coffee Basket",
    category: "Basket",
    description: "Warmth, texture, and tradition",
    longDescription: "A lidded basket woven in layered natural tones, sized for roasted beans, small ceremony tools, or a thoughtful gift.",
    price: 3200,
    material: "Natural sisal",
    dimensions: "21 × 18 cm",
    customizable: true,
    imageClass: "product-four",
    image: "/images/sample-2.jpg",
  },
  {
    id: 5,
    slug: "midnight-jebena",
    name: "Midnight Jebena",
    category: "Jebena",
    description: "A deep-black ceremonial statement",
    longDescription: "A contemporary black clay finish with subtle hand-scored lines, designed for collectors who prefer a quieter visual language.",
    price: 5200,
    material: "Black-fired clay",
    dimensions: "30 × 20 cm",
    badge: "New",
    customizable: true,
    imageClass: "product-five",
    image: "/images/sample-4.jpg",
  },
  {
    id: 6,
    slug: "golden-sini-pair",
    name: "Golden Sini Pair",
    category: "Sini",
    description: "Two cups, one shared pause",
    longDescription: "A compact pair for daily coffee, finished with a fine golden-brown rim and restrained geometric detailing.",
    price: 1800,
    material: "Stoneware ceramic",
    dimensions: "2 cups · 100 ml each",
    customizable: true,
    imageClass: "product-six",
    image: "/images/sample-5.jpg",
  },
  {
    id: 7,
    slug: "harar-rekebot",
    name: "Harar Rekebot",
    category: "Rekebot",
    description: "Patterned by hand, built to gather",
    longDescription: "A tall woven stand with a patterned collar that frames the Jebena and gives the ceremony a vivid focal point.",
    price: 4400,
    material: "Dyed reed & fiber",
    dimensions: "40 × 26 cm",
    customizable: false,
    imageClass: "product-seven",
    image: "/images/sample-4.jpg",
  },
  {
    id: 8,
    slug: "mesob-coffee-basket",
    name: "Mesob Coffee Basket",
    category: "Basket",
    description: "A compact woven keeper",
    longDescription: "A small-batch basket for coffee beans and ceremony essentials, woven in a precise concentric pattern.",
    price: 3600,
    material: "Sisal & natural dye",
    dimensions: "24 × 20 cm",
    badge: "Limited",
    customizable: true,
    imageClass: "product-eight",
    image: "/images/sample-2.jpg",
  },
];

export const featuredProducts = products.slice(0, 4);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export const features = [
  { icon: "craft", title: "Authentic Craftsmanship", text: "Handmade with care by Ethiopian artisans." },
  { icon: "heritage", title: "Rooted in Heritage", text: "Inspired by the Ethiopian coffee ceremony." },
  { icon: "design", title: "Thoughtful Design", text: "Crafted for beauty, ritual, and everyday use." },
  { icon: "delivery", title: "Careful Delivery", text: "Packed securely for a safe arrival." },
];

export const benefits = [
  { icon: "globe", title: "Worldwide Shipping", text: "Bringing Ethiopia to you" },
  { icon: "returns", title: "30-Day Returns", text: "Easy returns & exchanges" },
  { icon: "secure", title: "Secure Payments", text: "100% safe & protected" },
  { icon: "support", title: "24/7 Support", text: "We’re here for you" },
];
