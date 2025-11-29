import Link from "next/link";

import contactInfo from "@config/contact";

const TermsArea = () => {
  return (
    <section className="policy__area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="policy__wrapper policy__translate p-relative z-index-1">
              <div className="policy__item mb-35">
                <h4 className="policy__meta">
                  Last updated: September 18, 2022
                </h4>
                <p>
                  These are the Terms and Conditions governing the use of this
                  Service and the agreement that operates between You and the
                  Company. These Terms and Conditions set out the rights and
                  obligations of all users regarding the use of the Service.Your
                  access to and use of the Service is conditioned on Your
                  acceptance of and compliance with these Terms and Conditions.
                  These Terms and Conditions apply to all visitors, users and
                  others who access or use the Service.
                </p>
                <p>
                  By using or accessing the Services in any manner, you
                  acknowledge that you accept the practices and policies
                  outlined in this Privacy Policy, and you hereby consent that
                  ChakTech will collect, use, and share your information in the
                  following ways. Remember that your use of Services is at all
                  times subject to the Terms as set forth at
                  https://chaktech.tn/legal/terms, which incorporate this Privacy
                  Policy. Any terms ChakTech uses in this Privacy Policy without
                  defining them have the definitions given to them in the Terms.
                </p>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Checkout and Order Consent</h3>
                <p>
                  By proceeding with checkout and placing an order, you acknowledge and agree that:
                </p>
                <ul>
                  <li>Your information will be saved to facilitate this order and order processing</li>
                  <li>We may use your contact information to communicate about your order, including order confirmation, shipping updates, and delivery coordination</li>
                  <li>If you do not complete your checkout, we may send you a recovery email to help you complete your purchase</li>
                  <li>You have the option to create an account during checkout, and if you choose to do so, account creation will occur after your order is successfully placed</li>
                  <li>Your data will be handled in accordance with our Privacy Policy and applicable data protection laws</li>
                </ul>
                <p>
                  You must accept these terms and conditions before completing your purchase. If you do not agree to these terms, please do not proceed with checkout.
                </p>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Definitions</h3>
                <p>
                  The words of which the initial letter is capitalized have
                  meanings defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
                </p>
              </div>

              <div className="policy__list mb-35">
                <h3 className="policy__title">
                  Purposes of these Terms and Conditions:
                </h3>
                <ul>
                  <li>
                    <strong>Affiliate</strong> means an entity that controls, is
                    controlled by or is under common control with a party, where
                    &quot;control&quot; means ownership of 50% or more of the
                    shares, equity interest or other securities entitled to vote
                    for election of directors or other managing authority.
                  </li>
                  <li>
                    <strong>Country</strong> refers to: California, United
                    States
                  </li>
                  <li>
                    <strong>Company</strong> (referred to as either &quot;the
                    Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                    &quot;Our&quot; in this Agreement) refers to ChakTech.
                  </li>
                  <li>
                    <strong>Device</strong> means any device that can access the
                    Service such as a computer, a cellphone or a digital tablet.
                  </li>
                  <li>
                    <strong>Service</strong> refers to the Website.
                  </li>
                  <li>
                    <strong>Website</strong> refers to ChakTech, accessible from{" "}
                    <Link
                      href="/"
                      rel="external nofollow noopener"
                      target="_blank"
                    >
                      chaktech.tn
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="policy__contact">
                <h3 className="policy__title policy__title-2">Contact us</h3>
                <p>You may contact us at any time via:</p>

                <ul>
                  <li>
                    Email:{" "}
                    <span>
                      <a href={`mailto:${contactInfo.email.primary}`}>{contactInfo.email.primary}</a>
                    </span>
                  </li>
                  <li>
                    Phone:{" "}
                    <span>
                      <a href={`tel:${contactInfo.phone.tel}`}>{contactInfo.phone.formatted}</a>
                    </span>
                  </li>
                </ul>

                <div className="policy__address">
                  <p>
                    <a
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location.country)}`}
                      target="_blank"
                    >
                      {contactInfo.business.nameFull} <br /> {contactInfo.location.country}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsArea;
