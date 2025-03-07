import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';

// Public pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';

// Protected pages
import DashboardPage from './pages/DashboardPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import ProfilePage from './pages/ProfilePage';
import ChildrenPage from './pages/ChildrenPage';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import ActivityPacksPage from './pages/ActivityPacksPage';
import PackDetailPage from './pages/PackDetailPage';
import SubscriptionPage from './pages/SubscriptionPage';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="pricing" element={<PricingPage />} />
        
        {/* Protected routes */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="activities" element={
          <ProtectedRoute>
            <ActivitiesPage />
          </ProtectedRoute>
        } />
        <Route path="activities/:id" element={
          <ProtectedRoute>
            <ActivityDetailPage />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="children" element={
          <ProtectedRoute>
            <ChildrenPage />
          </ProtectedRoute>
        } />
        <Route path="favorites" element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        } />
        <Route path="history" element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
        <Route path="packs" element={
          <ProtectedRoute>
            <ActivityPacksPage />
          </ProtectedRoute>
        } />
        <Route path="packs/:id" element={
          <ProtectedRoute>
            <PackDetailPage />
          </ProtectedRoute>
        } />
        <Route path="subscription" element={
          <ProtectedRoute>
            <SubscriptionPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;