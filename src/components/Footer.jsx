import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container ">
      <button>Footer</button>
      <h className="footer-title">copyright</h>
      <nav className="footer-nav">
        <Link to="/media">Social Media Links</Link>
        <Link to="/terms">Terms and Privacy Contact</Link>
      </nav>
    </footer>
  );
};

export default Footer;
