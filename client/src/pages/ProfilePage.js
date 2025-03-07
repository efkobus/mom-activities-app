import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../utils/api';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Alert,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { format } from 'date-fns';

const profileValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required')
});

const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm your password')
});

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(null);
      
      const userData = {
        name: values.name,
        email: values.email
      };
      
      await updateProfile(userData);
      setSuccess('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setError(null);
      setSuccess(null);
      
      // In a real app, you would call an API to change the password
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSuccess('Password changed successfully');
      setPasswordEditMode(false);
      resetForm();
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="info">
          Please log in to view your profile.
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {success}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Personal Information"
              action={
                !editMode && (
                  <IconButton onClick={() => setEditMode(true)}>
                    <EditIcon />
                  </IconButton>
                )
              }
            />
            <Divider />
            <CardContent>
              {editMode ? (
                <Formik
                  initialValues={{
                    name: user.name || '',
                    email: user.email || ''
                  }}
                  validationSchema={profileValidationSchema}
                  onSubmit={handleProfileSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <Field
                        as={TextField}
                        fullWidth
                        margin="normal"
                        id="name"
                        name="name"
                        label="Name"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                      
                      <Field
                        as={TextField}
                        fullWidth
                        margin="normal"
                        id="email"
                        name="email"
                        label="Email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<SaveIcon />}
                          disabled={isSubmitting}
                        >
                          Save
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', width: 120 }}>
                      Name:
                    </Typography>
                    <Typography variant="body1">
                      {user.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', width: 120 }}>
                      Email:
                    </Typography>
                    <Typography variant="body1">
                      {user.email}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', width: 120 }}>
                      Member Since:
                    </Typography>
                    <Typography variant="body1">
                      {user.createdAt ? format(new Date(user.createdAt), 'MMMM d, yyyy') : 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Change Password"
              action={
                !passwordEditMode && (
                  <IconButton onClick={() => setPasswordEditMode(true)}>
                    <EditIcon />
                  </IconButton>
                )
              }
            />
            <Divider />
            <CardContent>
              {passwordEditMode ? (
                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }}
                  validationSchema={passwordValidationSchema}
                  onSubmit={handlePasswordSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <Field
                        as={TextField}
                        fullWidth
                        margin="normal"
                        id="currentPassword"
                        name="currentPassword"
                        label="Current Password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        error={touched.currentPassword && Boolean(errors.currentPassword)}
                        helperText={touched.currentPassword && errors.currentPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                edge="end"
                              >
                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      
                      <Field
                        as={TextField}
                        fullWidth
                        margin="normal"
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        error={touched.newPassword && Boolean(errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                edge="end"
                              >
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      
                      <Field
                        as={TextField}
                        fullWidth
                        margin="normal"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm New Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => setPasswordEditMode(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<SaveIcon />}
                          disabled={isSubmitting}
                        >
                          Change Password
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Box sx={{ py: 2 }}>
                  <Typography variant="body1" color="text.secondary">
                    For security reasons, your password is not displayed. Click the edit button to change your password.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
          
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Subscription" />
            <Divider />
            <CardContent>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', width: 120 }}>
                  Plan:
                </Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {user.subscription || 'Free'}
                </Typography>
              </Box>
              
              {user.subscriptionExpiry && (
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: 120 }}>
                    Expires:
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(user.subscriptionExpiry), 'MMMM d, yyyy')}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  component={RouterLink}
                  to="/subscription"
                >
                  {user.subscription && user.subscription !== 'free' ? 'Manage Subscription' : 'Upgrade Plan'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;