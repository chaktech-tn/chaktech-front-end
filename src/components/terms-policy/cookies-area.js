import Link from "next/link";
import contactInfo from "@config/contact";

const CookiesArea = () => {
  return (
    <section className="policy__area pb-120">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-10">
            <div className="policy__wrapper policy__translate p-relative z-index-1">
              <div className="policy__item mb-35">
                <h4 className="policy__meta">
                  Last updated: {new Date().toLocaleDateString()}
                </h4>
                <p>
                  This Cookies Policy explains how ChakTech ("we", "us", or "our") uses cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
                </p>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">What Are Cookies?</h3>
                <p>
                  Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Types of Cookies We Use</h3>
                
                <h4 className="policy__subtitle mt-4 mb-2">1. Essential Cookies</h4>
                <p>
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <ul>
                  <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser. These are used to maintain your session and shopping cart.</li>
                  <li><strong>Authentication Cookies:</strong> Used to identify you when you log in to your account.</li>
                </ul>

                <h4 className="policy__subtitle mt-4 mb-2">2. Shopping Cart Cookies</h4>
                <p>
                  These cookies store information about your shopping cart contents so that your cart persists across page visits and browser sessions.
                </p>
                <ul>
                  <li><strong>Cart Contents:</strong> Stores the products you have added to your cart</li>
                  <li><strong>Cart Session:</strong> Maintains your cart session across page navigation</li>
                </ul>

                <h4 className="policy__subtitle mt-4 mb-2">3. Checkout Session Cookies</h4>
                <p>
                  These cookies are used during the checkout process to facilitate order completion and abandoned checkout recovery.
                </p>
                <ul>
                  <li><strong>Checkout Session Token:</strong> A unique identifier that associates your checkout data with your browsing session</li>
                  <li><strong>Checkout Data:</strong> Temporarily stores information you enter during checkout (name, address, phone, email) to enable recovery if you don't complete your purchase</li>
                </ul>

                <h4 className="policy__subtitle mt-4 mb-2">4. Preference Cookies</h4>
                <p>
                  These cookies remember your preferences and settings to provide a personalized experience.
                </p>
                <ul>
                  <li>Language preferences</li>
                  <li>Currency preferences</li>
                  <li>Display preferences</li>
                </ul>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Cookie Duration</h3>
                <ul>
                  <li><strong>Session Cookies:</strong> These expire when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them</li>
                  <li><strong>Cart Cookies:</strong> Typically expire after 30 days of inactivity</li>
                  <li><strong>Checkout Session Tokens:</strong> Valid for the duration of your checkout session and may persist for recovery purposes according to our abandoned checkout recovery time window (configurable by administrators, typically 24 hours)</li>
                </ul>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Third-Party Cookies</h3>
                <p>
                  We may also use third-party cookies from trusted partners for analytics, advertising, and other purposes. These cookies are subject to the respective third parties' privacy policies.
                </p>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Managing Cookies</h3>
                <p>
                  You can control and manage cookies in various ways:
                </p>
                <ul>
                  <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies. You can also delete cookies that have already been set.</li>
                  <li><strong>Browser-Specific Instructions:</strong>
                    <ul>
                      <li>Chrome: Settings → Privacy and Security → Cookies</li>
                      <li>Firefox: Options → Privacy & Security → Cookies</li>
                      <li>Safari: Preferences → Privacy → Cookies</li>
                      <li>Edge: Settings → Privacy, Search, and Services → Cookies</li>
                    </ul>
                  </li>
                  <li><strong>Impact of Disabling Cookies:</strong> Please note that disabling cookies may affect the functionality of our website, including your ability to add items to your cart, complete checkout, and access certain features.</li>
                </ul>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Data Retention</h3>
                <p>
                  Cookie data and session information are retained according to the following schedule:
                </p>
                <ul>
                  <li><strong>Active Sessions:</strong> Data is retained while your session is active</li>
                  <li><strong>Abandoned Checkouts:</strong> Checkout data is retained according to our recovery time window (typically 24 hours, configurable by administrators)</li>
                  <li><strong>Completed Orders:</strong> Order data is retained according to our data retention policy as outlined in our Privacy Policy</li>
                  <li><strong>Expired Data:</strong> Data that exceeds retention periods is automatically deleted</li>
                </ul>
              </div>

              <div className="policy__contact">
                <h3 className="policy__title policy__title-2">Contact us</h3>
                <p>If you have questions about our use of cookies, please contact us:</p>

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

export default CookiesArea;

