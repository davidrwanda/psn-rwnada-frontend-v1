import axios from 'axios';

// Define API base URL (use environment variable in production)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8032/api/v1';

// Interface for document files being uploaded
export interface DocumentFile {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
}

// Interface for documents after upload to server
export interface UploadedDocument {
  id: number;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
}

// Interface for booking data
export interface BookingFormData {
  fullName?: string;
  email?: string;
  phoneNumber: string;
  serviceId: number;
  notes?: string;
  documentIds?: string[]; // Array of document IDs
}

// Interface for booking
export interface Booking {
  id: number;
  reference?: string;
  tracking_number?: string;
  trackingNumber?: string; // Updated to match API response
  fullName?: string;
  email?: string;
  phoneNumber: string;
  serviceId: number;
  serviceName?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  notes?: string;
  documentUrls?: string[];
  documents?: UploadedDocument[];
}

// Interface for API response
export interface BookingResponse {
  success?: boolean;
  error?: string;
  message?: string;
  reference?: string;
  tracking_number?: string;
  trackingNumber?: string; // Added to match API response
  booking?: {
    id: number;
    trackingNumber: string;
    phoneNumber: string;
    serviceId: number;
    serviceName: string;
    email: string | null;
    fullName: string | null;
    notes: string | null;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    userId: number | null;
    createdAt: string;
    updatedAt: string;
    documents: UploadedDocument[];
  };
}

/**
 * Create a new public booking
 */
export const createPublicBooking = async (bookingData: BookingFormData): Promise<BookingResponse> => {
  try {
    // Check if we have documents to upload
    if (bookingData.documentIds && bookingData.documentIds.length > 0) {
      // If we have documents, we need to create a FormData object
      const formData = new FormData();
      
      // Add booking data to FormData
      formData.append('serviceId', bookingData.serviceId.toString());
      formData.append('phoneNumber', bookingData.phoneNumber);
      
      if (bookingData.fullName) {
        formData.append('fullName', bookingData.fullName);
      }
      
      if (bookingData.email) {
        formData.append('email', bookingData.email);
      }
      
      if (bookingData.notes) {
        formData.append('notes', bookingData.notes);
      }
      
      // Add document IDs 
      bookingData.documentIds.forEach((docId, index) => {
        formData.append(`documentIds[${index}]`, docId);
      });
      
      // Send request with FormData
      const response = await axios.post(`${API_BASE_URL}/bookings/publics`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } else {
      // If no documents, send a regular JSON request
      const response = await axios.post(`${API_BASE_URL}/bookings/public`, bookingData);
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        success: false,
        error: error.response.data.message || 'Failed to create booking'
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        error: 'No response from server. Please check your connection and try again.'
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        error: error.message || 'An unexpected error occurred'
      };
    }
  }
};

/**
 * Upload documents to the server
 */
export const uploadDocuments = async (files: File[]): Promise<UploadedDocument[]> => {
  try {
    const formData = new FormData();
    
    // Append each file to the form data
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    
    // Try the new endpoint first
    const endpoint = `${API_BASE_URL}/bookings/documents/upload`;
    console.log(`Attempting to upload documents to: ${endpoint}`);
    
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Log the response for debugging
    console.log('Document upload response:', response.data);
    
    // Handle different response formats
    if (response.data) {
      // Case 1: If response has success flag and documents array
      if (response.data.success && Array.isArray(response.data.documents)) {
        return response.data.documents;
      }
      
      // Case 2: If response is directly an array of documents
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // Case 3: If response has a data property that is an array
      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      // Case 4: If the server returns a single document, wrap it in an array
      if (response.data.id && response.data.fileName) {
        return [response.data];
      }
      
      // If we couldn't identify the format but have a successful response,
      // display a warning but don't fail
      console.warn('Unexpected document upload response format:', response.data);
      
      // If the response doesn't match any expected format but seems successful, 
      // return an empty array rather than throwing an error
      if (response.status >= 200 && response.status < 300) {
        return [];
      }
    }
    
    // If we get here, we couldn't parse the response
    throw new Error('Failed to parse server response for document upload');
  } catch (error: any) {
    console.error('Document upload error:', error);
    
    if (error.response) {
      // If we have data in the error response, check if it's actually a successful response
      // with documents (this happens in some API implementations)
      if (error.response.data) {
        if (Array.isArray(error.response.data)) {
          console.log('Found documents in error response', error.response.data);
          return error.response.data;
        }
        if (error.response.data.documents && Array.isArray(error.response.data.documents)) {
          console.log('Found documents in error response', error.response.data.documents);
          return error.response.data.documents;
        }
      }
      
      throw new Error(error.response.data.message || 'Failed to upload documents');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection and try again.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Track bookings by phone number
 */
export const trackBookingsByPhone = async (phoneNumber: string): Promise<Booking[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/public/track-by-phone/${phoneNumber}`);
    
    if (response.data.success && response.data.bookings) {
      return response.data.bookings;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error tracking bookings by phone:', error);
    return [];
  }
};

// Create a named object for export
const bookingApi = {
  createPublicBooking,
  trackBookingsByPhone,
  uploadDocuments
};

export default bookingApi; 