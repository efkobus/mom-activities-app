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
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const steps = ['Account Information', 'About Your Child'];

const accountValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password')
});

const childValidationSchema = Yup.object({
  childName: Yup.string()
    .required('Child\'s name is required'),
  childBirthdate: Yup.date()
    .required('Birthdate is required')
    .max(new Date(), 'Birthdate cannot be in the future')
});

const RegisterPage = () => {
  const { register, addChild } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Submitting registration form with values:', values);
      
      // Register the user
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password
      };
      
      console.log('Calling register with userData:', userData);
      const response = await register(userData);
      console.log('Registration response:', response);
      
      // If child information is provided, add child profile using the context method
      if (values.childName && values.childBirthdate) {
        try {
          console.log('Adding child profile');
          await addChild({
            name: values.childName,
            birthdate: values.childBirthdate,
            interests: values.interests ? values.interests.split(',').map(i => i.trim()) : [],
            developmentalFocus: values.developmentalFocus ? values.developmentalFocus.split(',').map(d => d.trim()) : []
          });
        } catch (childError) {
          console.error('Error adding child profile:', childError);
          // Continue anyway since the user is registered
        }
      }
      
      console.log('Registration successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      
      // Provide a more helpful error message for server errors
      if (err.response?.status >= 500) {
        setError('Server error occurred. Using mock data for development. In production, please contact support.');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
      
      setSubmitting(false);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Create Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get started with personalized educational activities
            </Typography>
          </Box>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              childName: '',
              childBirthdate: '',
              interests: '',
              developmentalFocus: ''
            }}
            validationSchema={activeStep === 0 ? accountValidationSchema : childValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values, isValid }) => (
              <Form>
                {activeStep === 0 ? (
                  // Step 1: Account Information
                  <>
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="name"
                      name="name"
                      label="Your Name"
                      autoComplete="name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    
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
                      autoComplete="new-password"
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
                    
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                    
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleNext}
                      disabled={
                        !values.name || 
                        !values.email || 
                        !values.password || 
                        !values.confirmPassword ||
                        Boolean(errors.name) ||
                        Boolean(errors.email) ||
                        Boolean(errors.password) ||
                        Boolean(errors.confirmPassword)
                      }
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Next
                    </Button>
                  </>
                ) : (
                  // Step 2: Child Information
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      This information helps us personalize activities for your child. You can add more children later.
                    </Typography>
                    
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="childName"
                      name="childName"
                      label="Child's Name"
                      error={touched.childName && Boolean(errors.childName)}
                      helperText={touched.childName && errors.childName}
                    />
                    
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="childBirthdate"
                      name="childBirthdate"
                      label="Child's Birthdate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={touched.childBirthdate && Boolean(errors.childBirthdate)}
                      helperText={touched.childBirthdate && errors.childBirthdate}
                    />
                    
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="interests"
                      name="interests"
                      label="Child's Interests (optional)"
                      placeholder="e.g. animals, music, dinosaurs"
                      helperText="Separate multiple interests with commas"
                    />
                    
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="developmentalFocus"
                      name="developmentalFocus"
                      label="Developmental Focus Areas (optional)"
                      placeholder="e.g. language, motor skills"
                      helperText="Separate multiple areas with commas"
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
                      <Button onClick={handleBack}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || !isValid}
                      >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </Box>
                  </>
                )}
                
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/login">
                      Log in
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

export default RegisterPage;