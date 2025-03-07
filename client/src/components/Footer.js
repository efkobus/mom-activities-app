import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import ChildCareIcon from '@mui/icons-material/ChildCare';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ChildCareIcon 
                sx={{ 
                  fontSize: 30, 
                  color: 'primary.main',
                  mr: 1,
                  transform: 'rotate(-10deg)' 
                }} 
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main',
                  letterSpacing: 0.5
                }}
              >
                KidsPlay
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Educational activities designed by experts to make learning fun and engaging for children ages 0-6.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" aria-label="Facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" aria-label="Twitter" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" aria-label="Instagram" color="primary">
                <InstagramIcon />
              </IconButton>
              <IconButton size="small" aria-label="Pinterest" color="primary">
                <PinterestIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Explore
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/activities" color="inherit" underline="hover">
                  Activities
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/subscription" color="inherit" underline="hover">
                  Pricing
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                  About Us
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                  Contact
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Account
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/login" color="inherit" underline="hover">
                  Log In
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/register" color="inherit" underline="hover">
                  Sign Up
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/profile" color="inherit" underline="hover">
                  My Profile
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/favorites" color="inherit" underline="hover">
                  My Favorites
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to our newsletter for activity ideas, child development tips, and special offers.
            </Typography>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex',
                '& .MuiOutlinedInput-root': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                },
                '& .MuiButton-root': {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0
                }
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                style={{ 
                  flex: 1, 
                  padding: '10px 14px', 
                  border: '1px solid #ccc',
                  borderRight: 'none',
                  borderRadius: '4px 0 0 4px',
                  fontSize: '14px'
                }}
              />
              <Button 
                variant="contained" 
                sx={{ borderRadius: '0 4px 4px 0' }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} KidsPlay. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;