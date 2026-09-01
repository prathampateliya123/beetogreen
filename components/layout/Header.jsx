"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MainLogo from "@/components/ui/MainLogo";
import BLogo from "@/components/ui/BLogo";
import SwooshButton from "@/components/ui/SwooshButton";
import { mainNav } from "@/data/navigation";

const LOGIN_URL = "https://app.beetogreen.com/login";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return;
      const scrolled = window.scrollY > 50;
      headerRef.current.classList.toggle("nav--scrolled", scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="nav nav--blur" ref={headerRef}>
        <div className="nav__overlay" aria-hidden="true" />
        <div className="nav__interactive-zone">
          <div className="nav__container">
            <Link href="/" className="nav__logo nav__logo--desktop" aria-label="Back to homepage">
              <MainLogo />
            </Link>
            <Link href="/" className="nav__logo nav__logo--mobile" aria-label="Back to homepage">
              <BLogo style={{ height: "3.2rem", width: "auto" }} color="#E6FF55" />
            </Link>

            <ul className="nav__links">
              {mainNav.map((item) => (
                <li key={item.label} className="nav__item">
                  <Link href={item.href} className="nav__link">
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="nav__dropdown">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="nav__dropdown-link">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav__actions">
              <Link href="/en" className="nav__lang" aria-label="Language">
                EN
              </Link>
              <SwooshButton href={LOGIN_URL} variant="transparent" size="sm">
                Log in
              </SwooshButton>
              <SwooshButton href="/contact" variant="secondary" size="sm">
                Book a demo
              </SwooshButton>
              <button
                type="button"
                className="nav__burger"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? "×" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`nav__mobile-menu ${mobileOpen ? "nav__mobile-menu--open" : ""}`}>
        <ul className="nav__mobile-list">
          {mainNav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="nav__mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="nav__mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </li>
          ))}
        </ul>
        <div className="nav__mobile-actions">
          <SwooshButton href={LOGIN_URL} variant="transparent" size="md">
            Log in
          </SwooshButton>
          <SwooshButton href="/contact" variant="secondary" size="md">
            Book a demo
          </SwooshButton>
        </div>
      </div>
    </>
  );
}
