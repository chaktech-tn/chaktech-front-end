import Link from "next/link";
import contactInfo from "@config/contact";

const PolicyArea = () => {
  return (
    <section className="policy__area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="policy__wrapper policy__translate p-relative z-index-1">
              <div className="policy__item mb-35">
                <h4 className="policy__meta">Effective date: May 25, 2023</h4>
                <p>
                  ChakTech knows that you care about how your personal information
                  is used and shared, and ChakTech takes your privacy seriously.
                  Please read the following to learn more about ChakTech Privacy
                  Policy ("Privacy Policy"). This Privacy Policy also tells you
                  about your rights and choices with respect to your Personal
                  Information, and how you can reach us to update your contact
                  information or get answers to questions you may have about our
                  privacy practices.
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
                <h3 className="policy__title">Information Collection</h3>
                <p>
                  You can visit and enjoy our Website without disclosing any
                  Personal Information about yourself. However, for the Service
                  to work properly we will need you to share with us certain
                  Personal Information.
                </p>

                <p>
                  For the purposes of this Privacy Policy, “Personal
                  Information” means information that identifies, relates to,
                  describes, is reasonably capable of being associated with, or
                  could be reasonably linked, directly or indirectly, with a
                  particular consumer, device or household. It does not include
                  de-identified or aggregate information, or public information
                  lawfully available from governmental records.
                </p>
              </div>

              <div className="policy__list mb-35">
                <h3 className="policy__title">Use of Personal Information</h3>
                <ul>
                  <li>To provide and maintain the Service;</li>
                  <li>To detect, prevent and address technical issues;</li>
                  <li>
                    To register you as a user and to provide the services you
                    require;
                  </li>
                  <li>
                    To decide whether to offer you a ChakTech product or
                    service;
                  </li>
                  <li>To notify you about changes to our Service;</li>
                  <li>To provide customer care and support;</li>
                  <li>To process and fulfill your orders;</li>
                  <li>To facilitate guest checkout and order completion;</li>
                </ul>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Abandoned Checkout Data Collection</h3>
                <p>
                  When you begin the checkout process on our website, we may collect and temporarily store certain information to facilitate your order completion and improve your shopping experience. This includes:
                </p>
                <ul>
                  <li>Your name, address, phone number, and email address (if provided)</li>
                  <li>Items in your shopping cart</li>
                  <li>A unique session token to associate your checkout data with your browsing session</li>
                </ul>
                <p>
                  This information is stored temporarily to enable abandoned checkout recovery. If you do not complete your purchase, we may send you a recovery email with a link to resume your checkout. You can opt out of these communications at any time.
                </p>
                <p>
                  <strong>Data Retention:</strong> Abandoned checkout data is retained for a period determined by our recovery time window settings (configurable by administrators). Once an order is completed or the data expires, it is removed from our active systems.
                </p>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Cookies and Session Data</h3>
                <p>
                  We use cookies and session identifiers to track your shopping cart and checkout progress. These include:
                </p>
                <ul>
                  <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser, used to maintain your cart and checkout session</li>
                  <li><strong>Cart Cookies:</strong> Cookies that store your shopping cart contents</li>
                  <li><strong>Checkout Session Tokens:</strong> Unique identifiers used to associate your checkout data with your session</li>
                </ul>
                <p>
                  For more detailed information about our cookie usage, please see our <Link href="/cookies-policy">Cookies Policy</Link>.
                </p>
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
                      rel="noreferrer"
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

export default PolicyArea;
