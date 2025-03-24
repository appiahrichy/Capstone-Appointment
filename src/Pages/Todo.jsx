import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import Navigation from '../Component/Navigation';
import { useLanguage } from '../context/useLanguage';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSettings, setActiveSettings] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editFormData, setEditFormData] = useState({
    department: '',
    duration: '',
    date: '',
    note: '',
    email: '',
  });
  const [todos, setTodos] = useState([
    {
      id: 1,
      department: 'Counseling Department',
      duration: '30 Minute Meeting',
      date: 'Thursday, 9/20/2023 - 9:30am',
      status: 'pending',
      bookingPage: '/counseling-booking',
      notes: '',
      reminder: null
    },
    {
      id: 2,
      department: 'Hospital Department',
      duration: '45 Minute Checkup',
      date: 'Friday, 9/21/2023 - 10:00am',
      status: 'cancelled',
      bookingPage: '/hospital-booking',
      notes: '',
      reminder: null
    },
    {
      id: 3,
      department: 'Academic Department',
      duration: '1 Hour Consultation',
      date: 'Monday, 9/24/2023 - 2:00pm',
      status: 'completed',
      bookingPage: '/academic-booking',
      notes: '',
      reminder: null
    },
    {
      id: 4,
      department: 'Career Counseling',
      duration: '45 Minute Session',
      date: 'Tuesday, 9/25/2023 - 11:30am',
      status: 'pending',
      bookingPage: '/career-booking',
      notes: '',
      reminder: null
    },
    {
      id: 5,
      department: 'Dental Clinic',
      duration: '1 Hour Checkup',
      date: 'Wednesday, 9/26/2023 - 3:15pm',
      status: 'pending',
      bookingPage: '/dental-booking',
      notes: '',
      reminder: null
    },
    {
      id: 6,
      department: 'Mental Health Services',
      duration: '50 Minute Session',
      date: 'Thursday, 9/27/2023 - 1:00pm',
      status: 'cancelled',
      bookingPage: '/mental-health-booking',
      notes: '',
      reminder: null
    },
    {
      id: 7,
      department: 'Academic Advising',
      duration: '30 Minute Meeting',
      date: 'Friday, 9/28/2023 - 9:00am',
      status: 'completed',
      bookingPage: '/academic-advising-booking',
      notes: '',
      reminder: null
    },
    {
      id: 8,
      department: 'Physiotherapy',
      duration: '45 Minute Session',
      date: 'Monday, 10/1/2023 - 4:00pm',
      status: 'pending',
      bookingPage: '/physiotherapy-booking',
      notes: '',
      reminder: null
    },
    {
      id: 9,
      department: 'Language Support',
      duration: '1 Hour Tutorial',
      date: 'Tuesday, 10/2/2023 - 2:30pm',
      status: 'completed',
      bookingPage: '/language-support-booking',
      notes: '',
      reminder: null
    },
    {
      id: 10,
      department: 'Study Skills Workshop',
      duration: '2 Hour Workshop',
      date: 'Wednesday, 10/3/2023 - 10:00am',
      status: 'pending',
      bookingPage: '/study-skills-booking',
      notes: '',
      reminder: null
    }
  ]);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.department.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return todo.status === 'pending' && matchesSearch;
    if (filter === 'cancelled') return todo.status === 'cancelled' && matchesSearch;
    if (filter === 'completed') return todo.status === 'completed' && matchesSearch;
    return matchesSearch;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSettingsClick = (todoId, event) => {
    event.stopPropagation();
    setActiveSettings(activeSettings === todoId ? null : todoId);
    const todo = todos.find(todo => todo.id === todoId);
    setSelectedTodo(todo);
    if (todo) {
      setEditFormData({
        department: todo.department,
        duration: todo.duration,
        date: todo.date.split(' - ')[0],
      });
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setEditFormData({
      department: todo.department,
      duration: todo.duration,
      date: todo.date.split(' - ')[0],
    });
    setShowEditModal(true);
    setActiveSettings(null);
  };

  const handleSaveEdit = () => {
    if (selectedTodo) {
      setTodos(todos.map(todo =>
        todo.id === selectedTodo.id
          ? {
              ...todo,
              department: editFormData.department,
              duration: editFormData.duration,
              date: editFormData.date,
            }
          : todo
      ));
      setShowEditModal(false);
      setSelectedTodo(null);
      setEditFormData({
        department: '',
        duration: '',
        date: '',
      });
    }
  };

  const handleAddNote = (todo) => {
    setSelectedTodo(todo);
    setEditFormData({
      ...editFormData,
      note: todo.notes || ''
    });
    setShowNoteModal(true);
    setActiveSettings(null);
  };

  const handleSetReminder = (todo) => {
    setSelectedTodo(todo);
    const initialDate = todo.reminder 
      ? new Date(todo.reminder).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16);
    setEditFormData({
      ...editFormData,
      reminder: initialDate
    });
    setShowReminderModal(true);
    setActiveSettings(null);
  };

  const handleCancel = (todoId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setTodos(todos.map(todo => 
        todo.id === todoId 
          ? { ...todo, status: 'cancelled' }
          : todo
      ));
      setActiveSettings(null);
    }
  };

  const saveNote = (note) => {
    if (selectedTodo) {
      try {
        if (!note.trim()) {
          alert('Please enter a note before saving');
          return;
        }

        setTodos(todos.map(todo =>
          todo.id === selectedTodo.id
            ? { ...todo, notes: note.trim() }
            : todo
        ));
        alert('Note saved successfully!');
        setShowNoteModal(false);
        setSelectedTodo(null);
        setEditFormData({
          ...editFormData,
          note: ''
        });
      } catch {
        alert('Error saving note. Please try again.');
      }
    }
  };

  const saveReminder = (reminderDate) => {
    if (selectedTodo && reminderDate) {
      try {
        // Validate the date
        const reminder = new Date(reminderDate);
        if (isNaN(reminder.getTime())) {
          alert('Please enter a valid date and time');
          return;
        }

        // Only save if the date is in the future
        if (reminder < new Date()) {
          alert('Please select a future date and time');
          return;
        }

        setTodos(todos.map(todo =>
          todo.id === selectedTodo.id
            ? { ...todo, reminder: reminder.toISOString() }
            : todo
        ));
        // Show success message
        alert('Reminder set successfully!');
        setShowReminderModal(false);
        setSelectedTodo(null);
        setEditFormData({
          ...editFormData,
          reminder: ''
        });
      } catch {
        alert('Error setting reminder. Please try again.');
      }
    } else {
      alert('Please select a date and time for the reminder');
    }
  };

  const handleShare = (todo) => {
    setSelectedTodo(todo);
    setShowShareModal(true);
    setActiveSettings(null);
  };

  const saveShare = (email) => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    // In a real app, this would make an API call to share the todo
    alert(`Appointment details shared with ${email}`);
    setShowShareModal(false);
    setSelectedTodo(null);
    setEditFormData({
      ...editFormData,
      email: ''
    });
  };

  const handleViewBooking = (todo) => {
    const bookingData = {
      id: todo.id,
      title: todo.department,
      date: todo.date.split(' - ')[0],
      time: todo.date.split(' - ')[1],
      location: todo.department,
      status: todo.status,
      type: todo.department.includes('Clinic') ? 'Medical' : 
             todo.department.includes('Counseling') ? 'Counseling' : 
             todo.department.includes('Academic') ? 'Academic' : 'General',
      duration: todo.duration,
      notes: todo.notes || '',
      bookingPage: todo.bookingPage
    };

    navigate('/ViewBooking', { 
      state: { booking: bookingData }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100" onClick={() => setActiveSettings(null)}>
      <Navbar />
      <Navigation />

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Edit Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={editFormData.department}
                  onChange={(e) => setEditFormData({
                    ...editFormData,
                    department: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={editFormData.duration}
                  onChange={(e) => setEditFormData({
                    ...editFormData,
                    duration: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full border rounded p-2"
                  value={editFormData.date}
                  onChange={(e) => setEditFormData({
                    ...editFormData,
                    date: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Add Internal Note</h3>
            <textarea
              className="w-full h-32 border rounded p-2 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your note here..."
              value={editFormData.note || ''}
              onChange={(e) => setEditFormData({
                ...editFormData,
                note: e.target.value
              })}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowNoteModal(false);
                  setEditFormData({
                    ...editFormData,
                    note: ''
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => saveNote(editFormData.note)}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Set Reminder</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select when you would like to be reminded about this appointment
            </p>
            <input
              type="datetime-local"
              className="w-full border rounded p-2 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={editFormData.reminder || ''}
              onChange={(e) => setEditFormData({
                ...editFormData,
                reminder: e.target.value
              })}
              min={new Date().toISOString().slice(0, 16)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowReminderModal(false);
                  setEditFormData({
                    ...editFormData,
                    reminder: ''
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => saveReminder(editFormData.reminder)}
              >
                Save Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Share Appointment Details</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the email address of the person you want to share this appointment with
            </p>
            <input
              type="email"
              className="w-full border rounded p-2 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter email address"
              value={editFormData.email || ''}
              onChange={(e) => setEditFormData({
                ...editFormData,
                email: e.target.value
              })}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowShareModal(false);
                  setEditFormData({
                    ...editFormData,
                    email: ''
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => saveShare(editFormData.email)}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Search and Filter Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-64">
              <input
                type="text"
                placeholder={translate('todo.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {translate('todo.all')}
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {translate('todo.pending')}
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-4 py-2 rounded-lg ${filter === 'cancelled' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {translate('todo.cancelled')}
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {translate('todo.completed')}
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-4">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {todo.department}
                    </h3>
                    <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors">
                      {todo.duration}
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => handleSettingsClick(todo.id, e)}
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    {activeSettings === todo.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={() => handleEdit(todo)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleAddNote(todo)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Add Note
                          </button>
                          <button
                            onClick={() => handleSetReminder(todo)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Set Reminder
                          </button>
                          <button
                            onClick={() => handleCancel(todo.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Cancel Appointment
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="group-hover:text-gray-600 transition-colors">{todo.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="group-hover:text-gray-600 transition-colors">{todo.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm capitalize transition-all duration-300 ${getStatusClass(todo.status)}`}>
                    {translate(`todo.status.${todo.status}`)}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleViewBooking(todo)}
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200 hover:underline flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {translate('todo.viewBooking')}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(todo);
                      }}
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span>{translate('todo.share')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo; 