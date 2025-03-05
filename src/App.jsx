
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



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<StudentLoginPage />} />
        <Route path="/Stafflogin" element={<StaffloginPage />} />
        <Route path="/StudentorStaff" element={<StudentorStaffPage />} />
        <Route path="/Dashboard" element={<Dashboardpage />} />
        <Route path="/Studentdashboard" element={<Studentdashboardpage />} />
        <Route path="/Counselingapp" element={<Counselingapppage />} />
        <Route path="/Hospitalapp" element={<Hospitalapppage />} />
        <Route path="/Studentclinicapp" element={<Studentclinicapppage />} />
        <Route path="/AcademicAdvisorapp" element={<AcademicAdvisorapppage />} />

        
      </Routes>
    </Router>
  );
};

export default App;