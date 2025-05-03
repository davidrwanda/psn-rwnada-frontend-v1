import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaChartLine } from 'react-icons/fa';
import { useLanguage } from '../localization';

// Import an image for the company section
import companyImage from '../assets/images/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  
  const companyMilestones = [
    {
      year: 2023,
      title: t('about.journey.milestones.incorporation.title') as string,
      description: t('about.journey.milestones.incorporation.description') as string
    },
    {
      year: 2023,
      title: t('about.journey.milestones.office.title') as string,
      description: t('about.journey.milestones.office.description') as string
    },
    {
      year: 2023,
      title: t('about.journey.milestones.launch.title') as string,
      description: t('about.journey.milestones.launch.description') as string
    }
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">{t('about.title') as string}</h1>
          <p className="text-xl max-w-3xl">
            {t('about.subtitle') as string}
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Company Image */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={companyImage} 
                alt={t('about.images.office') as string} 
                className="w-full h-auto"
              />
            </div>
            
            {/* Company Description */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{t('about.story.title') as string}</h2>
              <p className="text-lg text-gray-600 mb-4">
                {t('about.story.paragraph1') as string}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.story.paragraph2') as string}
              </p>
              
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">{t('about.companyDetails.title') as string}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">{t('about.companyDetails.registrationNo') as string}:</p>
                    <p>121058604</p>
                  </div>
                  <div>
                    <p className="font-semibold">{t('about.companyDetails.incorporatedOn') as string}:</p>
                    <p>{t('about.companyDetails.incorporationDate') as string}</p>
                  </div>
                  <div>
                    <p className="font-semibold">{t('about.companyDetails.location') as string}:</p>
                    <p>{t('about.companyDetails.address') as string}</p>
                  </div>
                  <div>
                    <p className="font-semibold">{t('about.companyDetails.country') as string}:</p>
                    <p>{t('about.companyDetails.countryName') as string}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaChartLine className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">{t('about.mission.title') as string}</h2>
              </div>
              <p className="text-gray-600 text-lg">
                {t('about.mission.description') as string}
              </p>
            </div>
            
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaUserTie className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">{t('about.vision.title') as string}</h2>
              </div>
              <p className="text-gray-600 text-lg">
                {t('about.vision.description') as string}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('about.journey.title') as string}</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {companyMilestones.map((milestone, index) => (
                <div key={index} className={`relative ${index % 2 === 0 ? 'md:ml-auto md:pl-12 md:pr-0' : 'md:mr-auto md:pr-12 md:pl-0'} md:w-1/2 p-6`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent border-4 border-white rounded-full h-6 w-6 z-10 top-8 md:top-1/2"></div>
                  
                  {/* Content */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="inline-block bg-primary text-white px-3 py-1 rounded mb-3">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">{t('about.cta.title') as string}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('about.cta.description') as string}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact" className="btn bg-white text-accent hover:bg-gray-100">
              {t('about.cta.contactButton') as string}
            </Link>
            <Link to="/services" className="btn bg-primary hover:bg-primary-dark">
              {t('about.cta.servicesButton') as string}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage; 