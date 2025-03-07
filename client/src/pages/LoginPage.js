import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate('/dashboard');
    } catch (err) {
      // Provide a more helpful error message for server errors
      if (err.response?.status >= 500) {
        setError('Server error occurred. Using mock data for development. In production, please contact support.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
      setSubmitting(false);
    }
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Log in to access your personalized activities
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                
                <Box sx={{ mt: 1, mb: 2, textAlign: 'right' }}>
                  <Link component={RouterLink} to="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 2, mb: 2 }}
                >
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </Button>
                
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/register">
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;