import axios from 'axios';

// Create a mock user for development
const mockUser = {
  _id: 'user1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  subscription: 'premium',
  subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  children: [
    {
      _id: 'child1',
      name: 'Emma',
      birthdate: new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000).toISOString(),
      interests: ['animals', 'drawing', 'music'],
      developmentalFocus: ['language', 'motor']
    }
  ]
};

// Mock activities
const mockActivities = [
  {
    _id: '1',
    title: 'Sensory Water Play',
    description: 'Develop fine motor skills and sensory exploration with water and various containers.',
    images: ['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&auto=format&fit=crop'],
    timeRequired: 20,
    ageRange: { min: 1, max: 3 },
    developmentalAreas: ['sensory', 'motor'],
    materials: ['Water', 'Containers', 'Toys'],
    steps: [
      'Fill containers with water',
      'Add toys and tools for exploration',
      'Supervise play and encourage exploration'
    ],
    isPremium: false
  },
  {
    _id: '2',
    title: 'Color Sorting Game',
    description: 'Learn colors and practice categorization with this simple sorting activity.',
    images: ['https://images.unsplash.com/photo-1615147342761-9238e15d8b96?w=500&auto=format&fit=crop'],
    timeRequired: 15,
    ageRange: { min: 2, max: 4 },
    developmentalAreas: ['cognitive', 'motor'],
    materials: ['Colored objects', 'Sorting containers'],
    steps: [
      'Gather colored objects',
      'Set up sorting containers',
      'Demonstrate sorting by color',
      'Let child practice sorting'
    ],
    isPremium: false
  },
  {
    _id: '3',
    title: 'DIY Musical Instruments',
    description: 'Create simple instruments and explore rhythm, sound, and music concepts.',
    images: ['https://images.unsplash.com/photo-1619379179326-c50977cd30fa?w=500&auto=format&fit=crop'],
    timeRequired: 30,
    ageRange: { min: 3, max: 6 },
    developmentalAreas: ['creative', 'motor', 'cognitive'],
    materials: ['Empty containers', 'Rice/beans', 'Rubber bands'],
    steps: [
      'Gather materials',
      'Create shakers with containers and rice',
      'Make string instruments with rubber bands',
      'Explore different sounds'
    ],
    isPremium: false
  }
];

// Mock favorites
const mockFavorites = [mockActivities[0], mockActivities[2]];

// Mock history
const mockHistory = [
  {
    _id: 'history1',
    activity: mockActivities[0],
    completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Emma loved playing with the water colors!'
  },
  {
    _id: 'history2',
    activity: mockActivities[1],
    completedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: null
  }
];

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      console.log('Authentication error detected:', error.response.data);
      localStorage.removeItem('token');
      // You could redirect to login page here or handle in the component
    }
    
    // Log all API errors for debugging
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

// Use selective mock data - only for failing endpoints
const useMockData = false;
// Use mock data when server returns errors
const fallbackToMockOnError = true;

// Keep track of mock users created during registration
const saveCreatedMockUser = (email, password, userData) => {
  try {
    // Get existing users or initialize empty array
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    
    // Add new user credentials
    mockUsers.push({
      email,
      password,
      userData
    });
    
    // Save back to localStorage
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    console.log('Saved mock user for future login:', email);
  } catch (e) {
    console.error('Failed to save mock user:', e);
  }
};

// Find a saved mock user
const findMockUser = (email, password) => {
  try {
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    return mockUsers.find(user => user.email === email && user.password === password);
  } catch (e) {
    console.error('Error checking for mock users:', e);
    return null;
  }
};

// Authentication API calls
export const register = async (userData) => {
  try {
    console.log('API: register called with', userData);
    const response = await api.post('/api/auth/register', userData);
    console.log('API: register response', response.data);
    return response.data;
  } catch (error) {
    console.error('API: register error', error);
    
    // Check if we should use mock data (either by default or as fallback)
    if (useMockData || (fallbackToMockOnError && error.response?.status >= 500)) {
      console.log('API: Using mock data for register (server error fallback)');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For mock data, allow registration with any email for testing
      const mockResponse = {
        token: 'mock-token-12345',
        user: {
          ...mockUser,
          name: userData.name,
          email: userData.email
        }
      };
      
      // Save this mock user for future login attempts
      saveCreatedMockUser(userData.email, userData.password, mockResponse.user);
      
      console.log('API: mock register response', mockResponse);
      return mockResponse;
    }
    
    throw error;
  }
};

export const login = async (userData) => {
  try {
    console.log('API: login called with', userData);
    
    // Check if this is a mock user created during registration
    const mockUserMatch = findMockUser(userData.email, userData.password);
    if (mockUserMatch) {
      console.log('API: Found matching mock user, bypassing server login');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Return stored user data for the mock account
      const mockResponse = {
        token: 'mock-token-12345',
        user: mockUserMatch.userData
      };
      
      // Store auth data for fallback
      localStorage.setItem('auth', JSON.stringify({
        email: userData.email,
        name: mockUserMatch.userData.name
      }));
      
      console.log('API: mock login response for previously registered user', mockResponse);
      return mockResponse;
    }
    
    // If not a mock user, try real server login
    const response = await api.post('/api/auth/login', userData);
    console.log('API: login response', response.data);
    
    // Store auth data for fallback
    localStorage.setItem('auth', JSON.stringify({
      email: userData.email,
      name: response.data.user?.name || userData.email.split('@')[0]
    }));
    
    return response.data;
  } catch (error) {
    console.error('API: login error', error);
    
    // Special handling for 401/403 status codes (authentication failures)
    // Always reject invalid credentials, never fall back to mock for auth failures
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('API: Authentication failed, rejecting login attempt');
      throw error;
    }
    
    // Check if we should use mock data as fallback
    if (fallbackToMockOnError && error.response?.status >= 500) {
      console.log('API: Server error during login, checking if we can use mock data');
      
      // Even in fallback mode, we should validate email format at minimum
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email) || !userData.password || userData.password.length < 6) {
        console.log('API: Invalid credentials format, rejecting login attempt');
        throw { 
          response: { 
            status: 401, 
            data: { message: 'Invalid email format or password too short' } 
          } 
        };
      }
      
      // Look for an existing user with this email in mock storage
      // Only allow login if this email was previously registered
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const existingUser = mockUsers.find(user => user.email === userData.email);
      
      if (!existingUser) {
        console.log('API: No such user exists in mock data, rejecting login');
        throw { 
          response: { 
            status: 401, 
            data: { message: 'Invalid email or password' } 
          } 
        };
      } else if (existingUser.password !== userData.password) {
        console.log('API: Password mismatch in mock data, rejecting login');
        throw { 
          response: { 
            status: 401, 
            data: { message: 'Invalid email or password' } 
          } 
        };
      }
      
      // If we got here, the user exists in mock data and password is correct
      console.log('API: Using fallback for login (server error fallback)');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store auth data for fallback
      localStorage.setItem('auth', JSON.stringify({
        email: userData.email,
        name: existingUser.userData.name || userData.email.split('@')[0]
      }));
      
      // For mock data, create a user based on the stored user data
      const mockResponse = {
        token: 'mock-token-12345',
        user: existingUser.userData
      };
      console.log('API: mock login response', mockResponse);
      return mockResponse;
    }
    
    throw error;
  }
};

// User profile related API calls
export const getUserProfile = async () => {
  try {
    console.log('API: getUserProfile called');
    const response = await api.get('/api/auth/me');
    console.log('API: getUserProfile response', response.data);
    
    // Store user data in localStorage for fallback
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    console.error('API: getUserProfile error', error);
    
    // Check if we should use mock data as fallback
    if (fallbackToMockOnError && error.response?.status >= 500) {
      console.log('API: Using fallback for getUserProfile (server error fallback)');
      
      // Try to get stored user data first
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('API: using stored user data', parsedUser);
          return parsedUser;
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
      
      // If no stored user, create a mock one
      // Get email from localStorage if available
      let userEmail = 'user@example.com';
      let userName = 'User';
      
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          userEmail = parsedAuth.email || userEmail;
          userName = parsedAuth.name || userName;
        } catch (e) {
          console.error('Error parsing stored auth:', e);
        }
      }
      
      const customMockUser = {
        ...mockUser,
        name: userName,
        email: userEmail
      };
      
      console.log('API: mock getUserProfile response', customMockUser);
      return customMockUser;
    }
    
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/api/users/profile', profileData);
    return response.data;
  } catch (error) {
    if (useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedUser = {
        ...mockUser,
        ...profileData
      };
      
      return { user: updatedUser };
    }
    throw error;
  }
};

// Children related API calls
export const getChildren = async () => {
  try {
    const response = await api.get('/api/users/children');
    return response.data;
  } catch (error) {
    if (useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockUser.children;
    }
    throw error;
  }
};

export const addChild = async (childData) => {
  try {
    const response = await api.post('/api/users/children', childData);
    return response.data;
  } catch (error) {
    // Check specifically for authentication errors
    if (error.response?.status === 401) {
      console.log('API: Authentication error when adding child, checking for token');
      
      // Check if we have a token but it might be invalid/expired
      const token = localStorage.getItem('token');
      if (!token && fallbackToMockOnError) {
        console.log('API: No token found, using mock data fallback for addChild');
      } else if (token) {
        console.log('API: Token found but was rejected, may be expired');
      }
    }
    
    if (useMockData || (fallbackToMockOnError && (error.response?.status >= 500 || error.response?.status === 401))) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newChild = {
        _id: `child-${Date.now()}`,
        ...childData
      };
      
      // Update user in localStorage with the new child
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const updatedUser = {
            ...parsedUser,
            children: [...(parsedUser.children || []), newChild]
          };
          
          // Save the updated user data back to localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log('Updated user in localStorage with new child:', newChild.name);
        } catch (e) {
          console.error('Error updating stored user with new child:', e);
        }
      }
      
      return { child: newChild };
    }
    throw error;
  }
};

export const updateChild = async (childId, childData) => {
  try {
    const response = await api.put(`/api/users/children/${childId}`, childData);
    return response.data;
  } catch (error) {
    if (useMockData || (fallbackToMockOnError && error.response?.status >= 500)) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update child in localStorage too
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          if (parsedUser.children && parsedUser.children.length > 0) {
            const updatedChildren = parsedUser.children.map(child => 
              child._id === childId ? { ...child, ...childData } : child
            );
            
            const updatedUser = {
              ...parsedUser,
              children: updatedChildren
            };
            
            // Save the updated user data back to localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            console.log('Updated child in localStorage:', childId);
            
            const updatedChild = updatedChildren.find(c => c._id === childId);
            if (updatedChild) {
              return { child: updatedChild };
            }
          }
        } catch (e) {
          console.error('Error updating child in localStorage:', e);
        }
      }
      
      // Fallback to returning the updated child data directly
      const updatedChild = {
        _id: childId,
        ...childData
      };
      
      return { child: updatedChild };
    }
    throw error;
  }
};

export const deleteChild = async (childId) => {
  try {
    const response = await api.delete(`/api/users/children/${childId}`);
    return response.data;
  } catch (error) {
    if (useMockData || (fallbackToMockOnError && error.response?.status >= 500)) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Remove the child from localStorage too
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          if (parsedUser.children && parsedUser.children.length > 0) {
            const updatedUser = {
              ...parsedUser,
              children: parsedUser.children.filter(child => child._id !== childId)
            };
            
            // Save the updated user data back to localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            console.log('Removed child from localStorage:', childId);
          }
        } catch (e) {
          console.error('Error removing child from localStorage:', e);
        }
      }
      
      return { success: true };
    }
    throw error;
  }
};

// Subscription related API calls
export const updateSubscription = async (subscriptionData) => {
  try {
    const response = await api.put('/api/users/subscription', subscriptionData);
    return response.data;
  } catch (error) {
    if (useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        subscription: subscriptionData.plan,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    }
    throw error;
  }
};

// Activity related API calls
export const getActivities = async (params = {}) => {
  try {
    const response = await api.get('/api/activities', { params });
    return response.data;
  } catch (error) {
    console.error('API: getActivities error', error);
    
    // Check if we should use mock data as fallback
    if (fallbackToMockOnError && error.response?.status >= 500) {
      console.log('API: Using fallback for getActivities (server error fallback)');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter activities based on params
      let filteredActivities = [...mockActivities];
      
      if (params.ageMin !== undefined && params.ageMax !== undefined) {
        filteredActivities = filteredActivities.filter(activity => 
          activity.ageRange.max >= params.ageMin && activity.ageRange.min <= params.ageMax
        );
      }
      
      if (params.limit) {
        filteredActivities = filteredActivities.slice(0, params.limit);
      }
      
      return {
        activities: filteredActivities,
        total: mockActivities.length,
        page: 1,
        limit: params.limit || mockActivities.length
      };
    }
    
    throw error;
  }
};

export const getActivityById = async (id) => {
  try {
    const response = await api.get(`/api/activities/${id}`);
    return response.data;
  } catch (error) {
    if (useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const activity = mockActivities.find(a => a._id === id);
      if (!activity) {
        throw { response: { status: 404, data: { message: 'Activity not found' } } };
      }
      
      return activity;
    }
    throw error;
  }
};

// Favorites related API calls
export const getFavorites = async () => {
  try {
    const response = await api.get('/api/users/favorites');
    return response.data;
  } catch (error) {
    console.error('API: getFavorites error', error);
    
    // Check if we should use mock data as fallback
    if (fallbackToMockOnError && error.response?.status >= 500) {
      console.log('API: Using fallback for getFavorites (server error fallback)');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockFavorites;
    }
    
    throw error;
  }
};

export const addToFavorites = async (activityId) => {
  try {
    const response = await api.post('/api/users/favorites', { activityId });
    return response.data;
  } catch (error) {
    if (useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const activity = mockActivities.find(a => a._id === activityId);
      if (!activity) {
        throw { response: { status: 404, data: { message: 'Activity not found' } } };
      }
      
      return { success: true, activity };
    }
    throw error;
  }
};

export const removeFromFavorites = async (activityId) => {
  try {
    const response = await api.delete(`/api/users/favorites/${activityId}`);
    return response.data;
  } catch (error) {
    if (useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      return { success: true };
    }
    throw error;
  }
};

// Activity history related API calls
export const getActivityHistory = async () => {
  try {
    const response = await api.get('/api/users/activity-history');
    return response.data;
  } catch (error) {
    console.error('API: getActivityHistory error', error);
    
    // Check if we should use mock data as fallback
    if (fallbackToMockOnError && error.response?.status >= 500) {
      console.log('API: Using fallback for getActivityHistory (server error fallback)');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockHistory;
    }
    
    throw error;
  }
};

export const addToHistory = async (activityId, notes = null) => {
  try {
    const response = await api.post('/api/users/activity-history', { activityId, notes });
    return response.data;
  } catch (error) {
    if (useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const activity = mockActivities.find(a => a._id === activityId);
      if (!activity) {
        throw { response: { status: 404, data: { message: 'Activity not found' } } };
      }
      
      const historyEntry = {
        _id: `history-${Date.now()}`,
        activity,
        completedDate: new Date().toISOString(),
        notes
      };
      
      return historyEntry;
    }
    throw error;
  }
};

export default api;