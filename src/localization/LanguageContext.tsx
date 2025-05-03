import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { en, fr } from './languages';

// Define the language type as 'en' or 'fr'
type Language = 'en' | 'fr';

// Create an interface for the language context
interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | Record<string, any>;
  translations: Record<string, any>;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  translations: en,
});

interface LanguageProviderProps {
  children: ReactNode;
}

// Create the Language Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage ? savedLanguage : 'en';
  });

  // Get the appropriate translations based on the language
  const [translations, setTranslations] = useState(language === 'en' ? en : fr);

  // Update translations when language changes
  useEffect(() => {
    setTranslations(language === 'en' ? en : fr);
    // Save to localStorage
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Function to get a translation by nested key (e.g., 'nav.home')
  const t = (key: string): string | Record<string, any> => {
    const keys = key.split('.');
    let result: any = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation not found
      }
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext; 