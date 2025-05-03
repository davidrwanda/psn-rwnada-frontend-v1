import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../../localization';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.company') as string}</h3>
            <p className="mb-4">
              {t('footer.description') as string}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks') as string}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">{t('nav.home') as string}</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent transition-colors">{t('footer.servicesTitle') as string}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">{t('nav.about') as string}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">{t('nav.contact') as string}</Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-accent transition-colors">{t('nav.bookings') as string}</Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-accent transition-colors">{t('nav.track') as string}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contactUs') as string}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt size={18} className="mt-1 text-accent" />
                <span>{t('contact.info.address.value.0') as string}, {t('contact.info.address.value.1') as string}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone size={18} className="text-accent" />
                <span>{t('contact.info.phone.value') as string}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope size={18} className="text-accent" />
                <a href="mailto:info@psnrwanda.com" className="hover:text-accent transition-colors">
                  {t('contact.info.email.value') as string}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} {t('footer.copyright') as string}</p>
          <p className="mt-2 text-sm">
            <span>{t('footer.registrationNo') as string}: 121058604</span>
            <span className="mx-2">|</span>
            <span>{t('footer.incorporated') as string}: {t('about.companyDetails.incorporationDate') as string}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 