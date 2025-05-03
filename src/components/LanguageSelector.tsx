import React from 'react';
import { useLanguage } from '../localization';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'fr');
  };

  return (
    <div className={`language-selector ${className}`}>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSelector; 