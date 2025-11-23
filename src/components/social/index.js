import React from "react";
import contactInfo from "@config/contact";

// Map platform names to icon classes
const platformIcons = {
  facebook: "fa-brands fa-facebook-f",
  instagram: "fa-brands fa-instagram",
  twitter: "fa-brands fa-twitter",
  linkedin: "fa-brands fa-linkedin-in",
  youtube: "fa-brands fa-youtube",
  pinterest: "fa-brands fa-pinterest",
  tiktok: "fa-brands fa-tiktok",
};

const SocialLinks = ({ socialLinks }) => {
  // Use dynamic social links if provided, otherwise fallback to config
  let linksToRender = [];

  if (socialLinks && Array.isArray(socialLinks) && socialLinks.length > 0) {
    linksToRender = socialLinks
      .filter((link) => link.isActive !== false && link.url)
      .map((link) => ({
        link: link.url,
        target: "_blank",
        icon: platformIcons[link.platform] || "fa-solid fa-link",
        name: link.platform,
      }));
  } else {
    // Fallback to static config
    linksToRender = [
      {
        link: contactInfo.social?.facebook || "#",
        target: "_blank",
        icon: "fa-brands fa-facebook-f",
        name: "Facebook",
      },
      {
        link: contactInfo.social?.instagram || "#",
        target: "_blank",
        icon: "fa-brands fa-instagram",
        name: "Instagram",
      },
      {
        link: contactInfo.social?.tiktok || "#",
        target: "_blank",
        icon: "fa-brands fa-tiktok",
        name: "TikTok",
      },
    ];
  }

  return (
    <>
      {linksToRender.map((l, i) => (
        <a key={i} href={l.link} target={l.target} rel="noopener noreferrer">
          <i className={l.icon}></i>
        </a>
      ))}
    </>
  );
};

export default SocialLinks;

export function SocialShare() {
  const social_links = [
    {
      link: contactInfo.social?.facebook || "#",
      target: "_blank",
      icon: "fa-brands fa-facebook-f",
      name: "Facebook",
    },
    {
      link: contactInfo.social?.instagram || "#",
      target: "_blank",
      icon: "fa-brands fa-instagram",
      name: "Instagram",
    },
    {
      link: contactInfo.social?.tiktok || "#",
      target: "_blank",
      icon: "fa-brands fa-tiktok",
      name: "TikTok",
    },
  ];

  return (
    <>
      {social_links.slice(0, 3).map((l, i) => (
        <a key={i} href={l.link} target={l.target} rel="noopener noreferrer">
          <i className={l.icon}></i>
        </a>
      ))}
    </>
  );
}

