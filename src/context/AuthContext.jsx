import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LARAVEL_BACKEND_URL = "http://192.168.23.113"; // Ensure this is your correct backend URL

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Try to load token and user from storage on app start
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUserString = await AsyncStorage.getItem('userData');
        if (storedToken && storedUserString) {
          setToken(storedToken);
          setUser(JSON.parse(storedUserString));
        }
      } catch (e) {
        console.error("AuthContext: Failed to load data from storage", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadStoredData();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post(`${LARAVEL_BACKEND_URL}/api/login`, {
        email,
        password,
      });
      const { user: userData, token: userToken } = response.data;
      setUser(userData);
      setToken(userToken);
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setIsLoading(false);
      return userData; // Return user data for navigation or other actions
    } catch (e) {
      console.error("AuthContext: Login error", e.response ? e.response.data : e.message);
      const errorMessage = e.response?.data?.message || "Login failed. Please check credentials.";
      setAuthError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      // Optionally, call a backend logout endpoint if you have one
      // await axios.post(`${LARAVEL_BACKEND_URL}/api/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (e) {
      console.error("AuthContext: Logout error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        authError,
        login,
        logout,
        setUser, // Expose setUser if manual updates are needed elsewhere (use with caution)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};