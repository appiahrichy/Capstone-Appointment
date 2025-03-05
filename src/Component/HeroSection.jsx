import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImage from '../assets/images/Landing.jpg'; // Ensure the path is correct

const HeroSection = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prevScale) => (prevScale === 1 ? 1.05 : 1)); // Slight zoom in/out effect
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-white flex items-end justify-end w-full h-screen pb-12 md:pb-20 lg:pb-24 overflow-hidden">
      {/* Background Container (Zooms independently) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] ease-in-out"
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          transform: `scale(${scale})` // Apply the zoom effect
        }}
      ></div>

      {/* Dark Overlay for Better Contrast */}
     

      {/* Content (Stays fixed) */}
      <div className="relative z-10 pr-12 md:pr-20 lg:pr-28 text-center">  
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          CAPSTONE <br />
          APPOINTMENT
        </h2>
        <Link to="/StudentorStaff">
          <button className="bg-gray-700 px-8 py-3 mt-6 rounded-md text-lg md:text-xl text-white transition-transform duration-300 hover:scale-105">
            Log in
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
