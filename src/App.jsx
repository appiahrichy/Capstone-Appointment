import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import StudentLoginPage from './Pages/Login';
import StaffloginPage from './Pages/Stafflogin';
import StudentorStaffPage from './Pages/StudentorStaff';
import Dashboardpage from './Pages/Dashboard';
import Studentdashboardpage from './Pages/Studentdashboard';
import Counselingapppage from './Pages/Counselingapp';
import Hospitalapppage from './Pages/Hospitalapp';
import Studentclinicapppage from './Pages/Studentclinicapp';
import AcademicAdvisorapppage from './Pages/AcademicAdvisorapp';
import DateandTimepage from './Pages/DateandTime';
import Confirmationpage from './Pages/Confirmation';
import AppointmentConfirmedpage from './Pages/AppointmentConfirmed';
import Navbarpage from './Component/Navbar';
import Navigationpage from './Component/Navigation.jsx';
import Notificationspage from './Pages/Notifications';
import Inboxpage from './Pages/Inbox';
import Hodapppage from './Pages/Hodapp';
import Testimonialpage from './Pages/Testimonial';
import Settingspage from './Pages/Settings';
import Todopage from './Pages/Todo';
import { LanguageProvider } from './context/LanguageProvider';
import './styles/theme.css';
import ViewBookingpage from './Pages/ViewBooking';

const App = () => {
  return (
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<StudentLoginPage />} />
            <Route path="/stafflogin" element={<StaffloginPage />} />
            <Route path="/studentorstaff" element={<StudentorStaffPage />} />
            <Route path="/dashboard" element={<Dashboardpage />} />
            <Route path="/studentdashboard" element={<Studentdashboardpage />} />
            <Route path="/counselingapp" element={<Counselingapppage />} />
            <Route path="/hospitalapp" element={<Hospitalapppage />} />
            <Route path="/studentclinicapp" element={<Studentclinicapppage />} />
            <Route path="/academicadvisorapp" element={<AcademicAdvisorapppage />} />
            <Route path="/dateandtime" element={<DateandTimepage />} />
            <Route path="/confirmation" element={<Confirmationpage />} />
            <Route path="/appointmentconfirmed" element={<AppointmentConfirmedpage />} />
            <Route path="/navbar" element={<Navbarpage />} />
            <Route path="/navigation" element={<Navigationpage />} />
            <Route path="/notifications" element={<Notificationspage />} />
            <Route path="/inbox" element={<Inboxpage />} />
            <Route path="/hodapp" element={<Hodapppage />} />
            <Route path="/testimonial" element={<Testimonialpage />} />
            <Route path="/settings" element={<Settingspage />} />
            <Route path="/todo" element={<Todopage />} />
            <Route path="/ViewBooking" element={<ViewBookingpage />} />
          </Routes>
        </Router>
      </LanguageProvider>
  );
};

export default App;