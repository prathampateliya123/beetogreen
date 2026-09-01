"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainLogo from "@/components/ui/MainLogo";
import SwooshButton from "@/components/ui/SwooshButton";
import SocialIcon from "@/components/ui/SocialIcon";
import { useApp } from "@/context/AppContext";
import {
  contactEmail,
  footerNav,
  legalLinks,
  socialLinks,
} from "@/data/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const year = new Date().getFullYear();
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const { lenis } = useApp();

  useEffect(() => {
    if (!wrapRef.current || !innerRef.current) return;

    const animation = gsap.fromTo(
      innerRef.current,
      { yPercent: -12 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "clamp(top bottom)",
          end: "clamp(bottom bottom)",
          scrub: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="footer-wrap" ref={wrapRef}>
      <footer className="footer">
        <div className="footer__inner" ref={innerRef}>
          <div className="footer__row footer__row--top">
            <div className="footer__col footer__col--brand">
              <div className="footer__logo">
                <MainLogo color="#e6ff55" />
              </div>
              <p className="footer__headline">Choose sustainable mobility</p>
            </div>

            <div className="footer__col">
              <p className="footer__col-label">Navigation</p>
              {footerNav.map((group) => (
                <div key={group.label} className="footer__nav-group">
                  <p className="footer__nav-group-label">{group.label}</p>
                  <ul className="footer__nav-list">
                    {group.links.map((link) => (
                      <li key={link.href} className="footer__nav-item">
                        <Link href={link.href} className="footer__nav-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="footer__col">
              <p className="footer__col-label">Legal</p>
              <ul className="footer__nav-list">
                {legalLinks.map((link) => (
                  <li key={link.href} className="footer__nav-item">
                    <Link href={link.href} className="footer__nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="footer__contact-block">
                <p className="footer__col-label">Get in touch</p>
                <div className="footer__contact-buttons">
                  <Link href="/contact#salarie" className="footer__contact-link">
                    <SwooshButton variant="tertiary" size="sm" animate={false}>
                      I&apos;m an employee
                    </SwooshButton>
                  </Link>
                  <Link href="/contact#entreprise" className="footer__contact-link">
                    <SwooshButton variant="secondary" size="sm" animate={false}>
                      I&apos;m an employer
                    </SwooshButton>
                  </Link>
                </div>
              </div>
            </div>

            <div className="footer__col footer__col--socials">
              <ul className="footer__socials">
                {socialLinks.map((social) => (
                  <li key={social.href} className="footer__social-item">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__social-link"
                      aria-label={social.label}
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer__row footer__row--info">
            <div className="footer__col footer__col--empty" aria-hidden="true" />
            <div className="footer__col">
              <p className="footer__col-label">Address</p>
              <p className="footer__col-value">
                47 Rue Voltaire, 92300 Levallois-Perret, France
              </p>
            </div>
            <div className="footer__col">
              <p className="footer__col-label">Contact</p>
              <a href={`mailto:${contactEmail}`} className="footer__col-link footer__col-value">
                {contactEmail}
              </a>
            </div>
            <div className="footer__col">
              <p className="footer__copyright">© {year} Beetogreen</p>
              <button
                type="button"
                className="footer__back-to-top"
                aria-label="Back to top"
                onClick={scrollToTop}
              >
                <span className="footer__back-to-top-label">Back to top</span>
                <svg
                  className="footer__back-to-top-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 19V5M12 5L5 12M12 5L19 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
