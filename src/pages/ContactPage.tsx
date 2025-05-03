import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck } from 'react-icons/fa';
import { useLanguage } from '../localization';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">{t('contact.title') as string}</h1>
          <p className="text-xl max-w-3xl">
            {t('contact.subtitle') as string}
          </p>
        </div>
      </div>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('contact.info.title') as string}</h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="bg-primary-light rounded-full p-3 mr-4">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">{t('contact.info.address.label') as string}</h3>
                      {(t('contact.info.address.value') as string[]).map((line, index) => (
                        <p key={index} className="text-gray-600">{line}</p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-primary-light rounded-full p-3 mr-4">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">{t('contact.info.phone.label') as string}</h3>
                      <p className="text-gray-600">{t('contact.info.phone.value') as string}</p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-primary-light rounded-full p-3 mr-4">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">{t('contact.info.email.label') as string}</h3>
                      <p className="text-gray-600">{t('contact.info.email.value') as string}</p>
                    </div>
                  </div>
                  
                  {/* Business Hours */}
                  <div className="flex items-start">
                    <div className="bg-primary-light rounded-full p-3 mr-4">
                      <FaClock className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">{t('contact.info.hours.label') as string}</h3>
                      {(t('contact.info.hours.value') as string[]).map((line, index) => (
                        <p key={index} className="text-gray-600">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('contact.form.title') as string}</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center mb-6">
                    <FaCheck className="mr-2" />
                    <span>{t('contact.form.success') as string}</span>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        {t('contact.form.fields.name.label') as string}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t('contact.form.fields.name.placeholder') as string}
                        required
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        {t('contact.form.fields.email.label') as string}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t('contact.form.fields.email.placeholder') as string}
                        required
                      />
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        {t('contact.form.fields.phone.label') as string}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t('contact.form.fields.phone.placeholder') as string}
                      />
                    </div>
                    
                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        {t('contact.form.fields.subject.label') as string}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">{t('contact.form.fields.subject.options.select') as string}</option>
                        <option value="Notary Services">{t('contact.form.fields.subject.options.notaryServices') as string}</option>
                        <option value="Property Management">{t('contact.form.fields.subject.options.propertyManagement') as string}</option>
                        <option value="Leasing & Renting">{t('contact.form.fields.subject.options.leasingRenting') as string}</option>
                        <option value="Tax Services">{t('contact.form.fields.subject.options.taxServices') as string}</option>
                        <option value="General Inquiry">{t('contact.form.fields.subject.options.generalInquiry') as string}</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      {t('contact.form.fields.message.label') as string}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t('contact.form.fields.message.placeholder') as string}
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.form.sending') as string : t('contact.form.submitButton') as string}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('contact.location.title') as string}</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-96 w-full">
              {/* Google Maps iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7974.415657909589!2d29.7784423954614!3d-2.072745041634696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dcca069bdd9737%3A0x7b43e570103a0bc1!2sNyamabuye!5e0!3m2!1sen!2srw!4v1746224077892!5m2!1sen!2srw" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={t('contact.location.title') as string}
                className="w-full h-full"
              />
            </div>
            <div className="p-6 bg-gray-50">
              <p className="text-gray-600">
                {t('contact.location.description') as string}
              </p>
              <p className="text-gray-600 mt-2">
                {t('contact.location.directions') as string}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 