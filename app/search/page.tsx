import type { Metadata } from "next";
import { SearchPanel } from "../components/SearchPanel";

export const metadata: Metadata = { title: "Search" };
export default function SearchPage() { return <main className="inner-page"><SearchPanel /></main>; }
