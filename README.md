# KNUST Appointment System

A comprehensive appointment scheduling system for Kwame Nkrumah University of Science and Technology (KNUST) students and staff.

## Overview

This application is a React-based web platform that allows KNUST students to schedule appointments with various departments including:
- KNUST Hospital
- Student Clinic
- Counseling Center
- HOD Office

## Login Credentials

### Student Login
```
Student ID: 10234567
Password: student123
```

### Staff Login
```
Staff ID: STAFF001
Password: staff123
```

## Features

### For Students
- User authentication (login/register)
  - Student ID and password-based authentication
  - Password reset functionality
  - Session persistence
- Appointment scheduling
  - Multiple appointment types
  - Real-time availability checking
  - Conflict detection
  - Duration selection (15, 30, 45 minutes)
- Real-time notifications
  - Push notifications
  - Email notifications
  - In-app notifications
- Appointment reminders
  - 24-hour advance reminder
  - 1-hour advance reminder
  - Custom reminder settings
- Appointment history tracking
  - Past appointments
  - Upcoming appointments
  - Cancelled appointments
- Todo list management
  - Create, edit, delete todos
  - Priority setting
  - Due date tracking
- Multiple appointment types support
  - Medical appointments
  - Academic advising
  - Counseling sessions
  - HOD meetings

### For Staff
- Appointment management
  - View all appointments
  - Filter by date/time
  - Filter by student
  - Filter by type
- Student information viewing
  - Student details
  - Appointment history
  - Medical records (for medical staff)
- Schedule management
  - Set availability
  - Block time slots
  - Manage recurring appointments
- Department-specific interfaces
  - Customized views per department
  - Department-specific features
  - Role-based access control

## Technical Stack

- **Frontend Framework**: React with Vite
  - React 18.2.0
  - Vite 4.5.0
  - React Router 6.15.0
- **State Management**: React Hooks
  - useState
  - useEffect
  - useCallback
  - useMemo
  - useContext
- **Styling**: Tailwind CSS
  - Tailwind CSS 3.3.0
  - Custom components
  - Responsive design
- **Icons**: React Icons
  - Material Icons
  - Hero Icons
  - Custom SVG icons
- **Routing**: React Router
  - Protected routes
  - Dynamic routing
  - Route guards
- **Local Storage**: Browser's localStorage for data persistence
  - Encrypted storage
  - Data validation
  - Cache management

## Project Structure

```
src/
├── Component/           # Reusable UI components
│   ├── Navbar/         # Navigation components
│   ├── Forms/          # Form components
│   ├── Cards/          # Card components
│   └── Modals/         # Modal components
├── Pages/              # Page components
│   ├── Auth/          # Authentication pages
│   ├── Student/       # Student pages
│   ├── Staff/         # Staff pages
│   └── Common/        # Shared pages
├── utils/              # Utility functions
│   ├── auth.js        # Authentication utilities
│   ├── validation.js  # Form validation
│   └── helpers.js     # Helper functions
├── database.js         # Database operations
└── App.jsx            # Main application component
```

## Key Components

### 1. Authentication
```javascript
// Example of authentication flow
const handleLogin = async (credentials) => {
  try {
    const response = await validateCredentials(credentials);
    if (response.success) {
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    }
  } catch (error) {
    handleError(error);
  }
};
```

### 2. Appointment System
```javascript
// Example of appointment creation
const createAppointment = async (appointmentData) => {
  try {
    const response = await validateTimeSlot(appointmentData);
    if (response.available) {
      const appointment = await saveAppointment(appointmentData);
      createNotification(appointment);
      updateCalendar(appointment);
    }
  } catch (error) {
    handleError(error);
  }
};
```

### 3. Notification System
```javascript
// Example of notification handling
const handleNotification = (notification) => {
  if (notification.type === 'appointment') {
    createAppointmentNotification(notification);
  } else if (notification.type === 'reminder') {
    createReminderNotification(notification);
  }
};
```

## Database Schema

### Students
```javascript
{
  studentId: string,      // Unique identifier
  username: string,       // Login username
  password: string,       // Hashed password
  fullName: string,       // Student's full name
  email: string,         // Student's email
  department: string,    // Academic department
  level: string,         // Current level
  phoneNumber: string,   // Contact number
  createdAt: Date,       // Account creation date
  lastLogin: Date        // Last login timestamp
}
```

### Appointments
```javascript
{
  id: string,            // Unique identifier
  studentId: string,     // Student reference
  staffId: string,       // Staff reference
  date: string,          // Appointment date
  time: string,          // Appointment time
  type: string,          // Appointment type
  status: string,        // Current status
  location: string,      // Meeting location
  notes: string,         // Additional notes
  priority: string,      // Priority level
  duration: number,      // Duration in minutes
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

### Notifications
```javascript
{
  id: string,            // Unique identifier
  appointmentId: string, // Appointment reference
  userId: string,        // User reference
  title: string,         // Notification title
  message: string,       // Notification message
  type: string,          // Notification type
  read: boolean,         // Read status
  priority: string,      // Priority level
  createdAt: Date,       // Creation timestamp
  expiresAt: Date        // Expiration timestamp
}
```

## Security Features

1. Password Hashing
   - bcrypt algorithm
   - Salt generation
   - Password strength validation

2. Session Management
   - JWT tokens
   - Token expiration
   - Refresh tokens

3. Input Validation
   - Form validation
   - Data sanitization
   - XSS prevention

4. XSS Protection
   - Content Security Policy
   - Input escaping
   - Output encoding

5. CSRF Protection
   - CSRF tokens
   - Same-origin policy
   - Secure cookies

## Error Handling

The application implements comprehensive error handling for:
- Network errors
  - Connection timeouts
  - Server errors
  - API failures
- Authentication failures
  - Invalid credentials
  - Expired sessions
  - Locked accounts
- Invalid inputs
  - Form validation errors
  - Data type mismatches
  - Required field validation
- Duplicate appointments
  - Time slot conflicts
  - Student conflicts
  - Staff availability
- Database errors
  - Connection issues
  - Query failures
  - Data integrity errors

## Performance Optimization

1. React.memo for component optimization
   - Prevents unnecessary re-renders
   - Optimizes rendering performance
   - Improves user experience

2. useCallback for function memoization
   - Caches function references
   - Reduces re-renders
   - Optimizes event handlers

3. useMemo for value memoization
   - Caches computed values
   - Optimizes expensive calculations
   - Improves rendering performance

4. Efficient state management
   - Local state optimization
   - Context optimization
   - State updates batching

5. Optimized re-renders
   - Virtual DOM optimization
   - Render batching
   - Conditional rendering

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact:
- Email: support@knust.edu.gh
- Phone: +233 XX XXX XXXX
- Office: KNUST ICT Center

## Acknowledgments

- KNUST ICT Department
- React Team
- Tailwind CSS Team
- All contributors and maintainers
