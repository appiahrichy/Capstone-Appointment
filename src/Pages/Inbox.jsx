import { useState, useEffect } from 'react';
import { FaSearch, FaStar, FaRegStar, FaTrash } from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import Navigation from '../Component/Navigation';
import ComposeModal from '../Component/ComposeModal';
import MessageView from '../Component/MessageView';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageViewOpen, setIsMessageViewOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      department: 'Hospital Department',
      subject: 'Report slip for 3045872 (20/25/2025) - Please find attached report slip for...',
      date: 'Feb 4',
      starred: false,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached your medical report slip for your recent visit to the Hospital Department. Your appointment details and prescribed medications are included in this report.\n\nPlease keep this for your records and follow up with your healthcare provider if needed.\n\nBest regards,\nHospital Department'
    },
    {
      id: 2,
      department: 'Counseling Department',
      subject: 'Report slip for 3045872 (20/25/2025) - Please find attached report slip for...',
      date: 'Feb 1',
      starred: true,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached your counseling report slip for your recent visit to the Counseling Department. Your appointment details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with your counselor if needed.\n\nBest regards,\nCounseling Department'
    },
    {
      id: 3,
      department: 'Clinic Department',
      subject: 'Report slip for 3045872 (20/25/2025) - Please find attached report slip for...',
      date: 'Jan 12',
      starred: false,
      status: 'sent',
      content: 'Dear Student,\n\nPlease find attached your clinic report slip for your recent visit to the Clinic Department. Your appointment details and prescribed medications are included in this report.\n\nPlease keep this for your records and follow up with your healthcare provider if needed.\n\nBest regards,\nClinic Department'
    },
    {
      id: 4,
      department: 'Academic Department',
      subject: 'Report slip for 3045872 (20/25/2025) - Please find attached report slip for...',
      date: 'Jan 12',
      starred: false,
      status: 'draft',
      content: 'Dear Student,\n\nPlease find attached your academic report slip for your recent visit to the Academic Department. Your appointment details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with your academic advisor if needed.\n\nBest regards,\nAcademic Department'
    },
    {
      id: 5,
      department: 'KNUST Student Report',
      subject: 'Report slip for 3045872 (20/25/2025) - Please find attached report slip for...',
      date: 'Jan 10',
      starred: true,
      status: 'snoozed',
      content: 'Dear Student,\n\nPlease find attached your student report slip for your recent visit to the KNUST Student Report. Your appointment details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with your student advisor if needed.\n\nBest regards,\nKNUST Student Report'
    },
    {
      id: 6,
      department: 'Financial Aid Office',
      subject: 'Scholarship Application Update - Important Information',
      date: 'Feb 3',
      starred: true,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached an update on your scholarship application. Your application details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Financial Aid Office if needed.\n\nBest regards,\nFinancial Aid Office'
    },
    {
      id: 7,
      department: 'Library Services',
      subject: 'Overdue Book Notice - Please Return',
      date: 'Feb 2',
      starred: false,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached a notice regarding an overdue book. Your book details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Library Services if needed.\n\nBest regards,\nLibrary Services'
    },
    {
      id: 8,
      department: 'Student Affairs',
      subject: 'Campus Event Registration Confirmation',
      date: 'Jan 30',
      starred: false,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached a confirmation of your registration for a campus event. Your event details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Student Affairs if needed.\n\nBest regards,\nStudent Affairs'
    },
    {
      id: 9,
      department: 'IT Support',
      subject: 'Password Reset Request Completed',
      date: 'Jan 28',
      starred: false,
      status: 'sent',
      content: 'Dear Student,\n\nPlease find attached a confirmation of your password reset request. Your password details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the IT Support if needed.\n\nBest regards,\nIT Support'
    },
    {
      id: 10,
      department: 'Career Services',
      subject: 'Upcoming Career Fair - Registration Open',
      date: 'Jan 25',
      starred: true,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached an announcement regarding an upcoming career fair. Your registration details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Career Services if needed.\n\nBest regards,\nCareer Services'
    },
    {
      id: 11,
      department: 'Research Department',
      subject: 'Research Project Approval Notice',
      date: 'Jan 20',
      starred: false,
      status: 'draft',
      content: 'Dear Student,\n\nPlease find attached a notice regarding the approval of your research project. Your project details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Research Department if needed.\n\nBest regards,\nResearch Department'
    },
    {
      id: 12,
      department: 'Sports Department',
      subject: 'Team Practice Schedule Update',
      date: 'Jan 18',
      starred: false,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached an update on the team practice schedule. Your practice details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Sports Department if needed.\n\nBest regards,\nSports Department'
    },
    {
      id: 13,
      department: 'Housing Office',
      subject: 'Dormitory Maintenance Notice',
      date: 'Jan 15',
      starred: false,
      status: 'snoozed',
      content: 'Dear Student,\n\nPlease find attached a notice regarding dormitory maintenance. Your maintenance details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Housing Office if needed.\n\nBest regards,\nHousing Office'
    },
    {
      id: 14,
      department: 'International Office',
      subject: 'Study Abroad Program Information',
      date: 'Jan 8',
      starred: true,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached information regarding the study abroad program. Your program details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the International Office if needed.\n\nBest regards,\nInternational Office'
    },
    {
      id: 15,
      department: 'Student Health Services',
      subject: 'Vaccination Campaign Information',
      date: 'Jan 5',
      starred: false,
      status: 'inbox',
      content: 'Dear Student,\n\nPlease find attached information regarding the vaccination campaign. Your vaccination details and recommended actions are included in this report.\n\nPlease keep this for your records and follow up with the Student Health Services if needed.\n\nBest regards,\nStudent Health Services'
    }
  ]);

  const [selectedMessages, setSelectedMessages] = useState(new Set());

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
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== messageId));
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
      setMessages(messages.filter(msg => !selectedMessages.has(msg.id)));
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
    // Prevent opening message view when clicking checkbox
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
    const maxId = Math.max(...messages.map(msg => msg.id));
    setMessages([
      {
        id: maxId + 1,
        department: newMessage.recipient,
        subject: newMessage.subject,
        content: newMessage.message,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        starred: false,
        status: 'sent'
      },
      ...messages
    ]);
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'starred':
        return message.starred && matchesSearch;
      case 'sent':
        return message.status === 'sent' && matchesSearch;
      case 'draft':
        return message.status === 'draft' && matchesSearch;
      case 'snoozed':
        return message.status === 'snoozed' && matchesSearch;
      default:
        return message.status === 'inbox' && matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6 transition-shadow duration-200 hover:shadow-2xl">
          {/* Left Sidebar */}
          <div className="flex mb-6">
            <div className="w-48 pr-4">
              <button 
                onClick={() => setIsComposeOpen(true)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors duration-200"
              >
                Compose
              </button>
              <ul className="space-y-2">
                <li 
                  onClick={() => handleTabClick('inbox')}
                  className={`p-2 rounded-md hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${activeTab === 'inbox' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'}`}
                >
                  Inbox ({messages.filter(m => m.status === 'inbox').length})
                </li>
                <li 
                  onClick={() => handleTabClick('starred')}
                  className={`p-2 rounded-md hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${activeTab === 'starred' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'}`}
                >
                  Starred ({messages.filter(m => m.starred).length})
                </li>
                <li 
                  onClick={() => handleTabClick('sent')}
                  className={`p-2 rounded-md hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${activeTab === 'sent' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'}`}
                >
                  Sent ({messages.filter(m => m.status === 'sent').length})
                </li>
                <li 
                  onClick={() => handleTabClick('draft')}
                  className={`p-2 rounded-md hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${activeTab === 'draft' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'}`}
                >
                  Draft ({messages.filter(m => m.status === 'draft').length})
                </li>
                <li 
                  onClick={() => handleTabClick('snoozed')}
                  className={`p-2 rounded-md hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${activeTab === 'snoozed' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'}`}
                >
                  Snoozed ({messages.filter(m => m.status === 'snoozed').length})
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  id="inbox-search"
                  name="inbox-search"
                  placeholder="Search Inbox"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  aria-label="Search inbox messages"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Select All and Delete Selected */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedMessages.size === filteredMessages.length && filteredMessages.length > 0}
                    onChange={handleSelectAll}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">
                    {selectedMessages.size} selected
                  </span>
                </div>
                {selectedMessages.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <FaTrash className="mr-1" />
                    Delete Selected
                  </button>
                )}
              </div>

              {/* Messages List */}
              <div className="space-y-2">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className="flex items-center p-4 border border-blue-200 rounded-md hover:shadow-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMessages.has(message.id)}
                      onChange={(e) => handleSelectMessage(message.id, e)}
                      className="mr-4 h-4 w-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {message.department}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStarMessage(message.id);
                            }}
                            className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                          >
                            {message.starred ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMessage(message.id);
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            <FaTrash />
                          </button>
                          <span className="text-sm text-gray-500">{message.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{message.subject}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <button className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200">Previous</button>
                <button className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      <ComposeModal 
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendMessage}
      />

      {/* Message View Modal */}
      <MessageView
        message={selectedMessage}
        isOpen={isMessageViewOpen}
        onClose={() => {
          setIsMessageViewOpen(false);
          setSelectedMessage(null);
        }}
        onStar={handleStarMessage}
        onDelete={handleDeleteMessage}
        onReply={handleReply}
      />
    </div>
  );
};

export default Inbox;
