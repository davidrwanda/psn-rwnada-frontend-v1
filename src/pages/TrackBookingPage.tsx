import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaPhone, FaExclamationTriangle, FaCheckCircle, FaClock, FaCalendarCheck, FaTimes, FaSpinner, FaFile, FaDownload, FaPaperclip } from 'react-icons/fa';
import { trackBookingsByPhone, Booking, UploadedDocument, API_BASE_URL } from '../api/bookings';
import { useLanguage } from '../localization';
import axios from 'axios';

// Define API base URL (same as in bookings.ts)
// const API_BASE_URL = 'http://localhost:8032/api/v1';

interface BookingStatus {
  id: number;
  reference: string;
  tracking_number?: string;
  fullName?: string;
  email?: string;
  phoneNumber: string;
  serviceId: number;
  serviceName?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  notes?: string;
  documents?: UploadedDocument[]; // Updated to match the API response format
}

const TrackBookingPage: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [trackingMethod, setTrackingMethod] = useState<'phone' | 'reference'>('reference');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [bookingFound, setBookingFound] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<BookingStatus[]>([]);
  const [error, setError] = useState('');

  // Parse query params for tracking number
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const trackingParam = queryParams.get('tracking');
    
    if (trackingParam) {
      setSearchValue(trackingParam);
      setTrackingMethod('reference');
      // Auto-submit the search if tracking number is provided
      handleSearch(trackingParam);
    }
  }, [location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleMethodChange = (method: 'phone' | 'reference') => {
    setTrackingMethod(method);
    setSearchValue('');
    setBookingFound(null);
    setBookings([]);
    setError('');
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setError(`Please enter a ${trackingMethod === 'reference' ? 'tracking number' : 'phone number'}`);
      return;
    }

    setError('');
    setIsSearching(true);
    setBookingFound(null);
    
    try {
      if (trackingMethod === 'phone') {
        // Call API to track bookings by phone number
        const phoneBookings = await trackBookingsByPhone(value);
        
        if (phoneBookings && phoneBookings.length > 0) {
          // Transform API response to match our BookingStatus interface
          const formattedBookings = phoneBookings.map(booking => ({
            id: booking.id,
            reference: booking.reference || `PSN-${booking.id}`, // Ensure reference is always a string
            tracking_number: booking.trackingNumber || booking.tracking_number || booking.reference || `PSN-${booking.id}`,
            fullName: booking.fullName,
            email: booking.email,
            phoneNumber: booking.phoneNumber,
            serviceId: booking.serviceId,
            serviceName: booking.serviceName || `Service #${booking.serviceId}`,
            status: booking.status || 'PENDING',
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
            notes: booking.notes,
            documents: booking.documents
          }));
          
          setBookings(formattedBookings);
          setBookingFound(true);
        } else {
          setBookingFound(false);
        }
      } else {
        // Reference/tracking number search
        try {
          // Use the requested API endpoint with the correct path format
          const response = await axios.get(`${API_BASE_URL}/bookings/track/number/${value}`);
          const bookingData = response.data;
          
          if (bookingData) {
            // Transform API response to match our BookingStatus interface
            const formattedBooking: BookingStatus = {
              id: bookingData.id,
              reference: bookingData.reference || `PSN-${bookingData.id}`,
              tracking_number: bookingData.trackingNumber || bookingData.tracking_number || value,
              fullName: bookingData.fullName || bookingData.clientName,
              email: bookingData.email,
              phoneNumber: bookingData.phoneNumber || bookingData.phone,
              serviceId: bookingData.serviceId,
              serviceName: bookingData.serviceName || bookingData.service || `Service #${bookingData.serviceId}`,
              status: bookingData.status || 'PENDING',
              createdAt: bookingData.createdAt || bookingData.createDate,
              updatedAt: bookingData.updatedAt || bookingData.lastUpdated,
              notes: bookingData.notes,
              documents: bookingData.documents
            };
            
            setBookings([formattedBooking]);
            setBookingFound(true);
          } else {
            setBookingFound(false);
          }
        } catch (error) {
          console.error('Error fetching tracking data:', error);
          
          // Fallback to mock data if in development
          if (process.env.NODE_ENV === 'development') {
            // Mock successful reference lookup
            const mockBooking: BookingStatus = {
              id: 12345,
              reference: 'PSN-12345',
              tracking_number: value,
              fullName: 'Client Name',
              phoneNumber: '+250788123456',
              serviceId: 1,
              serviceName: 'Notary Services',
              status: 'IN_PROGRESS',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              notes: 'Processing your request. Our team will contact you shortly.',
              documents: [
                {
                  id: 1,
                  fileName: 'contract.pdf',
                  filePath: '9a7b8c6d-5e4f-3g2h-1i0j-k9l8m7n6o5p4.pdf',
                  fileType: 'application/pdf',
                  fileSize: 1024000
                },
                {
                  id: 2,
                  fileName: 'identity.jpg',
                  filePath: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6.jpg',
                  fileType: 'image/jpeg',
                  fileSize: 250000
                }
              ]
            };
            
            setBookings([mockBooking]);
            setBookingFound(true);
          } else {
            setBookingFound(false);
            setError('Failed to fetch booking information. Please try again later.');
          }
        }
      }
    } catch (err) {
      console.error('Error tracking bookings:', err);
      setError('Failed to track bookings. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSearch(searchValue);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <FaClock className="text-yellow-500" />;
      case 'IN_PROGRESS':
        return <FaCalendarCheck className="text-blue-500" />;
      case 'COMPLETED':
        return <FaCheckCircle className="text-green-500" />;
      case 'CANCELLED':
        return <FaTimes className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return t('track.statuses.pending') as string;
      case 'IN_PROGRESS':
        return t('track.statuses.inProgress') as string;
      case 'COMPLETED':
        return t('track.statuses.completed') as string;
      case 'CANCELLED':
        return t('track.statuses.cancelled') as string;
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file extension from URL
  const getFileExtension = (url: string): string => {
    return url.split('.').pop()?.toLowerCase() || '';
  };

  // Get file type icon based on file type
  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FaFile className="text-red-500 mr-2" />;
    } else if (fileType.includes('doc')) {
      return <FaFile className="text-blue-500 mr-2" />;
    } else if (fileType.includes('image') || fileType.includes('jpg') || fileType.includes('jpeg') || fileType.includes('png')) {
      return <FaFile className="text-green-500 mr-2" />;
    } else {
      return <FaFile className="text-gray-500 mr-2" />;
    }
  };

  // Get the download URL for a document
  const getDocumentUrl = (document: UploadedDocument): string => {
    return `${API_BASE_URL}/bookings/documents/${document.filePath}`;
  };

  // Helper function for pluralization
  const getPluralizedText = (key: string, count: number): string => {
    const translation = t(key) as string;
    const parts = translation.split('|');
    
    if (parts.length === 1) return translation;
    
    if (count === 1 && parts.length > 0) {
      return parts[0].replace('{count}', count.toString());
    } else if (parts.length > 1) {
      return parts[1].replace('{count}', count.toString());
    }
    
    return translation;
  };

  return (
    <>
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">{t('track.title') as string}</h1>
          <p className="text-xl max-w-3xl">
            {t('track.subtitle') as string}
          </p>
        </div>
      </div>

      {/* Tracking Section */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('track.findBooking') as string}</h2>
            
            {/* Tracking Methods */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`pb-3 px-4 mr-4 font-medium ${trackingMethod === 'reference' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleMethodChange('reference')}
              >
                {t('track.byTrackingNumber') as string}
              </button>
              <button
                className={`pb-3 px-4 font-medium ${trackingMethod === 'phone' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleMethodChange('phone')}
              >
                {t('track.byPhoneNumber') as string}
              </button>
            </div>
            
            {/* Search Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="searchValue" className="flex items-center text-gray-700 font-medium mb-2">
                  {trackingMethod === 'reference' ? (
                    <>
                      <FaSearch className="text-primary mr-2" /> {t('track.enterTrackingNumber') as string}
                    </>
                  ) : (
                    <>
                      <FaPhone className="text-primary mr-2" /> {t('track.enterPhoneNumber') as string}
                    </>
                  )}
                </label>
                <div className="flex">
                  <input
                    type={trackingMethod === 'phone' ? 'tel' : 'text'}
                    id="searchValue"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={trackingMethod === 'reference' ? t('track.trackingPlaceholder') as string : t('track.phonePlaceholder') as string}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary rounded-l-none"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <span className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" />
                        {t('track.searching') as string}
                      </span>
                    ) : (
                      t('track.trackButton') as string
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-red-600 text-sm">{error}</p>
                )}
              </div>
            </form>
            
            {/* Tracking Results */}
            {bookingFound === false && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                <FaExclamationTriangle className="mr-2" />
                <span>
                  {trackingMethod === 'reference' 
                    ? t('track.noBookingFoundTracking') as string
                    : t('track.noBookingFoundPhone') as string}
                </span>
              </div>
            )}
            
            {bookingFound === true && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {getPluralizedText('track.bookingsFound', bookings.length)}
                </h3>
                
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Booking Header */}
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="font-medium flex items-center">
                          {t('track.bookingDetails.trackingNumber') as string} <span className="text-primary ml-1">{booking.tracking_number || booking.reference}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">{t('track.bookingDetails.status') as string}</span>
                          <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{getStatusText(booking.status)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Booking Details */}
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {booking.fullName && (
                            <div>
                              <p className="text-gray-600 mb-1">{t('track.bookingDetails.clientName') as string}</p>
                              <p className="font-medium">{booking.fullName}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-600 mb-1">{t('track.bookingDetails.phoneNumber') as string}</p>
                            <p className="font-medium">{booking.phoneNumber}</p>
                          </div>
                          {booking.email && (
                            <div>
                              <p className="text-gray-600 mb-1">{t('track.bookingDetails.email') as string}</p>
                              <p className="font-medium">{booking.email}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-600 mb-1">{t('track.bookingDetails.service') as string}</p>
                            <p className="font-medium">{booking.serviceName || `Service #${booking.serviceId}`}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">{t('track.bookingDetails.createdOn') as string}</p>
                            <p className="font-medium">{formatDate(booking.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">{t('track.bookingDetails.lastUpdated') as string}</p>
                            <p className="font-medium">{formatDate(booking.updatedAt)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">{t('track.bookingDetails.referenceNumber') as string}</p>
                            <p className="font-medium">{booking.reference}</p>
                          </div>
                        </div>
                        
                        {booking.documents && booking.documents.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-gray-600 mb-2 flex items-center font-medium">
                              <FaPaperclip className="mr-2" /> 
                              {getPluralizedText('track.bookingDetails.documentsAttached', booking.documents.length)}
                            </p>
                            <div className="space-y-2">
                              {booking.documents.map((document) => (
                                <a 
                                  key={document.id} 
                                  href={getDocumentUrl(document)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors duration-200"
                                >
                                  {getFileTypeIcon(document.fileType)}
                                  <div className="flex-grow">
                                    <span className="text-sm font-medium">{document.fileName}</span>
                                    <div className="text-xs text-gray-500">{formatFileSize(document.fileSize)}</div>
                                  </div>
                                  <FaDownload className="text-gray-500" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {booking.notes && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-gray-600 mb-1">{t('track.bookingDetails.notes') as string}</p>
                            <p>{booking.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Help Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-2">{t('track.needHelp.title') as string}</h3>
            <p className="text-gray-700 mb-4">
              {t('track.needHelp.description') as string}
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>{t('track.needHelp.call') as string}</li>
              <li>{t('track.needHelp.email') as string}</li>
              <li>{t('track.needHelp.visit') as string}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackBookingPage; 