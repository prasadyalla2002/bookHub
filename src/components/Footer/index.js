import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <FaGoogle className="social-icon" />
      <FaTwitter className="social-icon" />
      <FaInstagram className="social-icon" />
      <FaYoutube className="social-icon" />
    </div>
    <div className="contact-us-heading">Contact Us</div>
  </div>
)

export default Footer
