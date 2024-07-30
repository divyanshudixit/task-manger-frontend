import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; 

interface LoginResponse {
  user: {
    id: string;
    email: string;
    [key: string]: any;
  };
  token: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`https://task-manager-backend-1-ysvg.onrender.com/api/auth/login`, { username, password });
    console.log("response",response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed');
    } else {
      throw new Error('Login failed');
    }
  }
};


export const register = async (username: string, password: string, firstName: string, lastName: string) => {
  try {
    const response = await axios.post(`https://task-manager-backend-1-ysvg.onrender.com/api/auth/register`, { username, password, firstName, lastName });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Registration failed');
    }
    throw new Error('An unexpected error occurred');
  }
};
