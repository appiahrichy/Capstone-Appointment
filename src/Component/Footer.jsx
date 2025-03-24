import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white text-center py-12 text-sm sm:text-base md:text-lg">
      {/* Top Links */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-12 md:gap-16 mb-4">
        <a href="#" className="hover:underline">Blogs</a>
        <a href="#" className="hover:underline">Our Team</a>
        <a href="Testimonial" className="hover:underline">Testimonials</a>
        <Link to="/settings?section=about" className="hover:underline">About</Link>
      </div>

      {/* Contact Information */}
      <p className="mb-2 sm:mb-4 text-xs sm:text-sm md:text-base">
        Contact us: <a href="mailto:info@hospital.com" className="hover:underline">info@hospital.com</a> | Phone: (123) 456-7890
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-4">
        <a href="#">
          <img src="src/assets/images/instagram.png" alt="instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
        <a href="#">
          <img src="src/assets/images/facebook.png" alt="facebook" className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
        <a href="#">
          <img src="src/assets/images/x.png" alt="x" className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
        <a href="#">
          <img src="src/assets/images/linkedin.png" alt="LinkedIn" className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </div>

      {/* Policy Links */}
      <div className="flex justify-center space-x-6 mb-2">
        <Link to="/settings?section=privacyAndPolicy" className="hover:underline">Privacy Policy</Link>
        <Link to="/settings?section=termsOfUse" className="hover:underline">Terms of Service</Link>
      </div>

      {/* Copyright */}
      <p className="text-xs sm:text-sm">
        © 2025 AppointmentPro. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
