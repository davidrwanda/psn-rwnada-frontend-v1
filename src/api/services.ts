import axios from 'axios';

// Define the base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8032/api/v1';

// Define type for Service
export interface Service {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  imageUrl: string;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all services
export const getAllServices = async (): Promise<Service[]> => {
  try {
    const response = await apiClient.get('/services');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Function to get a service by ID
export const getServiceById = async (id: number): Promise<Service | null> => {
  try {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    return null;
  }
};

// Create a named object for export
const serviceApi = {
  getAllServices,
  getServiceById,
};

export default serviceApi; 