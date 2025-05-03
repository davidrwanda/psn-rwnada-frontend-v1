import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../localization';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container-custom py-20 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">{t('notFound.title') as string}</h2>
        <p className="text-lg text-gray-600 mb-8">
          {t('notFound.message') as string}
        </p>
        <Link to="/" className="btn btn-primary">
          {t('notFound.backButton') as string}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 