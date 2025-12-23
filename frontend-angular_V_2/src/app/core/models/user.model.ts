// User Model
export interface User {
  _id: string;
  userName: string;
  email: string;
  gender?: 'male' | 'female' | 'not specified';
  confirmEmail: boolean;
  role: 'User' | 'Admin';
  DOB?: string;
  address?: string;
  Phone?: string;
  Image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// User Response from API
export interface UserResponse {
  id: string;
  userName: string;
  email: string;
  Phone?: string;
  role: string;
}

// Login Credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register Data
export interface RegisterData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  Phone: string;
  role?: string;
  gender?: string;
}
