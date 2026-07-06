import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">

          <h2>🍔 Food Delivery</h2>

          <p>
            Delicious meals delivered to your doorstep
            quickly and securely.
          </p>

        </div>

        <div className="footer-section">

          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Restaurants</li>
            <li>Orders</li>
            <li>Cart</li>
          </ul>

        </div>

        <div className="footer-section">

          <h3>Contact</h3>

          <p>
            <FaEnvelope /> fooddelivery@gmail.com
          </p>

          <p>
            <FaPhone /> +91 9876543210
          </p>

        </div>

        <div className="footer-section">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Food Delivery. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;