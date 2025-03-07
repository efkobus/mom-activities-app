import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Paper,
  useTheme,
  IconButton,
} from '@mui/material';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BrushIcon from '@mui/icons-material/Brush';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ExtensionIcon from '@mui/icons-material/Extension';

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: '#fafafa' }}>
      {/* Logo Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        py: 2,
        bgcolor: 'white' 
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          cursor: 'pointer'
        }}>
          <ChildCareIcon 
            sx={{ 
              fontSize: 40, 
              color: '#FF6B6B',
              transform: 'rotate(-10deg)' 
            }} 
          />
          <Typography 
            variant="h4" 
            component="span" 
            sx={{ 
              fontWeight: 700,
              color: '#4A90E2',
              letterSpacing: 1,
              fontFamily: '"Segoe UI", "Roboto", "Arial"',
            }}
          >
            KidsPlay
          </Typography>
          <SchoolIcon 
            sx={{ 
              fontSize: 30, 
              color: '#FFD93D',
              transform: 'rotate(10deg)',
              ml: 0.5
            }} 
          />
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #4A90E2 0%, #6C63FF 100%)',
        color: 'white',
        pt: 12,
        pb: 20,
        position: 'relative',
        overflow: 'visible'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                className="slide-in-left"
                sx={{ 
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Where Learning Meets
                <Box component="span" sx={{ color: '#FFD93D', display: 'block' }} className="slide-in-right">
                  Playtime Magic
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }} className="fade-in">
                Discover a world of educational toys and activities that make learning an adventure for your little ones
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    bgcolor: '#FF6B6B',
                    '&:hover': {
                      bgcolor: '#FF5252',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2
                  }}
                >
                  Start Exploring
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '400px' }}>
                {/* Floating elements animation would go here */}
                <Box sx={{ 
                  position: 'absolute',
                  right: '10%',
                  top: '20%',
                }} className="bounce">
                  <Paper sx={{ 
                    p: 2, 
                    bgcolor: '#FFD93D',
                    borderRadius: 3,
                    boxShadow: 3,
                  }} className="hover-glow">
                    <ExtensionIcon sx={{ fontSize: 40, color: '#4A90E2' }} className="rotate" />
                  </Paper>
                </Box>
                <Box sx={{ 
                  position: 'absolute',
                  left: '20%',
                  top: '40%',
                  animation: 'float 8s ease-in-out infinite',
                }}>
                  <Paper sx={{ 
                    p: 2, 
                    bgcolor: '#FF6B6B',
                    borderRadius: 3,
                    boxShadow: 3,
                  }}>
                    <BrushIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Paper>
                </Box>
                <Box sx={{ 
                  position: 'absolute',
                  right: '30%',
                  bottom: '20%',
                  animation: 'float 7s ease-in-out infinite',
                }}>
                  <Paper sx={{ 
                    p: 2, 
                    bgcolor: '#4A90E2',
                    borderRadius: 3,
                    boxShadow: 3,
                  }}>
                    <MusicNoteIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Paper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ 
        mt: -10, 
        pb: 10,
        px: 2,
        position: 'relative',
        zIndex: 1
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={3}>
            {[
              {
                icon: <StarIcon sx={{ fontSize: 40, color: '#FFD93D' }} />,
                title: 'Age-Appropriate',
                description: "Activities tailored to your child's developmental stage"
              },
              {
                icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#FF6B6B' }} />,
                title: 'Achievement Based',
                description: 'Reward system that celebrates every milestone'
              },
              {
                icon: <SportsEsportsIcon sx={{ fontSize: 40, color: '#4A90E2' }} />,
                title: 'Interactive Learning',
                description: 'Engaging activities that make learning fun'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                  }
                }} className="hover-lift fade-in">
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Activities Preview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 6,
            fontWeight: 700,
            color: '#2C3E50'
          }}
        >
          Discover Amazing Activities
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Creative Arts',
              icon: <BrushIcon sx={{ fontSize: 40 }} />,
              color: '#FF6B6B',
              description: 'Unleash imagination through drawing and crafts'
            },
            {
              title: 'Music & Movement',
              icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
              color: '#4A90E2',
              description: 'Dance, sing, and develop rhythm skills'
            },
            {
              title: 'Problem Solving',
              icon: <ExtensionIcon sx={{ fontSize: 40 }} />,
              color: '#FFD93D',
              description: 'Fun puzzles and brain-teasing activities'
            }
          ].map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ 
                p: 3,
                height: '100%',
                borderRadius: 4,
                bgcolor: activity.color,
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05) translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                }
              }} className="fade-in hover-glow">
                {React.cloneElement(activity.icon, { className: 'pulse' })}
                <Typography variant="h5" sx={{ my: 2 }}>
                  {activity.title}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {activity.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        bgcolor: '#4A90E2',
        color: 'white',
        py: 10,
        mt: 8
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to Start the Adventure?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of happy parents and children on their learning journey
          </Typography>
          <Button 
            variant="contained"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{
              bgcolor: '#FF6B6B',
              '&:hover': {
                bgcolor: '#FF5252',
              },
              px: 6,
              py: 2,
              borderRadius: 2,
              fontSize: '1.2rem'
            }}
          >
            Get Started Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;