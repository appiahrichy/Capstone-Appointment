import { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';

const Settings = () => {
  const { currentLanguage, setCurrentLanguage, translate } = useLanguage();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');

  // Load saved preferences from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'English';
    setTheme(savedTheme);
    setLanguage(savedLanguage);
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    // Apply theme to body
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
  }, [theme, language]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };


  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    // Redirect to home page
    navigate('/');
  };

  const handleChangeUser = () => {
    // Redirect to the student/staff selection page
    navigate('/StudentorStaff');
  };

  const tabs = [
    { name: 'account', icon: '👤' },
    { name: 'help', icon: '❓' },
    { name: 'appearance', icon: '🎨' },
    { name: 'about', icon: 'ℹ️' },
    { name: 'privacyAndPolicy', icon: '🔒' },
    { name: 'termsOfUse', icon: '📜' },
  ];

  const renderAccountContent = () => {
    // Mock user data - in a real app this would come from your backend
    const userData = {
      name: "Kwame O. Nkrumah",
      email: "konkrumah@st.knust.edu.gh",
      studentId: "304567323",
      indexNumber: "22745587",
      programmeStream: "Bsc. Computer Science",
      programmeOption: "General",
      currentYear: "Year 3",
      gender: "Male",
      campus: "KNUST-Kumasi",
      status: "Continuing Ghanaian Student"
    };

    return (
      <div className="p-8">
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-white text-3xl mb-4">
            {userData.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-6 mb-12">
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
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4 underline">{translate('settings.theme')}</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === 'light'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="w-4 h-4 text-blue-700"
                  />
                  <span>{translate('settings.light')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="w-4 h-4 text-blue-700"
                  />
                  <span>{translate('settings.dark')}</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 underline">{translate('settings.language')}</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="language"
                    value="English"
                    checked={currentLanguage === 'English'}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-4 h-4 text-blue-700"
                  />
                  <span>English Language</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="language"
                    value="French"
                    checked={currentLanguage === 'French'}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-4 h-4 text-blue-700"
                  />
                  <span>French</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="language"
                    value="Spanish"
                    checked={currentLanguage === 'Spanish'}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-4 h-4 text-blue-700"
                  />
                  <span>Spanish</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="language"
                    value="Chinese"
                    checked={currentLanguage === 'Chinese'}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-4 h-4 text-blue-700"
                  />
                  <span>Chinese</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="p-8">
            <div className="max-w-3xl mx-auto space-y-10">
              {/* About Us Section */}
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">{translate('settings.aboutUs')}</h2>
                <h3 className="text-xl font-semibold text-blue-600 mb-6">
                  {translate('settings.simplifyingScheduling')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {translate('settings.simplifyingDescription')}
                </p>
              </div>

              {/* Mission Section */}
              <div>
                <h3 className="text-2xl font-bold mb-4">{translate('settings.ourMission')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {translate('settings.missionDescription')}
                </p>
              </div>

              {/* Why Choose Us Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6">{translate('settings.whyChooseUs')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 mb-4">📅</div>
                    <p className="text-gray-600">{translate('settings.easyBooking')}</p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 mb-4">🌐</div>
                    <p className="text-gray-600">{translate('settings.availability')}</p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 mb-4">🔔</div>
                    <p className="text-gray-600">{translate('settings.automatedReminders')}</p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 mb-4">🔒</div>
                    <p className="text-gray-600">{translate('settings.securePrivate')}</p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 mb-4">⚙️</div>
                    <p className="text-gray-600">{translate('settings.customizable')}</p>
                  </div>
                </div>
              </div>

              {/* Our Story Section */}
              <div>
                <h3 className="text-2xl font-bold mb-4">{translate('settings.ourStory')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {translate('settings.storyDescription')}
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex">
            {/* Sidebar Navigation */}
            <div className="w-1/5 border-r pr-8">
              <nav className="space-y-4">
                {tabs.map((tab) => (
                  <div
                    key={tab.name}
                    onClick={() => handleSectionChange(tab.name)}
                    className={`flex items-center cursor-pointer ${
                      activeSection === tab.name ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span className="mr-2">
                      {tab.icon}
                    </span>
                    <span>{translate(`settings.${tab.name}`)}</span>
                  </div>
                ))}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="w-4/5 pl-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
