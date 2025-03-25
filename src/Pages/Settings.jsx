import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import Navbar from '../Component/Navbar';
import Navigation from '../Component/Navigation';

const Settings = () => {
  const { currentLanguage, setCurrentLanguage, translate } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('account');
  const [theme, setTheme] = useState('light');
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);

  // Load saved preferences and user data from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'English';
    const studentInfo = localStorage.getItem('studentInfo');
    const staffInfo = localStorage.getItem('staffInfo');
    
    setTheme(savedTheme);
    setCurrentLanguage(savedLanguage);
    
    if (staffInfo) {
      setUserData(JSON.parse(staffInfo));
      setUserType('staff');
    } else if (studentInfo) {
      setUserData(JSON.parse(studentInfo));
      setUserType('student');
    } else {
      // Redirect to login if no user data found
      navigate('/');
    }

    // Check for section parameter in URL
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [setCurrentLanguage, location.search, navigate]);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Apply theme to body
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to log out?')) {
      // Clear all user-related data from localStorage
      localStorage.removeItem('userType');
      localStorage.removeItem('token');
      localStorage.removeItem('studentInfo');
      localStorage.removeItem('staffInfo');
      navigate('/');
    }
  };

  const handleChangeUser = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('staffInfo');
    navigate('/StudentorStaff');
  };

  const renderAccountContent = () => {
    if (!userData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="p-8">
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-white text-3xl mb-4">
            {userData.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
          {userType === 'student' ? (
            <p className="text-sm text-gray-500">{userData.email}</p>
          ) : (
            <p className="text-sm text-gray-500">{userData.staffId}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-6 mb-12">
          {userType === 'student' ? (
            <>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.studentId')}:</p>
                <p className="font-medium">{userData.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.indexNumber')}:</p>
                <p className="font-medium">{userData.indexNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.programmeStream')}:</p>
                <p className="font-medium">{userData.programmeStream}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.currentYear')}:</p>
                <p className="font-medium">{userData.currentYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.programmeOption')}:</p>
                <p className="font-medium">{userData.programmeOption}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.gender')}:</p>
                <p className="font-medium">{userData.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.status')}:</p>
                <p className="font-medium">{userData.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{translate('settings.campus')}:</p>
                <p className="font-medium">{userData.campus}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-600">Staff ID:</p>
                <p className="font-medium">{userData.staffId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Username:</p>
                <p className="font-medium">{userData.username}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleChangeUser}
            className="px-4 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition-colors"
          >
            {translate('settings.changeUser')}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition-colors"
          >
            {translate('settings.logOut')}
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountContent();
      case 'help':
        return (
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4 underline">{translate('settings.howCanWeHelp')}</h2>
            <p className="text-gray-600 mb-12 max-w-2xl">
              {translate('settings.helpDescription')}
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="border rounded-lg p-6 flex flex-col items-center">
                <div className="text-blue-700 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">OUR MAIN OFFICE</h3>
                <p className="text-center text-gray-600">College of Science, FF00</p>
              </div>

              <div className="border rounded-lg p-6 flex flex-col items-center">
                <div className="text-blue-700 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">PHONE NUMBER</h3>
                <p className="text-center text-gray-600">+233 55 675 8890</p>
              </div>

              <div className="border rounded-lg p-6 flex flex-col items-center">
                <div className="text-blue-700 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">FAX</h3>
                <p className="text-center text-gray-600">1-234-567-8900</p>
              </div>

              <div className="border rounded-lg p-6 flex flex-col items-center">
                <div className="text-blue-700 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">EMAIL</h3>
                <p className="text-center text-gray-600">appointmentpro@gmail.com</p>
              </div>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="p-8">
            {/* Theme Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Theme
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">Light Mode</span>
                    </div>
                    {theme === 'light' && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-inner">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
                  </div>
                </button>

                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">Dark Mode</span>
                    </div>
                    {theme === 'dark' && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3 mt-2"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Language
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { code: 'English', name: 'English', nativeName: 'English', flag: '🇬🇧' },
                  { code: 'French', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
                  { code: 'Spanish', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
                  { code: 'Chinese', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                      currentLanguage === lang.code
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-3xl">{lang.flag}</div>
                      <div className="text-center">
                        <div className="font-medium text-gray-800">{lang.name}</div>
                        <div className="text-sm text-gray-500">{lang.nativeName}</div>
                      </div>
                      {currentLanguage === lang.code && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="p-8">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">About Us</h2>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Simplifying Scheduling, Enhancing Convenience
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  At AppointmentPro, we believe booking appointments should be effortless, efficient, and stress-free. Whether you are scheduling a consultation, reserving a service, or managing multiple bookings, our platform provides a seamless experience tailored to your needs.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to revolutionize the way appointments are scheduled by providing a fast, reliable, and user-friendly platform. We aim to connect businesses and clients through a system that enhances productivity and saves valuable time.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Easy Booking Process — Set up and confirm appointments in just a few clicks</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>24/7 Availability — Schedule and manage bookings anytime, anywhere</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Automated Reminders — Never miss an appointment with our smart notifications</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Secure & Private — Your data is protected with industry-standard encryption</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Customizable Scheduling — Tailor your availability and preferences with ease</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Our Story</h3>
                <p className="text-gray-600 leading-relaxed">
                  Founded with a vision to eliminate scheduling frustrations, AppointmentPro was built to bridge the gap between service providers and customers. We understand the challenges of managing time efficiently, and our platform is designed to make scheduling appointments a hassle-free experience for businesses and individuals alike.
                </p>
              </div>
            </div>
          </div>
        );
      case 'privacyAndPolicy':
        return (
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>

                <div className="text-sm text-gray-600 mb-8 border-b border-gray-200 pb-4">
                  <div className="flex justify-between mb-2">
                    <span>Effective Date: 01/01/2025</span>
                    <span>Last Updated: 01/21/2025</span>
                  </div>
                </div>

                <div className="space-y-8 text-gray-600">
                  <p className="leading-relaxed">
                    Welcome to AppointmentPro. Your privacy is important to us, and we are 
                    committed to protecting it. This policy outlines how we collect, use, and share 
                    your data when you use our platform.
                  </p>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">1. Information We Collect</h3>
                    <ul className="list-none space-y-3 pl-4">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Required information: Name, email address, phone number, other contact details.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Personal information (if payments are processed through our platform, we 
                        may also) fit to process your payment information and comply with relevant 
                        financial regulations.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Contact & Technical Data: Device information to help enhance your 
                        browsing experience, solve preferences, and analyze site traffic.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">2. How We Use Your Information</h3>
                    <p className="mb-2">We use your information for the following purposes:</p>
                    <ul className="list-none space-y-3 pl-4">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>To send appointment purchases, confirmations, and important updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>To improve our platforms functionality and user experience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>To ensure security and prevent unauthorized access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>To comply with legal requirements and industry regulations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">3. How We Protect Your Data</h3>
                    <p className="mb-2">We implement industry-standard security measures to safeguard your personal 
                      information, including:</p>
                    <ul className="list-none space-y-3 pl-4">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Encryption of sensitive data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Restricted access to sensitive data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Regular security audits and compliance checks</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">4. Data Sharing & Third Parties</h3>
                    <p className="mb-2">We do not sell your personal information. However, we may share your data with:</p>
                    <ul className="list-none space-y-3 pl-4">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Service Providers: Third-party services that help operate our platform (e.g., 
                        payment processors, cloud storage providers)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Legal Authorities: If required by law, court order, or to protect our rights</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">5. Your Rights & Choices</h3>
                    <ul className="list-none space-y-3 pl-4">
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Access & View: Review your personal data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Update: Modify or correct your personal information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Opt Out: You can unsubscribe from marketing emails at any time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Delete Data: You may request the deletion of your account and associated information</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">6. Cookie Policy</h3>
                    <p>We use cookies to personalize your experience. You can manage or disable 
                      cookies through your browser settings.</p>
                  </div>

                  <div className="mt-8 text-sm border-t border-gray-200 pt-6">
                    <p>Our website may contain links to third-party sites. We are not responsible for 
                      their privacy practices and encourage you to review their policies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'termsOfUse':
        return (
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Terms of Use</h2>

                <div className="text-sm text-gray-600 mb-8 border-b border-gray-200 pb-4">
                  <div className="flex justify-between mb-2">
                    <span>Effective Date: 01/01/2025</span>
                    <span>Last Updated: 01/20/25</span>
                  </div>
                </div>

                <div className="space-y-8 text-gray-600">
                  <p className="leading-relaxed bg-white p-4 rounded-lg shadow-sm">
                    Welcome to AppointmentPro. By accessing or using our website and services, 
                    you agree to comply with and be bound by these Terms of Use. Please read 
                    them carefully before using our platform.
                  </p>

                  {/* 1. Acceptance of Terms */}
                  <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg border-b border-gray-100 pb-2">1. Acceptance of Terms</h3>
                    <p>
                      By using Your Website, you agree to these terms, along with our 
                      Privacy Policy. If you do not agree, please discontinue use of our services.
                    </p>
                  </div>

                  {/* 2. Use of Our Services */}
                  <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg border-b border-gray-100 pb-2">2. Use of Our Services</h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 text-xl">✓</span>
                        <span>You must be at least [minimum age (e.g. 18, 16)] years old or have parental consent.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 text-xl">✓</span>
                        <span>You agree to provide accurate and truthful information when booking an appointment.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 text-xl">✓</span>
                        <span>You are responsible for maintaining the confidentiality of your account.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 text-xl">✓</span>
                        <span>You agree not to misuse, copy, or falsify our services for unauthorized purposes.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 3. Booking & Cancellations */}
                  <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg border-b border-gray-100 pb-2">3. Booking & Cancellations</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Appointments must be scheduled according to the availability shown on the platform.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Cancellations must be done within the allowed timeframe (minimum 24 hours before the scheduled appointment).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Failure to show up for an appointment without cancellation may result in penalties or restricted access.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 4. Intellectual Property Rights */}
                  <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg border-b border-gray-100 pb-2">4. Intellectual Property Rights</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>All website content including text, graphics, logos, and software, is owned by Your AppointmentPro and protected by copyright laws.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>You may not copy, distribute, or reproduce any material without our written permission.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 5. Limitation of Liability */}
                  <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg border-b border-gray-100 pb-2">5. Limitation of Liability</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Losses or damages directly from missed appointments, technical issues, or system failures are not our responsibility.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>User disputes with service providers or clients booked through our platform. For unauthorized access or data disputes, though we take strict security measures.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 6. Termination of Use */}
                  <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg border-b border-gray-100 pb-2">6. Termination of Use</h3>
                    <p>
                      We reserve the right to suspend or terminate your access to AppointmentPro at 
                      any time if you violate these Terms of Use.
                    </p>
                  </div>

                  {/* 7. Changes to Policy */}
                  <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg border-b border-gray-100 pb-2">7. Changes to Policy</h3>
                    <p>
                      We may update these Terms of Use from time to time. Continued use of our 
                      platform after updates indicates acceptance of the new terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Navigation />
      <div className="flex h-[calc(100vh-128px)]">
        {/* Left Sidebar */}
        <div className="w-64 border-r bg-white">
          <nav className="p-4 space-y-2">
            <div
              onClick={() => handleSectionChange('account')}
              className={`flex items-center cursor-pointer p-2 rounded ${
                activeSection === 'account' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <span className="mr-3">👤</span>
              <span>Account</span>
            </div>
            <div
              onClick={() => handleSectionChange('help')}
              className={`flex items-center cursor-pointer p-2 rounded ${
                activeSection === 'help' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <span className="mr-3">❓</span>
              <span>Help</span>
            </div>
            <div
              onClick={() => handleSectionChange('appearance')}
              className={`flex items-center cursor-pointer p-2 rounded ${
                activeSection === 'appearance' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <span className="mr-3">🎨</span>
              <span>Appearance</span>
            </div>
            <div
              onClick={() => handleSectionChange('about')}
              className={`flex items-center cursor-pointer p-2 rounded ${
                activeSection === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <span className="mr-3">ℹ️</span>
              <span>About</span>
            </div>
            <div
              onClick={() => handleSectionChange('privacyAndPolicy')}
              className={`flex items-center cursor-pointer p-2 rounded ${
                activeSection === 'privacyAndPolicy' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <span className="mr-3">🔒</span>
              <span>Privacy and Policy</span>
            </div>
            <div
              onClick={() => handleSectionChange('termsOfUse')}
              className={`flex items-center cursor-pointer p-2 rounded ${
                activeSection === 'termsOfUse' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <span className="mr-3">📜</span>
              <span>Terms of Use</span>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-8">
            {activeSection === 'account' && (
              <div>
                <div className="flex justify-center mb-8">
                  <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-semibold">
                    {userData?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold text-center mb-2">{userData?.name}</h2>
                  {userType === 'student' ? (
                    <p className="text-gray-600 text-center mb-8">{userData?.email}</p>
                  ) : (
                    <p className="text-gray-600 text-center mb-8">{userData?.staffId}</p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-6">
                    {userType === 'student' ? (
                      <>
                        <div>
                          <p className="text-gray-600">{translate('settings.studentId')}:</p>
                          <p className="font-medium">{userData?.studentId}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{translate('settings.indexNumber')}:</p>
                          <p className="font-medium">{userData?.indexNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{translate('settings.programmeStream')}:</p>
                          <p className="font-medium">{userData?.programmeStream}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{translate('settings.currentYear')}:</p>
                          <p className="font-medium">{userData?.currentYear}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{translate('settings.programmeOption')}:</p>
                          <p className="font-medium">{userData?.programmeOption}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{translate('settings.gender')}:</p>
                          <p className="font-medium">{userData?.gender}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{translate('settings.status')}:</p>
                          <p className="font-medium">{userData?.status}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{translate('settings.campus')}:</p>
                          <p className="font-medium">{userData?.campus}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-gray-600">Staff ID:</p>
                          <p className="font-medium">{userData?.staffId}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Username:</p>
                          <p className="font-medium">{userData?.username}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={handleChangeUser}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Change User
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeSection !== 'account' && renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;