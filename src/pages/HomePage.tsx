import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaHandshake, FaHome, FaCalculator, FaArrowRight, FaFileContract, FaBalanceScale, FaSpinner, FaChartLine, FaSearch } from 'react-icons/fa';
import { getAllServices, Service } from '../api/services';
import { useLanguage } from '../localization';

// Import an image for the hero section
import heroImage from '../assets/images/cytonn-photography-GJao3ZTX9gU-unsplash.jpg';

// Define the extended service interface to match actual API data structure
interface ExtendedService extends Service {
  bulletPoints?: string[];
  additionalInfo?: string;
  priceInfo?: string;
  turnaroundTime?: string;
  ctaText?: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean; // For backward compatibility with API response
}

const HomePage: React.FC = () => {
  const [featuredServices, setFeaturedServices] = useState<ExtendedService[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const { t } = useLanguage();

  // Function to get icon based on service title
  const getServiceIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('notary')) return <FaGavel className="h-10 w-10 text-primary" />;
    if (titleLower.includes('property') || titleLower.includes('real estate')) return <FaHome className="h-10 w-10 text-primary" />;
    if (titleLower.includes('leasing') || titleLower.includes('rent')) return <FaHandshake className="h-10 w-10 text-primary" />;
    if (titleLower.includes('tax') || titleLower.includes('accounting')) return <FaCalculator className="h-10 w-10 text-primary" />;
    if (titleLower.includes('contract')) return <FaFileContract className="h-10 w-10 text-primary" />;
    if (titleLower.includes('legal') || titleLower.includes('consultancy')) return <FaBalanceScale className="h-10 w-10 text-primary" />;
    return <FaChartLine className="h-10 w-10 text-primary" />; // Default icon
  };

  // Function to get color based on service id
  const getServiceColor = (id: number) => {
    const colors = [
      'bg-blue-50',
      'bg-green-50',
      'bg-yellow-50',
      'bg-purple-50',
      'bg-red-50',
      'bg-indigo-50'
    ];
    return colors[(id - 1) % colors.length];
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await getAllServices();
        
        if (data && data.length > 0) {
          console.log("API services raw data:", data); // Debug log
          console.log("First service details:", data[0]); // Log first service to inspect structure
          
          // The actual API response format
          interface ApiServiceResponse {
            id: number;
            title: string;
            description: string;
            active: boolean;
            imageUrl: string;
            bulletPoints?: string[];
            additionalInfo?: string;
            priceInfo?: string;
            turnaroundTime?: string;
            ctaText?: string;
            createdAt?: string;
            updatedAt?: string;
          }
          
          // Map API response to our format
          const mappedServices = (data as any[]).map((service: ApiServiceResponse): ExtendedService => {
            const mappedService = {
              id: service.id,
              title: service.title,
              description: service.description,
              isActive: service.active, // Convert 'active' from API to 'isActive' for our app
              imageUrl: service.imageUrl || '',
              bulletPoints: service.bulletPoints || [],
              priceInfo: service.priceInfo || '',
              ctaText: service.ctaText || '',
              additionalInfo: service.additionalInfo,
              turnaroundTime: service.turnaroundTime,
              active: service.active // Keep original 'active' for reference
            };
            console.log(`Mapping service ${service.id} - ${service.title} with bulletPoints:`, service.bulletPoints);
            return mappedService;
          });
          
          console.log("Mapped services:", mappedServices); // Debug log
          
          // Only include active services and limit to 3 featured services
          const activeServices = mappedServices
            .filter(service => service.isActive)
            .slice(0, 3);
          
          console.log("Active services to display:", activeServices); // Debug log
          
          setFeaturedServices(activeServices);
        } else {
          // If no data is returned, use fallback sample data
          const fallbackServices: ExtendedService[] = [
            {
              id: 6,
              title: "Notary Services",
              description: "Professional notary services for document authentication and legal validation",
              isActive: true,
              imageUrl: "notary.jpg",
              bulletPoints: [
                "Professional notary services for",
                "for document authentication and",
                "Professional notary services for",
                "Fast turnaround"
              ],
              priceInfo: "Starting from RWF 25,000",
              turnaroundTime: "24-48 hours"
            },
            {
              id: 7,
              title: "Contract Drafting and Review",
              description: "Professional contract drafting and comprehensive legal document review services",
              isActive: true,
              imageUrl: "contract.jpg",
              bulletPoints: [
                "Expert contract drafting services",
                "Comprehensive legal document review"
              ],
              priceInfo: "Starting from RWF 35,000",
              turnaroundTime: "3-5 business days"
            },
            {
              id: 8,
              title: "Legal Consultancy",
              description: "Expert legal consultation services for individuals and businesses",
              isActive: true,
              imageUrl: "legal.jpg",
              bulletPoints: [
                "Expert legal advice",
                "Business law consultation",
                "Tailored legal solutions"
              ],
              priceInfo: "Starting from RWF 40,000"
            }
          ];
          setFeaturedServices(fallbackServices);
        }
      } catch (err) {
        setServicesError('Failed to fetch services.');
        console.error(err);
        
        // Use hardcoded services as fallback
        const fallbackServices: ExtendedService[] = [
          {
            id: 6,
            title: "Notary Services",
            description: "Professional notary services for document authentication and legal validation",
            isActive: true,
            imageUrl: "notary.jpg",
            priceInfo: "Starting from RWF 25,000"
          },
          {
            id: 7,
            title: "Contract Drafting and Review",
            description: "Professional contract drafting and comprehensive legal document review services",
            isActive: true,
            imageUrl: "contract.jpg",
            priceInfo: "Starting from RWF 35,000"
          },
          {
            id: 8,
            title: "Legal Consultancy",
            description: "Expert legal consultation services for individuals and businesses",
            isActive: true,
            imageUrl: "legal.jpg",
            priceInfo: "Starting from RWF 40,000"
          }
        ];
        setFeaturedServices(fallbackServices);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('home.hero.title') as string}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                {t('home.hero.subtitle') as string}
              </p>
              <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/book" className="btn bg-accent hover:bg-accent-dark text-white px-6 py-3">
                  {t('home.hero.cta') as string}
                </Link>
                <Link to="/services" className="btn bg-white text-primary hover:bg-gray-100 px-6 py-3">
                  {t('services.allServices') as string}
                </Link>
                <Link to="/track" className="btn bg-white text-primary hover:bg-gray-100 px-6 py-3 flex items-center">
                  <FaSearch className="mr-2" /> {t('nav.track') as string}
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Use the imported image */}
              <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3">
                <img 
                  src={heroImage} 
                  alt="PSN Rwanda Services" 
                  className="rounded w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.whyChooseUs.title') as string}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.whyChooseUs.subtitle') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.whyChooseUs.experience.title') as string}</h3>
              <p className="text-gray-600">
                {t('home.whyChooseUs.experience.description') as string}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.whyChooseUs.expertise.title') as string}</h3>
              <p className="text-gray-600">
                {t('home.whyChooseUs.expertise.description') as string}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.whyChooseUs.clientFocus.title') as string}</h3>
              <p className="text-gray-600">
                {t('home.whyChooseUs.clientFocus.description') as string}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.featuredServices.title') as string}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle') as string}
            </p>
          </div>

          {loadingServices ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
              <p className="text-lg text-gray-600">Loading services...</p>
            </div>
          ) : servicesError ? (
            <div className="text-center text-gray-600">
              <p>{servicesError}</p>
              <p>Please check our <Link to="/services" className="text-primary hover:underline">{t('services.title') as string}</Link> for more information.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <div 
                  key={service.id} 
                  className={`${getServiceColor(service.id)} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="mb-4">
                    {getServiceIcon(service.title)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  
                  {service.bulletPoints && service.bulletPoints.length > 0 && (
                    <ul className="mb-4 space-y-1">
                      {service.bulletPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {service.priceInfo && (
                    <p className="text-sm text-gray-500 mb-4">{service.priceInfo}</p>
                  )}
                  
                  <Link 
                    to={`/book?service=${service.id}`} 
                    className="inline-flex items-center text-primary hover:text-primary-dark"
                  >
                    {service.ctaText || t('home.featuredServices.learnMore') as string} <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link 
              to="/services" 
              className="btn btn-primary"
            >
              {t('home.featuredServices.viewAll') as string}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="bg-accent py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('home.quickBooking.title') as string}</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t('home.quickBooking.subtitle') as string}
                </p>
                <div className="flex flex-row flex-wrap gap-4">
                  <Link to="/book" className="btn btn-primary px-6 py-3">
                    {t('home.quickBooking.cta') as string}
                  </Link>
                  <Link to="/track" className="btn btn-secondary px-6 py-3 flex items-center">
                    <FaSearch className="mr-2" /> {t('nav.track') as string}
                  </Link>
                  <a href="tel:+250788859612" className="btn btn-outline px-6 py-3">
                    {t('contact.form.fields.phone.label') as string}
                  </a>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="inline-block bg-gray-100 rounded-lg p-6">
                  <div className="text-xl font-semibold mb-2">{t('contact.title') as string}</div>
                  <div className="text-gray-700">{t('contact.info.phone.value') as string}</div>
                  <div className="text-gray-700">{t('contact.info.email.value') as string}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage; 