"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
// internal
import logo from "@assets/img/categories/chaktech-logo.jpg";
import SocialLinks from "@components/social";
import CopyrightText from "./copyright-text";
import contactInfo from "@config/contact";
import { siteConfig } from "@lib/seo-config";
import { useSiteSettings } from "@hooks/useSiteSettings";
import { useMenu } from "@hooks/useMenu";
import LanguageSwitcher from "@components/language-switcher";

// single widget
function SingleWidget({ col, col_2, col_3, title, contents }) {
  return (
    <div
      className={`col-xxl-${col} col-xl-${col} col-lg-3 col-md-${col_2} col-sm-6"`}
    >
      <div className={`footer__widget mb-50 footer-col-11-${col_3}`}>
        <h3 className="footer__widget-title">{title}</h3>
        <div className="footer__widget-content">
          <ul>
            {contents.map((l, i) => (
              <li key={i}>
                <Link href={`/${l.url}`}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Footer Menu Widget Component
function FooterMenuWidget({ menu, col, col_2, col_3 }) {
  if (!menu || !menu.items || menu.items.length === 0) {
    return null;
  }

  // Group menu items by their first level (assuming they're organized)
  const menuItems = menu.items
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`col-xxl-${col} col-xl-${col} col-lg-3 col-md-${col_2} col-sm-6"`}
    >
      <div className={`footer__widget mb-50 footer-col-11-${col_3}`}>
        <h3 className="footer__widget-title">{menu.name}</h3>
        <div className="footer__widget-content">
          <ul>
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.url}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const { settings } = useSiteSettings(locale);
  const { menu: footerMenu } = useMenu("footer", locale);

  // Use dynamic logo or fallback to default
  const logoUrl = settings?.logo?.url || logo;
  const logoAlt = settings?.logo?.altText || "ChakTech Logo";
  const copyrightText = settings?.copyrightText || null;

  // Use dynamic contact info or fallback to config
  const contactEmail =
    settings?.contactInfo?.email || contactInfo.email.primary;
  const contactPhone =
    settings?.contactInfo?.phone || contactInfo.phone.formatted;
  const contactAddress =
    settings?.contactInfo?.address || siteConfig.address.streetAddress;
  const contactCity =
    settings?.contactInfo?.city || siteConfig.address.addressLocality;

  return (
    <>
      <footer>
        <div
          className="footer__area footer__style-4"
          data-bg-color="footer-bg-white"
        >
          <div className="footer__top">
            <div className="container">
              <div className="row">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget footer__widget-11 mb-50 footer-col-11-1">
                    <div className="footer__logo">
                      <Link href="/">
                        <Image
                          src={logoUrl}
                          alt={logoAlt}
                          width={112}
                          height={42}
                        />
                      </Link>
                    </div>

                    <div className="footer__widget-content">
                      <div className="footer__info">
                        <p>{t("businessDescription")}</p>
                        <div className="footer__social footer__social-11">
                          <SocialLinks socialLinks={settings?.socialLinks} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Use dynamic footer menu if available, otherwise use static widgets */}
                {footerMenu &&
                footerMenu.items &&
                footerMenu.items.length > 0 ? (
                  <FooterMenuWidget
                    menu={footerMenu}
                    col="2"
                    col_2="4"
                    col_3="2"
                  />
                ) : (
                  <>
                    <SingleWidget
                      col="2"
                      col_2="4"
                      col_3="2"
                      title={t("company")}
                      contents={[
                        { url: "/about", title: t("about") },
                        { url: "/contact", title: tCommon("contact") },
                        { url: "/faq", title: t("faqs") },
                        { url: "/policy", title: t("privacyPolicy") },
                        { url: "/terms", title: t("terms") },
                        { url: "/refund-return", title: "Refund & Return" },
                      ]}
                    />
                    <SingleWidget
                      col="3"
                      col_2="3"
                      col_3="3"
                      title={t("shop")}
                      contents={[
                        {
                          url: "/shop?category=Téléphonie et Tablette",
                          title: t("smartphones"),
                        },
                        {
                          url: "/shop?category=Informatique",
                          title: t("laptops"),
                        },
                        {
                          url: "/shop?category=Electromenager",
                          title: t("appliances"),
                        },
                        { url: "/shop", title: t("allProducts") },
                      ]}
                    />
                    <SingleWidget
                      col="1"
                      col_2="3"
                      col_3="4"
                      title={t("support")}
                      contents={[
                        { url: "/faq", title: t("faqs") },
                        { url: "/contact", title: t("contactUs") },
                        { url: "/login", title: t("myAccount") },
                        { url: "/cart", title: tCommon("cart") },
                        { url: "/wishlist", title: t("wishlist") },
                      ]}
                    />
                  </>
                )}

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget mb-50 footer-col-11-5">
                    <h3 className="footer__widget-title">{t("contactUs")}</h3>

                    <div className="footer__widget-content">
                      <p className="footer__text">{t("deliveryDescription")}</p>
                      <div className="footer__contact">
                        <div className="footer__contact-address mb-3">
                          <span>
                            {contactAddress}
                            {contactCity && (
                              <>
                                <br />
                                {contactCity}
                              </>
                            )}
                          </span>
                        </div>
                        {contactPhone && (
                          <div className="footer__contact-call">
                            <span>
                              <a
                                href={`tel:${contactPhone.replace(/\s/g, "")}`}
                              >
                                {contactPhone}
                              </a>
                            </span>
                          </div>
                        )}
                        {contactEmail && (
                          <div className="footer__contact-mail">
                            <span>
                              <a href={`mailto:${contactEmail}`}>
                                {contactEmail}
                              </a>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="container">
              <div className="footer__bottom-inner">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="footer__copyright">
                      {copyrightText ? (
                        <p>{copyrightText}</p>
                      ) : (
                        <CopyrightText />
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div
                      className="footer__payment text-sm-end"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 16px",
                          backgroundColor: "#f0f9ff",
                          border: "1px solid #0ea5e9",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0369a1",
                        }}
                      >
                        <span style={{ fontSize: "18px" }}>💵</span>
                        <span>Cash on Delivery Available</span>
                      </div>
                      <LanguageSwitcher style_2={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
