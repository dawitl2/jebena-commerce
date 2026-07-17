import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export function StoryBanner() {
  return (
    <section className="story-banner" aria-labelledby="story-banner-title">
      <img src="/images/story.jpg" alt="Traditional Ethiopian coffee cup in warm morning light" />
      <div className="story-banner-overlay" />
      <div className="story-banner-copy">
        <p className="eyebrow">Our story</p>
        <h2 id="story-banner-title">More Than Products.<br />It’s Our Culture.</h2>
        <p>Jebena celebrates the beauty of Ethiopian coffee traditions through objects made to be used, shared, and remembered.</p>
        <Link href="/about">Learn More <FiArrowRight /></Link>
      </div>
    </section>
  );
}
