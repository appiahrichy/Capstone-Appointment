import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaTicketAlt, FaFilter, FaSort, FaSearch, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [reply, setReply] = useState("")

  useEffect(() => {
    // Check if user is authenticated as staff
    const staffInfo = JSON.parse(localStorage.getItem('staffInfo'))
    if (!staffInfo) {
      navigate('/stafflogin')
      return
    }

    // Load tickets from localStorage
    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    setTickets(storedTickets)
    setFilteredTickets(storedTickets)
  }, [navigate])

  useEffect(() => {
    let filtered = [...tickets]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        default:
          return 0
      }
    })

    setFilteredTickets(filtered)
  }, [tickets, searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy])

  const handleStatusChange = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    )
    setTickets(updatedTickets)
    localStorage.setItem('tickets', JSON.stringify(updatedTickets))
  }

  const handleReply = (ticketId) => {
    if (!reply.trim()) return

    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? {
        ...ticket,
        replies: [...(ticket.replies || []), {
          text: reply,
          timestamp: new Date().toISOString(),
          isAdmin: true
        }]
      } : ticket
    )
    setTickets(updatedTickets)
    localStorage.setItem('tickets', JSON.stringify(updatedTickets))
    setReply("")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-800"
      case "in_progress": return "bg-blue-100 text-blue-800"
      case "resolved": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      <div className="max-w-7xl mx-auto relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FaTicketAlt className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="account">Account Issues</option>
                <option value="technical">Technical Problems</option>
                <option value="billing">Billing Issues</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{ticket.subject}</h3>
                    <p className="text-sm text-gray-500">By {ticket.name} ({ticket.studentId})</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <FaTicketAlt className="mr-1" />
                      {ticket.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(ticket.id, "in_progress")
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(ticket.id, "resolved")
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaCheckCircle />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.subject}</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimesCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ticket Details</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedTicket.status.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Priority</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{selectedTicket.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{selectedTicket.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {new Date(selectedTicket.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-2 text-sm text-gray-900 whitespace-pre-wrap">{selectedTicket.description}</p>
                </div>

                {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Attachments</h3>
                    <ul className="mt-2 space-y-2">
                      {selectedTicket.attachments.map((attachment, index) => (
                        <li key={index} className="text-sm text-blue-600 hover:text-blue-800">
                          {attachment.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTicket.replies && selectedTicket.replies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Replies</h3>
                    <div className="mt-2 space-y-4">
                      {selectedTicket.replies.map((reply, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            reply.isAdmin ? 'bg-blue-50' : 'bg-gray-50'
                          }`}
                        >
                          <p className="text-sm text-gray-900">{reply.text}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(reply.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Reply</h3>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows="4"
                    className="mt-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your reply here..."
                  />
                  <button
                    onClick={() => handleReply(selectedTicket.id)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard 