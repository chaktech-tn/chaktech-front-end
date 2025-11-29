// internal
import Image from "next/image";

import location_icon_1 from "@assets/img/contact/contact-location-1.png";
import location_icon_2 from "@assets/img/contact/contact-location-2.png";
import location_icon_3 from "@assets/img/contact/contact-location-3.png";
import contactInfo from "@config/contact";
import { siteConfig } from "@lib/seo-config";

// single location item
function SingleLocationItem({ title, icon, location, tel }) {
  return (
    <div className="contact__location-item">
      <div className="row align-items-center">
        <div className="col-lg-9 col-md-8 col-sm-7">
          <div className="contact__location-content d-lg-flex align-items-center">
            <h3 className="contact__location-title">{title}</h3>
            <div className="contact__location-info d-sm-flex flex-wrap align-items-center">
              <div className="contact__location-icon mr-45">
                <Image src={icon} alt="icon image" />
              </div>
              <div className="contact__location-content">
                <p>
                  <strong>Address:</strong><br />
                  {siteConfig.address.streetAddress}<br />
                  {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion}<br />
                  {siteConfig.address.postalCode}, {siteConfig.address.addressCountry === 'TN' ? 'Tunisia' : siteConfig.address.addressCountry}
                </p>
                <p>
                  <a href={`mailto:${location}`}>{location}</a>
                </p>
                <p>
                  <a href={`tel:${tel.replace(/\s/g, '')}`}>{tel}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-5">
          <div className="contact__location-btn text-sm-end">
            <a
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion}, Tunisia`)}`}
              target="_blank"
              className="tp-btn-border"
            >
              view location
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const LocationArea = () => {
  return (
    <section className="contact__location-area pb-130 pt-110">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-7 offset-xl-1 col-md-8">
            <div className="tp-section-wrapper-2 mb-35">
              <span className="tp-section-subtitle-2 subtitle-mb-9">
                LOCATIONS
              </span>
              <h3 className="tp-section-title-2 font-40">
                Come and visit our offices around the world
              </h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10 ">
            <div className="contact__location-wrapper">
              <SingleLocationItem
                title={`${contactInfo.business.nameFull} - ${contactInfo.location.country}`}
                icon={location_icon_1}
                location={contactInfo.email.primary}
                tel={contactInfo.phone.formatted}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationArea;
