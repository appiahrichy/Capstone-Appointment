import  { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ComposeModal = ({ isOpen, onClose, onSend }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({
      recipient,
      subject,
      message,
      date: new Date().toLocaleDateString(),
      status: 'sent'
    });
    // Reset form
    setRecipient('');
    setSubject('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">New Message</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <input
              type="text"
              id="compose-recipient"
              name="compose-recipient"
              placeholder="To"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
              aria-label="Message recipient"
            />
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              id="compose-subject"
              name="compose-subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
              aria-label="Message subject"
            />
          </div>
          
          <div className="mb-4">
            <textarea
              id="compose-message"
              name="compose-message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="10"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
              required
              aria-label="Message content"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Send
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 px-6 py-2 rounded hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ComposeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired
};

export default ComposeModal;
