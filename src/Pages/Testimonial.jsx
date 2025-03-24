import { useState } from "react";
import Navbar from "../Component/Navbar";
import Navigation from "../Component/Navigation";
import testimonialImage from "../assets/images/Testimonial.png";

const testimonials = [
  {
    id: 1,
    name: "Kwame O. Nkrumah",
    text: "This website made scheduling my doctor's appointment so smooth! The reminders were spot on too. Highly recommend it.",
    image: testimonialImage
  },
  {
    id: 2,
    name: "Kwame O. Nkrumah",
    text: "This website made scheduling my doctor's appointment so smooth! The reminders were spot on too. Highly recommend it.",
    image: testimonialImage
  },
  {
    id: 3,
    name: "Kwame O. Nkrumah",
    text: "This website made scheduling my doctor's appointment so smooth! The reminders were spot on too. Highly recommend it.",
    image: testimonialImage
  },
  {
    id: 4,
    name: "Kwame O. Nkrumah",
    text: "This website made scheduling my doctor's appointment so smooth! The reminders were spot on too. Highly recommend it.",
    image: testimonialImage
  },
  {
    id: 5,
    name: "John Doe",
    text: "Excellent service! Booking an appointment was quick and hassle-free.",
    image: testimonialImage
  },
  {
    id: 6,
    name: "Jane Smith",
    text: "Super easy to use. I never miss an appointment now!",
    image: testimonialImage
  }
];

const Testimonials = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleViewMore = () => {
    setVisibleCount((prev) => (prev + 2 <= testimonials.length ? prev + 2 : testimonials.length));
  };

  return (
    <div>
      <Navbar />
      <Navigation />
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg mx-auto px-4 md:px-8 py-6">
          <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, visibleCount).map((testimonial) => (
              <div key={testimonial.id} className="bg-white border border-blue-200 p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex flex-col items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-blue-200" 
                />
                <p className="text-gray-700 text-center italic">{testimonial.text}</p>
                <p className="text-red-500 font-semibold mt-2">{testimonial.name}</p>
              </div>
            ))}
          </div>

          {/* Ensuring View More is Visible & Centered */}
          {visibleCount < testimonials.length && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleViewMore} 
                className="text-blue-600 font-medium cursor-pointer px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
              >
                View more...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
