import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const translations = {
  English: {
    navigation: {
      dashboard: 'Dashboard',
      todo: 'To-do',
      notifications: 'Notifications',
      inbox: 'Inbox',
      settings: 'Settings'
    },
    settings: {
      welcome: 'Welcome to your settings',
      account: 'Account',
      help: 'Help',
      appearance: 'Appearance',
      about: 'About',
      privacyAndPolicy: 'Privacy and Policy',
      termsOfUse: 'Terms of Use',
      // Account Section
      studentId: 'Student ID',
      indexNumber: 'Index Number',
      programmeStream: 'Programme Stream',
      currentYear: 'Current Year',
      programmeOption: 'Programme Option',
      gender: 'Gender',
      status: 'Status',
      campus: 'Campus',
      changeUser: 'Change User',
      logOut: 'Log Out',
      // Help Section
      howCanWeHelp: 'How Can We Help?',
      helpDescription: 'We are here to ensure your experience is smooth and hassle-free. Whether you need help scheduling an appointment, modifying an existing booking, or have general inquiries, our team is ready to assist you.',
      contactUs: 'Contact Us',
      officeLocation: 'Office Location',
      phone: 'Phone',
      fax: 'Fax',
      email: 'Email',
      // Appearance Section
      theme: 'Theme',
      chooseTheme: 'Choose your theme',
      light: 'Light',
      dark: 'Dark',
      language: 'Language',
      chooseLanguage: 'Choose your language',
      // About Section
      aboutUs: 'About Us',
      simplifyingScheduling: 'Simplifying Scheduling, Enhancing Convenience',
      simplifyingDescription: 'At AppointmentPro, we believe booking appointments should be effortless, efficient, and stress-free. Whether you\'re scheduling a consultation, reserving a service, or managing multiple bookings, our platform provides a seamless experience tailored to your needs.',
      ourMission: 'Our Mission',
      missionDescription: 'Our mission is to revolutionize the way appointments are scheduled by providing a fast, reliable, and user-friendly platform. We aim to connect businesses and clients through a system that enhances productivity and saves valuable time.',
      whyChooseUs: 'Why Choose Us?',
      easyBooking: 'Easy Booking Process – Set up and confirm appointments in just a few clicks',
      availability: '24/7 Availability – Schedule and manage bookings anytime, anywhere',
      automatedReminders: 'Automated Reminders – Never miss an appointment with our smart notifications',
      securePrivate: 'Secure & Private – Your data is protected with industry-standard encryption',
      customizable: 'Customizable Scheduling – Tailor your availability and preferences with ease',
      ourStory: 'Our Story',
      storyDescription: 'Founded with a vision to eliminate scheduling frustrations, AppointmentPro was built to bridge the gap between service providers and customers. We understand the challenges of managing time efficiently, and our platform is designed to make scheduling appointments a hassle-free experience for businesses and individuals alike.'
    }
  },
  French: {
    navigation: {
      dashboard: 'Tableau de bord',
      todo: 'À faire',
      notifications: 'Notifications',
      inbox: 'Boîte de réception',
      settings: 'Paramètres'
    },
    settings: {
      welcome: 'Bienvenue dans vos paramètres',
      account: 'Compte',
      help: 'Aide',
      appearance: 'Apparence',
      about: 'À propos',
      privacyAndPolicy: 'Confidentialité et politique',
      termsOfUse: "Conditions d'utilisation",
      // Account Section
      studentId: 'Numéro étudiant',
      indexNumber: 'Numéro d\'index',
      programmeStream: 'Programme d\'études',
      currentYear: 'Année en cours',
      programmeOption: 'Option du programme',
      gender: 'Genre',
      status: 'Statut',
      campus: 'Campus',
      changeUser: 'Changer d\'utilisateur',
      logOut: 'Se déconnecter',
      // Help Section
      howCanWeHelp: 'Comment pouvons-nous vous aider?',
      helpDescription: 'Nous sommes là pour vous assurer une expérience fluide et sans tracas. Que vous ayez besoin d\'aide pour planifier un rendez-vous, modifier une réservation existante ou pour des questions générales, notre équipe est prête à vous aider.',
      contactUs: 'Contactez-nous',
      officeLocation: 'Emplacement du bureau',
      phone: 'Téléphone',
      fax: 'Fax',
      email: 'Email',
      theme: 'Thème',
      chooseTheme: 'Choisissez votre thème',
      light: 'Clair',
      dark: 'Sombre',
      language: 'Langue',
      chooseLanguage: 'Choisissez votre langue',
      aboutUs: 'À propos de nous',
      simplifyingScheduling: 'Simplifier la planification, améliorer la commodité',
      simplifyingDescription: 'Chez AppointmentPro, nous croyons que la prise de rendez-vous doit être sans effort, efficace et sans stress. Que vous planifiiez une consultation, réserviez un service ou gériez plusieurs réservations, notre plateforme offre une expérience fluide adaptée à vos besoins.',
      ourMission: 'Notre Mission',
      missionDescription: 'Notre mission est de révolutionner la façon dont les rendez-vous sont programmés en fournissant une plateforme rapide, fiable et conviviale. Nous visons à connecter les entreprises et les clients grâce à un système qui améliore la productivité et fait gagner un temps précieux.',
      whyChooseUs: 'Pourquoi nous choisir?',
      easyBooking: 'Processus de réservation facile – Configurez et confirmez des rendez-vous en quelques clics',
      availability: 'Disponibilité 24/7 – Planifiez et gérez les réservations à tout moment',
      automatedReminders: 'Rappels automatisés – Ne manquez jamais un rendez-vous avec nos notifications intelligentes',
      securePrivate: 'Sécurisé et privé – Vos données sont protégées avec un cryptage aux normes de l\'industrie',
      customizable: 'Planification personnalisable – Adaptez vos disponibilités et préférences facilement',
      ourStory: 'Notre Histoire',
      storyDescription: 'Fondé avec la vision d\'éliminer les frustrations de planification, AppointmentPro a été créé pour combler le fossé entre les prestataires de services et les clients. Nous comprenons les défis de la gestion efficace du temps, et notre plateforme est conçue pour faire de la prise de rendez-vous une expérience sans tracas pour les entreprises et les particuliers.'
    }
  },
  Spanish: {
    navigation: {
      dashboard: 'Panel de control',
      todo: 'Por hacer',
      notifications: 'Notificaciones',
      inbox: 'Bandeja de entrada',
      settings: 'Configuración'
    },
    settings: {
      welcome: 'Bienvenido a tu configuración',
      account: 'Cuenta',
      help: 'Ayuda',
      appearance: 'Apariencia',
      about: 'Acerca de',
      privacyAndPolicy: 'Privacidad y política',
      termsOfUse: 'Términos de uso',
      // Account Section
      studentId: 'ID de estudiante',
      indexNumber: 'Número de índice',
      programmeStream: 'Programa de estudio',
      currentYear: 'Año actual',
      programmeOption: 'Opción del programa',
      gender: 'Género',
      status: 'Estado',
      campus: 'Campus',
      changeUser: 'Cambiar usuario',
      logOut: 'Cerrar sesión',
      // Help Section
      howCanWeHelp: '¿Cómo podemos ayudar?',
      helpDescription: 'Estamos aquí para asegurarnos de que tu experiencia sea fluida y sin complicaciones. Ya sea que necesites ayuda para programar una cita, modificar una reserva existente o tengas consultas generales, nuestro equipo está listo para ayudarte.',
      contactUs: 'Contáctenos',
      officeLocation: 'Ubicación de la oficina',
      phone: 'Teléfono',
      fax: 'Fax',
      email: 'Correo electrónico',
      theme: 'Tema',
      chooseTheme: 'Elige tu tema',
      light: 'Claro',
      dark: 'Oscuro',
      language: 'Idioma',
      chooseLanguage: 'Elige tu idioma',
      aboutUs: 'Sobre Nosotros',
      simplifyingScheduling: 'Simplificando la programación, mejorando la conveniencia',
      simplifyingDescription: 'En AppointmentPro, creemos que reservar citas debe ser sin esfuerzo, eficiente y sin estrés. Ya sea que esté programando una consulta, reservando un servicio o administrando múltiples reservas, nuestra plataforma proporciona una experiencia perfecta adaptada a sus necesidades.',
      ourMission: 'Nuestra Misión',
      missionDescription: 'Nuestra misión es revolucionar la forma en que se programan las citas proporcionando una plataforma rápida, confiable y fácil de usar. Nuestro objetivo es conectar empresas y clientes a través de un sistema que mejora la productividad y ahorra tiempo valioso.',
      whyChooseUs: '¿Por qué elegirnos?',
      easyBooking: 'Proceso de reserva fácil – Configure y confirme citas con solo unos clics',
      availability: 'Disponibilidad 24/7 – Programe y administre reservas en cualquier momento',
      automatedReminders: 'Recordatorios automatizados – Nunca pierda una cita con nuestras notificaciones inteligentes',
      securePrivate: 'Seguro y privado – Sus datos están protegidos con encriptación de nivel industrial',
      customizable: 'Programación personalizable – Adapte su disponibilidad y preferencias con facilidad',
      ourStory: 'Nuestra Historia',
      storyDescription: 'Fundado con la visión de eliminar las frustraciones de programación, AppointmentPro fue creado para cerrar la brecha entre proveedores de servicios y clientes. Entendemos los desafíos de gestionar el tiempo de manera eficiente, y nuestra plataforma está diseñada para hacer que la programación de citas sea una experiencia sin complicaciones tanto para empresas como para individuos.'
    }
  },
  Chinese: {
    navigation: {
      dashboard: '仪表盘',
      todo: '待办事项',
      notifications: '通知',
      inbox: '收件箱',
      settings: '设置'
    },
    settings: {
      welcome: '欢迎来到您的设置',
      account: '账户',
      help: '帮助',
      appearance: '外观',
      about: '关于',
      privacyAndPolicy: '隐私和政策',
      termsOfUse: '使用条款',
      // Account Section
      studentId: '学生ID',
      indexNumber: '索引号',
      programmeStream: '课程类型',
      currentYear: '当前年级',
      programmeOption: '课程选项',
      gender: '性别',
      status: '状态',
      campus: '校区',
      changeUser: '切换用户',
      logOut: '退出登录',
      // Help Section
      howCanWeHelp: '我们如何帮助您？',
      helpDescription: '我们致力于确保您获得流畅无忧的体验。无论您是需要帮助预约、修改现有预约还是有一般性询问，我们的团队都随时准备为您提供协助。',
      contactUs: '联系我们',
      officeLocation: '办公地点',
      phone: '电话',
      fax: '传真',
      email: '电子邮件',
      theme: '主题',
      chooseTheme: '选择您的主题',
      light: '明亮',
      dark: '暗黑',
      language: '语言',
      chooseLanguage: '选择您的语言',
      aboutUs: '关于我们',
      simplifyingScheduling: '简化预约，提升便利性',
      simplifyingDescription: '在AppointmentPro，我们相信预约应该是轻松、高效和无压力的。无论您是在安排咨询、预订服务还是管理多个预约，我们的平台都能提供适合您需求的无缝体验。',
      ourMission: '我们的使命',
      missionDescription: '我们的使命是通过提供快速、可靠和用户友好的平台来革新预约方式。我们旨在通过提高生产力和节省宝贵时间的系统将企业和客户联系起来。',
      whyChooseUs: '为什么选择我们？',
      easyBooking: '简单的预约流程 – 只需点击几下即可设置和确认预约',
      availability: '24/7全天候可用 – 随时随地安排和管理预约',
      automatedReminders: '自动提醒 – 通过我们的智能通知永不错过预约',
      securePrivate: '安全私密 – 您的数据受到行业标准加密保护',
      customizable: '可定制的日程安排 – 轻松调整您的可用时间和偏好',
      ourStory: '我们的故事',
      storyDescription: 'AppointmentPro创立的愿景是消除预约带来的困扰，旨在架起服务提供者和客户之间的桥梁。我们理解高效管理时间的挑战，我们的平台旨在为企业和个人提供无忧的预约体验。'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'English';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translate = (key) => {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    // Navigate through nested objects
    for (const k of keys) {
      if (!translation || !translation[k]) {
        // If translation not found in current language, fallback to English
        translation = translations.English;
        for (const fallbackKey of keys) {
          if (!translation || !translation[fallbackKey]) {
            return key; // If still not found, return the key itself
          }
          translation = translation[fallbackKey];
        }
        break;
      }
      translation = translation[k];
    }
    
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// Removed useLanguage hook to a separate file;
