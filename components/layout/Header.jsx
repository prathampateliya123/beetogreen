"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainLogo from "@/components/ui/MainLogo";
import BLogo from "@/components/ui/BLogo";
import SwooshButton from "@/components/ui/SwooshButton";
import { mainNav } from "@/data/navigation";

const LOGIN_URL = "https://app.beetogreen.com/login";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", mobileOpen);
    return () => document.body.classList.remove("nav-open");
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="nav">
        <div
          className={`nav__overlay ${mobileOpen ? "nav__overlay--visible" : ""}`}
          aria-hidden={!mobileOpen}
          onClick={closeMobileMenu}
        />
        <div className="nav__interactive-zone">
          <div className="nav__container">
            <Link href="/" className="nav__logo nav__logo--desktop" aria-label="Back to homepage">
              <MainLogo color="#0c1e18" />
            </Link>
            <Link href="/" className="nav__logo nav__logo--mobile" aria-label="Back to homepage">
              <BLogo style={{ height: "3.2rem", width: "auto" }} color="#0c1e18" />
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
              <SwooshButton
                href={LOGIN_URL}
                variant="secondary"
                size="sm"
                animate={false}
                className="nav__cta-link"
              >
                Log in
              </SwooshButton>
              <SwooshButton
                href="/contact"
                variant="tertiary"
                size="sm"
                animate={false}
                className="nav__cta-link"
              >
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

      <div
        className={`nav__mobile-menu ${mobileOpen ? "nav__mobile-menu--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="nav__mobile-list">
          {mainNav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="nav__mobile-link"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="nav__mobile-sublink"
                  onClick={closeMobileMenu}
                >
                  {child.label}
                </Link>
              ))}
            </li>
          ))}
        </ul>
        <div className="nav__mobile-actions">
          <Link href="/en" className="nav__mobile-lang" onClick={closeMobileMenu}>
            EN
          </Link>
          <SwooshButton href={LOGIN_URL} variant="secondary" size="md" animate={false}>
            Log in
          </SwooshButton>
          <SwooshButton href="/contact" variant="tertiary" size="md" animate={false}>
            Book a demo
          </SwooshButton>
        </div>
      </div>
    </>
  );
}
