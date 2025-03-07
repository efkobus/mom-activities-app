import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { login, register, getUserProfile, updateUserProfile, updateSubscription, addChild, updateChild, deleteChild } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Try to get current user from API
        try {
          const userData = await getUserProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          
          // If API fails, try to use stored user data
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
              setIsAuthenticated(true);
              console.log('Using stored user data:', parsedUser);
            } catch (e) {
              console.error('Error parsing stored user:', e);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setIsAuthenticated(false);
            }
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        }
        
        setLoading(false);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register user
  const registerUser = async (userData) => {
    try {
      console.log('AuthContext: registerUser called with', userData);
      setError(null);
      const data = await register(userData);
      console.log('AuthContext: register API response', data);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (err) {
      console.error('AuthContext: register error', err);
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  // Login user
  const loginUser = async (userData) => {
    try {
      setError(null);
      const data = await login(userData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const data = await updateUserProfile(userData);
      
      setUser({
        ...user,
        name: data.user.name,
        email: data.user.email
      });
      
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    }
  };

  // Update subscription
  const updateUserSubscription = async (subscriptionData) => {
    try {
      setError(null);
      const data = await updateSubscription(subscriptionData);
      
      setUser({
        ...user,
        subscription: data.subscription,
        subscriptionExpiry: data.expiryDate
      });
      
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Subscription update failed');
      throw err;
    }
  };

  // Add child profile
  const addChildProfile = async (childData) => {
    try {
      setError(null);
      const data = await addChild(childData);
      
      setUser({
        ...user,
        children: [...(user.children || []), data.child]
      });
      
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add child');
      throw err;
    }
  };

  // Update child profile
  const updateChildProfile = async (childId, childData) => {
    try {
      setError(null);
      const data = await updateChild(childId, childData);
      
      setUser({
        ...user,
        children: user.children.map(child => 
          child._id === childId ? data.child : child
        )
      });
      
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update child');
      throw err;
    }
  };

  // Delete child profile
  const deleteChildProfile = async (childId) => {
    try {
      setError(null);
      await deleteChild(childId);
      
      setUser({
        ...user,
        children: user.children.filter(child => child._id !== childId)
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete child');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register: registerUser,
        login: loginUser,
        logout,
        updateProfile,
        updateSubscription: updateUserSubscription,
        addChild: addChildProfile,
        updateChild: updateChildProfile,
        deleteChild: deleteChildProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};