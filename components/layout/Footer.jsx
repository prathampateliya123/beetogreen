import Link from "next/link";
import BLogo from "@/components/ui/BLogo";
import SwooshButton from "@/components/ui/SwooshButton";
import {
  contactEmail,
  footerNav,
  legalLinks,
  socialLinks,
} from "@/data/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer-wrap">
      <div className="footer__inner">
        <div className="footer__row">
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <BLogo color="#D4F5E0" />
            </div>
            <p className="footer__headline">
              Sustainable mobility that moves your teams forward.
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.label} className="footer__col">
              <p className="footer__col-label">{group.label}</p>
              {group.links.map((link) => (
                <div key={link.href} className="footer__nav-group">
                  <Link href={link.href} className="footer__nav-link">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}

          <div className="footer__col">
            <p className="footer__col-label">Legal</p>
            {legalLinks.map((link) => (
              <div key={link.href} className="footer__nav-group">
                <Link href={link.href} className="footer__nav-link">
                  {link.label}
                </Link>
              </div>
            ))}

            <div className="footer__contact-block">
              <a href={`mailto:${contactEmail}`} className="footer__col-link footer__col-value">
                {contactEmail}
              </a>
              <div className="footer__contact-buttons">
                <SwooshButton href="/contact#salarie" variant="transparent" size="sm">
                  Employee contact
                </SwooshButton>
                <SwooshButton href="/contact#entreprise" variant="secondary" size="sm">
                  Employer contact
                </SwooshButton>
              </div>
            </div>

            <ul className="footer__socials">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={social.label}
                  >
                    {social.icon.slice(0, 2).toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="footer__copyright">© {year} BeeToGreen. All rights reserved.</p>
          <a href="#top" className="footer__back-to-top">
            <span className="footer__back-to-top-label">Back to top</span>
            <span className="footer__back-to-top-icon" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
