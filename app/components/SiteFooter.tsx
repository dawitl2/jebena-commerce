"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Jebena", href: "/shop?category=Jebena" },
  { label: "Sini Cups", href: "/shop?category=Sini" },
  { label: "Custom Studio", href: "/customize" },
];

const helpItems = ["FAQs", "Shipping", "Returns", "Care Guide"];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
  { label: "WhatsApp", href: "https://www.whatsapp.com/", icon: FaWhatsapp },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: FaTiktok },
  { label: "YouTube", href: "https://www.youtube.com/", icon: FaYoutube },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FaFacebookF },
];

export function SiteFooter() {
  const [joined, setJoined] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoined(true);
  }

  return (
    <footer className="footer">
      <div className="footer-main footer-main-simple">
        <div className="footer-brand">
          <Link className="brand brand-footer" href="/" aria-label="Jebena home">
            <img src="/images/logo.png" alt="Jebena" width="62" height="62" />
          </Link>
          <p>A modern home for Ethiopian coffee culture and handcrafted ceremony pieces.</p>
          <div className="socials" aria-label="Social media">
            {socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} aria-label={label}><Icon /></a>)}
          </div>
        </div>

        <div className="footer-group">
          <h3>Shop</h3>
          {shopLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </div>

        <div className="footer-group footer-static">
          <h3>Help</h3>
          {helpItems.map((item) => <span key={item}>{item}</span>)}
        </div>

        <div className="newsletter">
          <h3>Newsletter</h3>
          <p>{joined ? "You’re on the list. Welcome to Jebena." : "Join our community and enjoy 10% off your first order."}</p>
          {!joined && (
            <form onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input id="footer-email" type="email" placeholder="Your email" required />
              <button type="submit" aria-label="Subscribe"><FiArrowRight /></button>
            </form>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Jebena. All rights reserved.</p>
        <div><span>Privacy Policy</span><span>Terms of Service</span></div>
      </div>
    </footer>
  );
}
