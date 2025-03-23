import { FaTimes, FaStar, FaRegStar, FaTrash, FaReply } from 'react-icons/fa';
import PropTypes from 'prop-types';

const MessageView = ({ message, isOpen, onClose, onStar, onDelete, onReply }) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Message Details</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onReply(message)}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              title="Reply"
            >
              <FaReply />
            </button>
            <button
              onClick={() => onStar(message.id)}
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              title={message.starred ? "Unstar" : "Star"}
            >
              {message.starred ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this message?')) {
                  onDelete(message.id);
                  onClose();
                }
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
              title="Delete"
            >
              <FaTrash />
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{message.subject}</h3>
                <p className="text-gray-600">From: {message.department}</p>
              </div>
              <span className="text-gray-500">{message.date}</span>
            </div>
            <div className="border-t pt-4">
              <p className="text-gray-800 whitespace-pre-wrap">
                {message.content || "No content available for this message."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={() => onReply(message)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

MessageView.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string,
    starred: PropTypes.bool.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onStar: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired
};

export default MessageView;
