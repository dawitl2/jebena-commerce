"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import { navItems } from "../data/products";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Jebena home" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="Jebena" width="50" height="50" />
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link className={pathname === item.href ? "active" : ""} key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link href="/search" aria-label="Search"><FiSearch /></Link>
          <Link className="cart-link" href="/cart" aria-label="Cart with two items">
            <FiShoppingBag /><span>2</span>
          </Link>
        </div>

        <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <FiX /> : <FiMenu />}
        </button>

        {open && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <div className="mobile-actions">
              <Link href="/search" onClick={() => setOpen(false)}><FiSearch /> Search</Link>
              <Link href="/cart" onClick={() => setOpen(false)}><FiShoppingBag /> Cart · 2</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
