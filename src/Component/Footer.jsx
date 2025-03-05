const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white text-center py-6 text-sm">
      {/* Top Links */}
      <div className="flex justify-center space-x-10 mb-4">
        <a href="#" className="hover:underline">Blogs</a>
        <a href="#" className="hover:underline">Our Team</a>
        <a href="#" className="hover:underline">Testimonials</a>
        <a href="#" className="hover:underline">About</a>
      </div>

      {/* Contact Information */}
      <p className="mb-4">
        Contact us: <a href="mailto:info@hospital.com" className="hover:underline">info@hospital.com</a> | Phone: (123) 456-7890
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-4 text-xl">
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fas fa-times"></i></a>
        <a href="#"><i className="fab fa-linkedin"></i></a>
      </div>

      {/* Policy Links */}
      <div className="flex justify-center space-x-6 mb-2">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
      </div>

      {/* Copyright */}
      <p className="text-xs">
        © 2025 AppointmentPro. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
