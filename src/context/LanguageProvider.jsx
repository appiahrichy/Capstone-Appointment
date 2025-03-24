import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { translations } from './translations';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'English';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translate = (key) => {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
      if (!translation || !translation[k]) {
        translation = translations.English;
        for (const fallbackKey of keys) {
          if (!translation || !translation[fallbackKey]) {
            return key;
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
  children: PropTypes.node.isRequired
}; 