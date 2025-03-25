import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  // Social media links
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8" />,
      url: 'https://www.instagram.com/peer_c_knust',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-6 h-6 sm:w-8 sm:h-8" />,
      url: 'https://www.facebook.com/peer.c.knust',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="w-6 h-6 sm:w-8 sm:h-8" />,
      url: 'https://twitter.com/P.Counselors.KNUST',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />,
      url: 'https://www.linkedin.com/company/peer-c-knust',
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <footer className="bg-blue-500 text-white text-center py-12 text-sm sm:text-base md:text-lg">
      {/* Top Links */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-12 md:gap-16 mb-4">
        <a href="#" className="hover:underline transition-colors duration-200">Blogs</a>
        <a href="#" className="hover:underline transition-colors duration-200">Our Team</a>
        <Link to="/testimonial" className="hover:underline transition-colors duration-200">Testimonials</Link>
        <Link to="/settings?section=about" className="hover:underline transition-colors duration-200">About</Link>
      </div>

      {/* Contact Information */}
      <p className="mb-2 sm:mb-4 text-xs sm:text-sm md:text-base">
        Contact us: <a href="mailto:info@knusthospital.edu.gh" className="hover:underline transition-colors duration-200">info@knusthospital.edu.gh</a> | Phone: +233 20 123 4567
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white transition-colors duration-200 ${social.color} transform hover:scale-110`}
            aria-label={`Visit our ${social.name} page`}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Policy Links */}
      <div className="flex justify-center space-x-6 mb-2">
        <Link to="/settings?section=privacyAndPolicy" className="hover:underline transition-colors duration-200">Privacy Policy</Link>
        <Link to="/settings?section=termsOfUse" className="hover:underline transition-colors duration-200">Terms of Service</Link>
      </div>

      {/* Copyright */}
      <p className="text-xs sm:text-sm">
        © {new Date().getFullYear()} KNUST Hospital. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
