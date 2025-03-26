import { useState, useEffect } from 'react';
import { FaSearch, FaStar, FaRegStar, FaTrash, FaInbox, FaPaperPlane, FaClock, FaFileAlt, FaExclamationCircle } from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import Navigation from '../Component/Navigation';
import ComposeModal from '../Component/ComposeModal';
import MessageView from '../Component/MessageView';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageViewOpen, setIsMessageViewOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState(new Set());

  // Fetch messages from localStorage on component mount
  useEffect(() => {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    if (!studentInfo) {
      navigate('/login');
      return;
    }

    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    // Filter messages for the current user
    const userMessages = allMessages.filter(message => message.recipientId === studentInfo.studentId);
    setMessages(userMessages);
  }, [navigate]);

  // Add useEffect to handle global search
  useEffect(() => {
    const globalSearchQuery = localStorage.getItem('globalSearchQuery');
    if (globalSearchQuery) {
      setSearchQuery(globalSearchQuery);
      // Clear the global search query after using it
      localStorage.removeItem('globalSearchQuery');
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedMessages(new Set());
  };

  const handleStarMessage = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId);
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      setSelectedMessages(prev => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });
    }
  };

  const handleDeleteSelected = () => {
    if (selectedMessages.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedMessages.size} selected messages?`)) {
      const updatedMessages = messages.filter(msg => !selectedMessages.has(msg.id));
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      setSelectedMessages(new Set());
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setIsMessageViewOpen(true);
  };

  const handleReply = () => {
    setIsMessageViewOpen(false);
    setIsComposeOpen(true);
  };

  const handleSelectMessage = (messageId, event) => {
    event.stopPropagation();
    
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(messageId)) {
      newSelected.delete(messageId);
    } else {
      newSelected.add(messageId);
    }
    setSelectedMessages(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedMessages.size === filteredMessages.length) {
      setSelectedMessages(new Set());
    } else {
      setSelectedMessages(new Set(filteredMessages.map(msg => msg.id)));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedMessages(new Set());
  };

  const handleSendMessage = (newMessage) => {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    if (!studentInfo) {
      navigate('/login');
      return;
    }

    const maxId = Math.max(...messages.map(msg => msg.id), 0);
    const messageToAdd = {
      id: maxId + 1,
      department: newMessage.recipient,
      subject: newMessage.subject,
      content: newMessage.message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      starred: false,
      status: 'sent',
      senderId: studentInfo.studentId,
      recipientId: newMessage.recipientId
    };

    const updatedMessages = [messageToAdd, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'inbox') return message.status === 'inbox' && matchesSearch;
    if (activeTab === 'starred') return message.starred && matchesSearch;
    if (activeTab === 'sent') return message.status === 'sent' && matchesSearch;
    if (activeTab === 'draft') return message.status === 'draft' && matchesSearch;
    if (activeTab === 'snoozed') return message.status === 'snoozed' && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Navigation />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <button
            onClick={() => setIsComposeOpen(true)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors mb-4"
          >
            Compose
          </button>
          
          <div className="space-y-1">
            <button
              onClick={() => handleTabClick('inbox')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'inbox' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <FaInbox className="mr-3 text-gray-600" />
              <span>Inbox</span>
            </button>
            <button
              onClick={() => handleTabClick('starred')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'starred' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <FaStar className="mr-3 text-gray-600" />
              <span>Starred</span>
            </button>
            <button
              onClick={() => handleTabClick('sent')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'sent' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <FaPaperPlane className="mr-3 text-gray-600" />
              <span>Sent</span>
            </button>
            <button
              onClick={() => handleTabClick('draft')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'draft' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <FaFileAlt className="mr-3 text-gray-600" />
              <span>Drafts</span>
            </button>
            <button
              onClick={() => handleTabClick('snoozed')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'snoozed' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <FaClock className="mr-3 text-gray-600" />
              <span>Snoozed</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex items-center flex-1 bg-gray-100 rounded-lg px-4 py-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search in messages"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-transparent outline-none flex-1"
                />
              </div>
              {selectedMessages.size > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="ml-4 text-red-600 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <FaExclamationCircle className="mr-2" />
                No messages found
              </div>
            ) : (
              filteredMessages.map(message => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedMessages.has(message.id) ? 'bg-gray-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMessages.has(message.id)}
                    onChange={(e) => handleSelectMessage(message.id, e)}
                    className="mr-4"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStarMessage(message.id);
                    }}
                    className="mr-4 text-gray-400 hover:text-yellow-500"
                  >
                    {message.starred ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="font-medium truncate mr-4">{message.department}</span>
                      <span className="text-sm text-gray-500">{message.date}</span>
                    </div>
                    <div className="text-sm text-gray-600 truncate">{message.subject}</div>
                    <div className="text-sm text-gray-500 truncate">{message.content}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isComposeOpen && (
        <ComposeModal
          onClose={() => setIsComposeOpen(false)}
          onSend={handleSendMessage}
        />
      )}

      {isMessageViewOpen && selectedMessage && (
        <MessageView
          message={selectedMessage}
          onClose={() => setIsMessageViewOpen(false)}
          onReply={handleReply}
        />
      )}
    </div>
  );
};

export default Inbox;
