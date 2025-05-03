import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheck, FaUser, FaPhone, FaEnvelope, FaClipboardList, FaCommentAlt, FaSpinner, FaInfoCircle, FaFileUpload, FaFile, FaTimesCircle, FaPaperclip, FaTrash, FaUpload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { getAllServices, Service, getServiceById } from '../api/services';
import { createPublicBooking, BookingFormData, uploadDocuments, UploadedDocument, DocumentFile } from '../api/bookings';
import { useLanguage } from '../localization';

// Define the extended service interface to match API data structure
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

// Extended booking form data 
interface ExtendedBookingFormData extends BookingFormData {
  // Track local documents before upload
  localDocuments: DocumentFile[];
  // Track uploaded document IDs from the server
  uploadedDocuments: UploadedDocument[];
}

const BookingPage: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [services, setServices] = useState<ExtendedService[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ExtendedService | null>(null);
  const [loadingSelectedService, setLoadingSelectedService] = useState<boolean>(false);

  const [formData, setFormData] = useState<ExtendedBookingFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    serviceId: 0,
    notes: '',
    localDocuments: [],
    uploadedDocuments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  // Define fetchServiceDetails with useCallback before the useEffect that uses it
  const fetchServiceDetails = useCallback(async (id: number) => {
    if (id <= 0) {
      setSelectedService(null);
      return;
    }
    
    try {
      setLoadingSelectedService(true);
      const serviceData = await getServiceById(id);
      
      if (serviceData) {
        // Convert API response to ExtendedService
        const mappedService: ExtendedService = {
          id: serviceData.id,
          title: serviceData.title,
          description: serviceData.description,
          isActive: (serviceData as any).active || serviceData.isActive,
          imageUrl: serviceData.imageUrl || '',
          bulletPoints: (serviceData as any).bulletPoints || [],
          priceInfo: (serviceData as any).priceInfo || '',
          ctaText: (serviceData as any).ctaText || '',
          additionalInfo: (serviceData as any).additionalInfo,
          turnaroundTime: (serviceData as any).turnaroundTime,
        };
        
        setSelectedService(mappedService);
      } else {
        // If service not found in API, check local services
        const localService = services.find(s => s.id === id);
        setSelectedService(localService || null);
      }
    } catch (err) {
      console.error('Error fetching service details:', err);
      // If error, check local services
      const localService = services.find(s => s.id === id);
      setSelectedService(localService || null);
    } finally {
      setLoadingSelectedService(false);
    }
  }, [services]);

  // Parse query params to get pre-selected service
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get('service');
    
    if (serviceId) {
      const id = parseInt(serviceId, 10);
      setFormData(prev => ({
        ...prev,
        serviceId: id
      }));
      
      // Fetch the specific service details
      fetchServiceDetails(id);
    }
  }, [location.search, fetchServiceDetails]);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Generate a unique ID
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await getAllServices();
        
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
          const mappedServices = (data as any[]).map((service: ApiServiceResponse): ExtendedService => ({
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
          }));
          
          // Only include active services
          const activeServices = mappedServices.filter(service => service.isActive);
          setServices(activeServices);
          
          // If a service is selected, update its details from the fetched data
          if (formData.serviceId > 0) {
            const service = activeServices.find(s => s.id === formData.serviceId);
            if (service) {
              setSelectedService(service);
            }
          }
        } else {
          // If no data is returned, use fallback sample data
          const fallbackServices: ExtendedService[] = [
            {
              id: 1,
              title: "Notary Services",
              description: "Professional notary services for document authentication",
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
              description: "Comprehensive property management services",
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
              description: "Professional leasing and renting services",
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
              description: "Expert tax consultation and services",
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
            },
            {
              id: 5,
              title: "Contract Drafting",
              description: "Professional contract drafting services",
              isActive: true,
              imageUrl: "contract.jpg",
              bulletPoints: [
                "Expert contract drafting",
                "Legal document review",
                "Contract templates",
                "Legal advice on terms"
              ],
              priceInfo: "Starting from RWF 35,000",
              turnaroundTime: "3-5 business days"
            },
            {
              id: 6,
              title: "Legal Consultation",
              description: "Expert legal consultation services",
              isActive: true,
              imageUrl: "legal.jpg",
              bulletPoints: [
                "Legal advice",
                "Case assessment",
                "Legal strategy development",
                "Rights and obligations explanation"
              ],
              priceInfo: "Starting from RWF 40,000",
              turnaroundTime: "1-3 business days"
            }
          ];
          setServices(fallbackServices);
          
          // If a service is selected, update its details from the fallback data
          if (formData.serviceId > 0) {
            const service = fallbackServices.find(s => s.id === formData.serviceId);
            if (service) {
              setSelectedService(service);
            }
          }
        }
      } catch (err) {
        setServicesError('Failed to fetch services. Please try again later.');
        console.error(err);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [formData.serviceId]);

  // Function to validate phone number
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    // Match Rwanda phone numbers (e.g., +250xxxxxxxxx, 07xxxxxxxx, 250xxxxxxxxx)
    const rwandaPhoneRegex = /^(?:(?:\+|00)250|0)?7[2389]\d{7}$/;
    
    // Match international phone numbers (simplified)
    const internationalPhoneRegex = /^(?:\+|00)[1-9]\d{1,14}$/;
    
    return rwandaPhoneRegex.test(phoneNumber) || internationalPhoneRegex.test(phoneNumber);
  };

  // Function to validate email address
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to validate full name
  const validateFullName = (name: string): boolean => {
    // Allow letters, spaces, hyphens, and apostrophes (common in names)
    const nameRegex = /^[A-Za-z\s\-']+$/;
    return nameRegex.test(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'serviceId') {
      const serviceId = parseInt(value, 10);
      setFormData(prevState => ({
        ...prevState,
        [name]: serviceId
      }));
      
      // Update selected service when service changes
      fetchServiceDetails(serviceId);
    } else if (name === 'phoneNumber') {
      // Clear previous phone error when typing
      setPhoneError(null);
      
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (name === 'email') {
      // Clear previous email error when typing
      setEmailError(null);
      
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (name === 'fullName') {
      // Clear previous name error when typing
      setNameError(null);
      
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileError(null);
    setUploadSuccess(false);
    
    if (!files || files.length === 0) return;
    
    // Check if we already have 3 documents (local + uploaded)
    const totalDocs = formData.localDocuments.length + formData.uploadedDocuments.length;
    if (totalDocs >= 3) {
      setFileError('You can only upload up to 3 documents. Please remove a document before adding another.');
      return;
    }
    
    // Check file size - max 10MB per file
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (files[0].size > maxSize) {
      setFileError(`File size exceeds 10MB. Please upload a smaller file.`);
      return;
    }
    
    // Add the new file to the local documents array
    const newDocument: DocumentFile = {
      id: generateId(),
      file: files[0],
      name: files[0].name,
      size: formatFileSize(files[0].size),
      type: files[0].type
    };
    
    setFormData(prevState => ({
      ...prevState,
      localDocuments: [...prevState.localDocuments, newDocument]
    }));
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveLocalDocument = (id: string) => {
    setFormData(prevState => ({
      ...prevState,
      localDocuments: prevState.localDocuments.filter(doc => doc.id !== id)
    }));
    setFileError(null);
    setUploadSuccess(false);
  };

  const handleRemoveUploadedDocument = (id: number) => {
    setFormData(prevState => ({
      ...prevState,
      uploadedDocuments: prevState.uploadedDocuments.filter(doc => doc.id !== id)
    }));
    setFileError(null);
  };

  // Utility to check if uploaded documents are valid
  const validateUploadedDocuments = (docs: UploadedDocument[]): boolean => {
    if (!docs || docs.length === 0) {
      return false;
    }
    
    // Check that each document has the required fields
    return docs.every(doc => 
      doc.id && 
      doc.fileName && 
      doc.filePath && 
      doc.fileType && 
      doc.fileSize > 0
    );
  };

  // Retry upload if there seems to be an issue with the response format
  const retryUploadWithAlternateEndpoint = async () => {
    if (formData.localDocuments.length === 0) {
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a FormData object
      const uploadFormData = new FormData();
      
      // Append each file
      formData.localDocuments.forEach((doc: DocumentFile, index: number) => {
        uploadFormData.append(`files`, doc.file);
      });
      
      // Try a direct fetch request as an alternative to axios
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4040/api/v1'}/documents/upload`, {
        method: 'POST',
        body: uploadFormData
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Alternative upload response:', data);
      
      let documents: UploadedDocument[] = [];
      
      if (Array.isArray(data)) {
        documents = data;
      } else if (data.documents && Array.isArray(data.documents)) {
        documents = data.documents;
      } else if (data.data && Array.isArray(data.data)) {
        documents = data.data;
      }
      
      if (documents.length > 0) {
        setFormData(prevState => ({
          ...prevState,
          uploadedDocuments: [...prevState.uploadedDocuments, ...documents],
          localDocuments: [] // Clear local documents after successful upload
        }));
        
        setUploadSuccess(true);
        setFileError(null);
      } else {
        setFileError('Failed to process uploaded documents. Please try again.');
      }
    } catch (error: any) {
      console.error('Alternative upload failed:', error);
      setFileError(error.message || 'Alternative upload method failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadDocuments = async () => {
    if (formData.localDocuments.length === 0) {
      setFileError('Please select at least one document to upload.');
      return;
    }

    setIsUploading(true);
    setFileError(null);
    setUploadSuccess(false);

    try {
      // Extract File objects from localDocuments
      const files = formData.localDocuments.map(doc => doc.file);
      
      // Upload documents to the server
      const uploadedDocs = await uploadDocuments(files);
      
      // Check if we got any documents back
      if (uploadedDocs && uploadedDocs.length > 0 && validateUploadedDocuments(uploadedDocs)) {
        console.log('Successfully uploaded documents:', uploadedDocs);
        
        // Add uploaded documents to the state
        setFormData(prevState => ({
          ...prevState,
          uploadedDocuments: [...prevState.uploadedDocuments, ...uploadedDocs],
          localDocuments: [] // Clear local documents after successful upload
        }));
        
        setUploadSuccess(true);
      } else {
        // If the server didn't return any document data but didn't throw an error either
        console.warn('No valid documents were returned from the server after upload');
        
        // Try the alternative method
        await retryUploadWithAlternateEndpoint();
      }
    } catch (error: any) {
      console.error('Error uploading documents:', error);
      
      // Check if this is potentially a case where the upload succeeded but the response format was unexpected
      if (error.message && error.message.includes('Failed to parse server response')) {
        await retryUploadWithAlternateEndpoint();
      } else {
        setFileError(error.message || 'Failed to upload documents. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError(null);
    setPhoneError(null);
    setEmailError(null);
    setNameError(null);

    // Check if at least phone number is provided
    if (!formData.phoneNumber) {
      setPhoneError('Phone number is required to process your booking.');
      setIsSubmitting(false);
      return;
    }

    // Validate phone number format
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setPhoneError('Please enter a valid phone number (e.g., +250788123456 or 0788123456).');
      setIsSubmitting(false);
      return;
    }

    // Validate email if provided
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Validate full name if provided
    if (formData.fullName && !validateFullName(formData.fullName)) {
      setNameError('Please enter a valid name without numbers or special characters.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare the booking data payload
      const bookingPayload: BookingFormData = {
        serviceId: formData.serviceId,
        phoneNumber: formData.phoneNumber,
      };
      
      // Add optional fields if they exist
      if (formData.fullName) bookingPayload.fullName = formData.fullName;
      if (formData.email) bookingPayload.email = formData.email;
      if (formData.notes) bookingPayload.notes = formData.notes;
      
      // Add document IDs if any documents were uploaded
      if (formData.uploadedDocuments.length > 0) {
        bookingPayload.documentIds = formData.uploadedDocuments.map(doc => doc.id.toString());
      }

      // Submit booking to API
      const result = await createPublicBooking(bookingPayload);
      
      console.log('Booking API response:', result);

      // Check if we have a successful response
      if (result.booking || result.success) {
        // Get tracking number from the response (handle different formats)
        let trackingNum = '';
        
        if (result.booking && result.booking.trackingNumber) {
          // First priority: Use the trackingNumber from the booking object
          trackingNum = result.booking.trackingNumber;
        } else if (result.trackingNumber) {
          // Second priority: Use trackingNumber from the main response
          trackingNum = result.trackingNumber;
        } else if (result.tracking_number) {
          // Third priority: Use tracking_number from the main response
          trackingNum = result.tracking_number;
        } else if (result.reference) {
          // Fourth priority: Use the reference as a fallback
          trackingNum = result.reference;
        } else {
          // Generate a new tracking number if all are missing
          trackingNum = 'TRK-' + Math.floor(10000 + Math.random() * 90000);
        }
        
        // Ensure the tracking number has a prefix if it's just a number
        if (!isNaN(Number(trackingNum)) && !trackingNum.includes('-')) {
          trackingNum = 'TRK-' + trackingNum;
        }
        
        setBookingReference(trackingNum);
        setIsSubmitted(true);
      } else {
        setBookingError(result.error || 'Failed to create booking. Please try again.');
      }
    } catch (error: any) {
      console.error('Error creating booking:', error);
      setBookingError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">{t('booking.title') as string}</h1>
          <p className="text-xl max-w-3xl">
            {t('booking.subtitle') as string}
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container-custom max-w-5xl">
          {isSubmitted ? (
            <div className="bg-white shadow-md rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck size={32} />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('booking.success.title') as string}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('booking.success.message') as string}
              </p>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-8 inline-block">
                <p className="text-lg font-semibold">{t('booking.success.trackingLabel') as string}</p>
                <p className="text-3xl font-bold text-primary tracking-wider">{bookingReference}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <FaInfoCircle className="inline-block mr-1" />
                  {t('booking.success.trackingNote') as string}
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  {t('booking.success.contactInfo') as string}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                  <Link to={`/track?tracking=${encodeURIComponent(bookingReference)}`} className="btn btn-primary">
                    {t('booking.success.trackButton') as string}
                  </Link>
                  <Link to="/" className="btn btn-outline">
                    {t('booking.success.homeButton') as string}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="md:col-span-2">
                <div className="bg-white shadow-md rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Service Booking Form</h2>
                  
                  {bookingError && (
                    <div className="mb-6 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {bookingError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Service */}
                      <div>
                        <label htmlFor="serviceId" className="flex items-center text-gray-700 font-medium mb-2">
                          <FaClipboardList className="text-primary mr-2" /> Select Service *
                        </label>
                        
                        {loadingServices ? (
                          <div className="flex items-center space-x-2 text-gray-500 py-2">
                            <FaSpinner className="animate-spin" />
                            <span>Loading services...</span>
                          </div>
                        ) : servicesError ? (
                          <div className="text-red-500">{servicesError}</div>
                        ) : (
                          <select
                            id="serviceId"
                            name="serviceId"
                            value={formData.serviceId || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          >
                            <option value="">-- Select a service --</option>
                            {services.map(service => (
                              <option key={service.id} value={service.id}>
                                {service.title}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                      
                      {/* Phone Number - Required */}
                      <div>
                        <label htmlFor="phoneNumber" className="flex items-center text-gray-700 font-medium mb-2">
                          <FaPhone className="text-primary mr-2" /> Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${phoneError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="e.g. +250788123456"
                          required
                        />
                        {phoneError ? (
                          <p className="text-sm text-red-600 mt-1">{phoneError}</p>
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">Required for booking confirmation and updates</p>
                        )}
                      </div>
                      
                      {/* Full Name - Optional */}
                      <div>
                        <label htmlFor="fullName" className="flex items-center text-gray-700 font-medium mb-2">
                          <FaUser className="text-primary mr-2" /> Full Name <span className="text-gray-400 text-sm ml-1">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${nameError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="Enter your full name"
                        />
                        {nameError && (
                          <p className="text-sm text-red-600 mt-1">{nameError}</p>
                        )}
                      </div>
                      
                      {/* Email - Optional */}
                      <div>
                        <label htmlFor="email" className="flex items-center text-gray-700 font-medium mb-2">
                          <FaEnvelope className="text-primary mr-2" /> Email Address <span className="text-gray-400 text-sm ml-1">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="Enter your email address"
                        />
                        {emailError && (
                          <p className="text-sm text-red-600 mt-1">{emailError}</p>
                        )}
                      </div>
                      
                      {/* Document Upload Section */}
                      <div>
                        <label className="flex items-center text-gray-700 font-medium mb-2">
                          <FaFileUpload className="text-primary mr-2" /> Upload Documents <span className="text-gray-400 text-sm ml-1">(Optional, max 3)</span>
                        </label>
                        
                        <div className="mt-1">
                          <input
                            type="file"
                            id="document"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          
                          {/* Step 1: Select files */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={triggerFileInput}
                                disabled={(formData.localDocuments.length + formData.uploadedDocuments.length) >= 3}
                                className={`px-4 py-2 ${(formData.localDocuments.length + formData.uploadedDocuments.length) >= 3 
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} 
                                  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary flex items-center`}
                              >
                                <FaPaperclip className="mr-2" /> 
                                {(formData.localDocuments.length + formData.uploadedDocuments.length) >= 3 
                                  ? 'Max documents reached' 
                                  : 'Select Document'}
                              </button>
                              
                              {formData.localDocuments.length > 0 && (
                                <button
                                  type="button"
                                  onClick={handleUploadDocuments}
                                  disabled={isUploading}
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                                >
                                  {isUploading ? (
                                    <><FaSpinner className="animate-spin mr-2" /> Uploading...</>
                                  ) : (
                                    <><FaUpload className="mr-2" /> Upload Selected Files</>
                                  )}
                                </button>
                              )}
                            </div>
                            
                            {fileError && (
                              <div className="mt-2 text-red-600 text-sm flex flex-col space-y-2">
                                <p className="flex items-center">
                                  <FaExclamationCircle className="mr-1 flex-shrink-0" /> {fileError}
                                </p>
                                {formData.localDocuments.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={retryUploadWithAlternateEndpoint}
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                  >
                                    Try alternative upload method
                                  </button>
                                )}
                              </div>
                            )}
                            
                            {uploadSuccess && (
                              <p className="mt-2 text-green-600 text-sm flex items-center">
                                <FaCheckCircle className="mr-1" /> Documents uploaded successfully!
                              </p>
                            )}
                          </div>
                          
                          {/* Step 2: Display selected files pending upload */}
                          {formData.localDocuments.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-700 font-medium mb-2">Selected Files (Pending Upload):</p>
                              <div className="space-y-2">
                                {formData.localDocuments.map(doc => (
                                  <div 
                                    key={doc.id} 
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200"
                                  >
                                    <div className="flex items-center">
                                      <FaFile className="text-blue-500 mr-2 flex-shrink-0" />
                                      <div>
                                        <p className="font-medium text-sm truncate max-w-xs">{doc.name}</p>
                                        <p className="text-xs text-gray-500">{doc.size}</p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveLocalDocument(doc.id)}
                                      className="text-gray-500 hover:text-red-500 p-1"
                                      title="Remove document"
                                    >
                                      <FaTimesCircle />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Step 3: Display uploaded files */}
                          {formData.uploadedDocuments.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-700 font-medium mb-2">Uploaded Documents:</p>
                              <div className="space-y-2">
                                {formData.uploadedDocuments.map(doc => (
                                  <div 
                                    key={doc.id} 
                                    className="flex items-center justify-between bg-blue-50 p-3 rounded-md border border-blue-200"
                                  >
                                    <div className="flex items-center">
                                      <FaFile className="text-primary mr-2 flex-shrink-0" />
                                      <div>
                                        <p className="font-medium text-sm truncate max-w-xs">{doc.fileName}</p>
                                        <p className="text-xs text-gray-600">{formatFileSize(doc.fileSize)}</p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveUploadedDocument(doc.id)}
                                      className="text-gray-600 hover:text-red-500 p-1"
                                      title="Remove document"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <p className="text-sm text-gray-500 mt-3">
                            Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB per file)
                          </p>
                        </div>
                      </div>
                      
                      {/* Notes */}
                      <div>
                        <label htmlFor="notes" className="flex items-center text-gray-700 font-medium mb-2">
                          <FaCommentAlt className="text-primary mr-2" /> Additional Notes <span className="text-gray-400 text-sm ml-1">(Optional)</span>
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes || ''}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Please provide any additional details about your request"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-full"
                          disabled={isSubmitting || loadingServices || !formData.serviceId || !formData.phoneNumber}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <FaSpinner className="animate-spin mr-2" />
                              Processing...
                            </span>
                          ) : (
                            'Book Service'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Service Details Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  {loadingSelectedService ? (
                    <div className="p-6 flex flex-col items-center justify-center">
                      <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
                      <p className="text-gray-500">Loading service details...</p>
                    </div>
                  ) : selectedService ? (
                    <div>
                      <div className="bg-primary text-white py-4 px-6">
                        <h3 className="text-xl font-bold">{selectedService.title}</h3>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 mb-4">{selectedService.description}</p>
                        
                        {selectedService.bulletPoints && selectedService.bulletPoints.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Service Details:</h4>
                            <ul className="space-y-1">
                              {selectedService.bulletPoints.map((point, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <span className="text-accent mr-2">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {selectedService.priceInfo && (
                          <div className="mb-2">
                            <span className="font-semibold text-gray-700">Pricing: </span>
                            <span className="text-primary">{selectedService.priceInfo}</span>
                          </div>
                        )}
                        
                        {selectedService.turnaroundTime && (
                          <div className="mb-4">
                            <span className="font-semibold text-gray-700">Estimated Time: </span>
                            <span>{selectedService.turnaroundTime}</span>
                          </div>
                        )}
                        
                        {selectedService.additionalInfo && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-md">
                            <div className="flex items-start">
                              <FaInfoCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                              <p className="text-sm text-gray-700">{selectedService.additionalInfo}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-gray-50">
                      <div className="text-center text-gray-500">
                        <FaClipboardList className="mx-auto text-4xl mb-3 text-gray-300" />
                        <h3 className="font-medium mb-2">No Service Selected</h3>
                        <p className="text-sm">Please select a service from the dropdown to see details</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Information Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">What happens next?</h3>
                  <p className="text-gray-700 mb-4">
                    After submitting your booking request:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-sm">
                    <li>You'll receive a booking reference number.</li>
                    <li>Our team will contact you via phone within 24 hours.</li>
                    <li>We'll discuss your specific needs and schedule an appointment if needed.</li>
                    <li>You can track your booking status using your booking reference.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BookingPage; 