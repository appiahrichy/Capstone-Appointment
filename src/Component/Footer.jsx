import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white text-center py-16 text-lg">
      {/* Top Links */}
      <div className="flex justify-center space-x-32 mb-6">
        <a href="#" className="hover:underline">Blogs</a>
        <a href="#" className="hover:underline">Our Team</a>
        <a href="Testimonial" className="hover:underline">Testimonials</a>
        <Link to="/settings?section=about" className="hover:underline">About</Link>
      </div>
      <br></br>

      {/* Contact Information */}
      <p className="mb-4">
        Contact us: <a href="mailto:info@hospital.com" className="hover:underline">info@hospital.com</a> | Phone: (123) 456-7890
      </p>
      <br></br>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-4 text-xl">
        <a href="#">
          <img src="src/assets/images/instagram.png" alt="instagram" className="w-8 h-8" />
        </a>
        <a href="#">
          <img src="src/assets/images/facebook.png" alt="facebook" className="w-8 h-8" />
        </a>
        <a href="#">
          <img src="src/assets/images/x.png" alt="x" className="w-8 h-8" />
        </a>
        <a href="#">
          <img src="src/assets/images/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
        </a>
      </div>
      <br></br><br></br>

      {/* Policy Links */}
      <div className="flex justify-center space-x-6 mb-2">
        <Link to="/settings?section=privacyAndPolicy" className="hover:underline">Privacy Policy</Link>
        <Link to="/settings?section=termsOfUse" className="hover:underline">Terms of Service</Link>
      </div>

      {/* Copyright */}
      <p className="text-xs">
        © 2025 AppointmentPro. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
