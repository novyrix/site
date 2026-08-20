import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Field notes" },
  { href: "/inquire", label: "Inquiry" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="site-footer__cta">
          <p className="eyebrow">Have a system worth getting right?</p>
          <h2>Let&apos;s engineer the path forward.</h2>
          <Link href="/inquire" className="button button--primary">
            Start an inquiry
            <ArrowUpRight aria-hidden="true" weight="bold" />
          </Link>
        </div>

        <div className="site-footer__grid">
          <div>
            <Link href="/" className="brand-lockup" aria-label="Novyrix home">
              <Image src="/brand/novyrix-icon.svg" width={40} height={40} alt="" />
              <span>Novyrix</span>
            </Link>
            <p className="site-footer__tagline">Development, engineered.</p>
          </div>
          <div className="site-footer__links">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="site-footer__meta mono">
            <span>New projects</span>
            <a href="mailto:connect@novyrix.com">connect@novyrix.com</a>
            <span>General enquiries</span>
            <a href="mailto:contact@novyrix.com">contact@novyrix.com</a>
            <span>Nairobi, Kenya</span>
            <span>Serving internationally</span>
          </div>
        </div>

        <div className="site-footer__bottom mono">
          <span>Copyright {new Date().getFullYear()} Novyrix</span>
          <span>Architecture / Delivery / Operational ownership</span>
          <nav className="site-footer__legal" aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
