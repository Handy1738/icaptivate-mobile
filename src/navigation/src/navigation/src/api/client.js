import axios from 'axios';

const API_URL = 'https://icaptivate.org/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const generateResponses = async (message, perspective, tone) => {
  try {
    const response = await apiClient.post('/generate-response', {
      message, perspective, tone
    });
    return response.data.suggestions;
  } catch (error) {
    console.error('Error generating responses:', error);
    throw new Error('Failed to generate responses');
  }
};
