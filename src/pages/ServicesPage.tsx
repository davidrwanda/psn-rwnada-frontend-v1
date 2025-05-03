import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaHandshake, FaHome, FaCalculator, FaFileContract, FaBalanceScale, FaBuilding, FaMoneyBillWave, FaSpinner } from 'react-icons/fa';
import { getAllServices, Service } from '../api/services';
import { useLanguage } from '../localization';

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

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ExtendedService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  // Function to get icon based on service title
  const getServiceIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('notary')) return <FaGavel size={40} className="text-primary" />;
    if (titleLower.includes('property') || titleLower.includes('real estate')) return <FaHome size={40} className="text-primary" />;
    if (titleLower.includes('leasing') || titleLower.includes('rent')) return <FaHandshake size={40} className="text-primary" />;
    if (titleLower.includes('tax')) return <FaCalculator size={40} className="text-primary" />;
    if (titleLower.includes('contract')) return <FaFileContract size={40} className="text-primary" />;
    if (titleLower.includes('legal')) return <FaBalanceScale size={40} className="text-primary" />;
    if (titleLower.includes('building')) return <FaBuilding size={40} className="text-primary" />;
    if (titleLower.includes('financial') || titleLower.includes('finance')) return <FaMoneyBillWave size={40} className="text-primary" />;
    return <FaBalanceScale size={40} className="text-primary" />; // Default icon
  };

  // Function to get color based on service id
  const getServiceColor = (id: number) => {
    const colors = [
      'bg-blue-50',
      'bg-green-50',
      'bg-yellow-50',
      'bg-purple-50',
      'bg-red-50',
      'bg-indigo-50',
      'bg-teal-50',
      'bg-orange-50'
    ];
    return colors[(id - 1) % colors.length];
  };
  
  // Generate sample features based on description if no bullet points provided in API
  const generateFeatures = (description: string) => {
    const words = description.split(' ');
    const features = [];
    
    // Extract some phrases from the description
    for (let i = 0; i < Math.min(4, words.length / 3); i++) {
      const startIndex = i * 3 % (words.length - 3);
      features.push(words.slice(startIndex, startIndex + 3).join(' ') + (words[startIndex + 3] || ''));
    }
    
    // If we couldn't generate enough features
    if (features.length < 4) {
      const defaultFeatures = [
        'Professional service',
        'Experienced team',
        'Tailored solutions',
        'Fast turnaround'
      ];
      return [...features, ...defaultFeatures.slice(features.length)];
    }
    
    return features;
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getAllServices();
        
        console.log("API services raw data:", data); // Debug log
        
        if (data && data.length > 0) {
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
            return mappedService;
          });
          
          console.log("Mapped services:", mappedServices); // Debug log
          
          // Filter active services only
          const activeServices = mappedServices.filter(service => service.isActive);
          setServices(activeServices);
        } else {
          setError(t('services.error.fallback') as string);
          // If no data is returned, use fallback sample data
          const fallbackServices: ExtendedService[] = [
            {
              id: 1,
              title: "Notary Services",
              description: "Professional notary services for document authentication, verification, and legal certification.",
              isActive: true,
              imageUrl: "notary.jpg",
              bulletPoints: [
                "Document authentication and certification",
                "Contract notarization",
                "Affidavit preparation",
                "Fast turnaround"
              ],
              priceInfo: "Starting from RWF 25,000",
              turnaroundTime: "24-48 hours"
            },
            {
              id: 2,
              title: "Property Management",
              description: "Comprehensive property management services for residential and commercial properties in Rwanda.",
              isActive: true,
              imageUrl: "property.jpg",
              bulletPoints: [
                "Tenant screening and placement",
                "Rent collection and accounting",
                "Property maintenance",
                "Regular property inspections"
              ],
              priceInfo: "Starting from RWF 50,000/month",
              turnaroundTime: "Ongoing service"
            },
            {
              id: 3,
              title: "Leasing & Renting",
              description: "Professional leasing and renting services to help property owners maximize their investment value.",
              isActive: true,
              imageUrl: "leasing.jpg",
              bulletPoints: [
                "Market analysis and property valuation",
                "Leasing agreement preparation",
                "Tenant screening",
                "Property marketing"
              ],
              priceInfo: "Starting from RWF 35,000",
              turnaroundTime: "1-4 weeks"
            },
            {
              id: 4,
              title: "Tax Services",
              description: "Expert tax consultation and services for individuals and businesses to ensure compliance and optimization.",
              isActive: true,
              imageUrl: "tax.jpg",
              bulletPoints: [
                "Tax planning and consultation",
                "Tax return preparation",
                "Tax compliance review",
                "Representation before tax authorities"
              ],
              priceInfo: "Starting from RWF 45,000",
              turnaroundTime: "3-10 business days"
            }
          ];
          setServices(fallbackServices);
        }
      } catch (err) {
        setError(t('services.error.fetch') as string);
        console.error(err);
        
        // Use hardcoded services as fallback
        const fallbackServices: ExtendedService[] = [
          {
            id: 1,
            title: "Notary Services",
            description: "Professional notary services for document authentication, verification, and legal certification.",
            isActive: true,
            imageUrl: "notary.jpg",
            bulletPoints: [
              "Document authentication and certification",
              "Contract notarization",
              "Affidavit preparation",
              "Fast turnaround"
            ],
            priceInfo: "Starting from RWF 25,000",
            turnaroundTime: "24-48 hours"
          },
          {
            id: 2,
            title: "Property Management",
            description: "Comprehensive property management services for residential and commercial properties in Rwanda.",
            isActive: true,
            imageUrl: "property.jpg",
            bulletPoints: [
              "Tenant screening and placement",
              "Rent collection and accounting",
              "Property maintenance",
              "Regular property inspections"
            ],
            priceInfo: "Starting from RWF 50,000/month",
            turnaroundTime: "Ongoing service"
          }
        ];
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [t]);

  return (
    <>
      {/* Header Section */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">{t('services.title') as string}</h1>
          <p className="text-xl max-w-3xl">
            {t('services.subtitle') as string}
          </p>
        </div>
      </div>

      {/* Services List */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
              <p className="text-lg text-gray-600">{t('services.loading') as string}</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`${getServiceColor(service.id)} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="p-6">
                    <div className="mb-4">
                      {getServiceIcon(service.title)}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    
                    {/* Display bullet points if available, otherwise generate them */}
                    <ul className="space-y-2 mb-4">
                      {service.bulletPoints && service.bulletPoints.length > 0 ? (
                        service.bulletPoints.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-accent mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))
                      ) : (
                        generateFeatures(service.description).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-accent mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))
                      )}
                    </ul>
                    
                    {/* Display price information if available */}
                    {service.priceInfo && (
                      <p className="text-sm text-gray-600 italic mb-4">{service.priceInfo}</p>
                    )}
                    
                    {/* Display turnaround time if available */}
                    {service.turnaroundTime && (
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">{t('services.turnaroundTime') as string}:</span> {service.turnaroundTime}
                      </p>
                    )}
                    
                    <Link
                      to={`/book?service=${service.id}`}
                      className="btn btn-primary w-full text-center"
                    >
                      {service.ctaText || t('services.bookNow') as string}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">{t('services.cta.title') as string}</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            {t('services.cta.description') as string}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact" className="btn btn-primary">
              {t('services.cta.contactButton') as string}
            </Link>
            <Link to="/book" className="btn btn-outline">
              {t('services.cta.bookConsultation') as string}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage; 