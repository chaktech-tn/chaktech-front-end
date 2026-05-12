"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import logo from "@assets/img/categories/chaktech-logo.webp";
const LIVE_LOGO = "https://chaktech.tn/wp-content/uploads/2024/07/logo-e1720102834942.webp";
import LanguageSwitcher from "@components/language-switcher";
import SocialLinks from "@components/social";
import { contactInfo } from "@config/contact";
import useSiteSettings from "@hooks/useSiteSettings";
import { siteConfig } from "@lib/seo-config";
import CopyrightText from "./copyright-text";

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("footer");
  const { settings } = useSiteSettings(locale);

  const logoUrl = settings?.logo?.url || LIVE_LOGO || logo;
  const logoAlt = settings?.logo?.altText || "ChakTech Logo";
  const contactEmail = settings?.contactInfo?.email || contactInfo.email.primary;
  const contactPhone = settings?.contactInfo?.phone || contactInfo.phone.formatted;
  const contactAddress = settings?.contactInfo?.address || siteConfig.address.streetAddress;

  return (
    <footer className="bg-white border-top pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Main Support */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <Link href="/">
                <Image src={logoUrl} alt={logoAlt} width={130} height={40} className="mb-4" style={{ objectFit: "contain" }} />
              </Link>
              <p className="small text-muted mb-4">
                ChakTech is your premier destination for high-quality electronics and tech accessories in Tunisia.
              </p>
              <ul className="list-unstyled small d-flex flex-column gap-2 text-muted">
                <li className="d-flex align-items-start gap-2">
                  <i className="fa-light fa-location-dot mt-1 text-primary"></i>
                  <span>{contactAddress}</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="fa-light fa-envelope text-primary"></i>
                  <span>{contactEmail}</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="fa-light fa-phone text-primary"></i>
                  <span>{contactPhone}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Account */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h6 className="fw-bold mb-4">My Account</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2">
                <li><Link href="/user-dashboard" className="text-muted text-decoration-none hover-primary">My Account</Link></li>
                <li><Link href="/order" className="text-muted text-decoration-none hover-primary">Discount</Link></li>
                <li><Link href="/order" className="text-muted text-decoration-none hover-primary">Returns</Link></li>
                <li><Link href="/order" className="text-muted text-decoration-none hover-primary">Orders History</Link></li>
                <li><Link href="/order" className="text-muted text-decoration-none hover-primary">Order Tracking</Link></li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h6 className="fw-bold mb-4">Information</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2">
                <li><Link href="/about" className="text-muted text-decoration-none hover-primary">About Us</Link></li>
                <li><Link href="/faq" className="text-muted text-decoration-none hover-primary">FAQ</Link></li>
                <li><Link href="/contact" className="text-muted text-decoration-none hover-primary">Contact Us</Link></li>
                <li><Link href="/policy" className="text-muted text-decoration-none hover-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted text-decoration-none hover-primary">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>

          {/* Social & Support */}
          <div className="col-lg-5 col-md-6">
            <div className="footer-widget text-lg-end">
              <h6 className="fw-bold mb-4">Follow Us</h6>
              <div className="social-links d-flex justify-content-lg-end mb-4">
                <SocialLinks socialLinks={settings?.socialLinks} />
              </div>
              <div className="d-flex justify-content-lg-end">
                <div className="payment-methods d-flex gap-2 opacity-75">
                  <i className="fa-brands fa-cc-visa fs-3"></i>
                  <i className="fa-brands fa-cc-mastercard fs-3"></i>
                  <i className="fa-brands fa-cc-paypal fs-3"></i>
                  <i className="fa-brands fa-cc-apple-pay fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 opacity-10" />

        <div className="row align-items-center g-3">
          <div className="col-md-6">
            <div className="small text-muted">
              <CopyrightText />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end align-items-center gap-4">
              <LanguageSwitcher style_2={true} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hover-primary:hover { color: var(--primary-color) !important; }
      `}</style>
    </footer>
  );
};

export default Footer;
