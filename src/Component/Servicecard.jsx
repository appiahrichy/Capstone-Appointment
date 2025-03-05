import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ServiceCard = ({ title, description, image, path }) => {
  return (
    <div className="border border-blue-400 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white overflow-hidden p-5 text-center">
      <img src={image} alt={title} className="w-20 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <Link to={path} className="text-blue-600 font-semibold hover:underline">
        Book Now →
      </Link>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default ServiceCard;
