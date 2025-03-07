import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardMedia,
  Alert,
  CircularProgress
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// Mock data - in a real app, this would come from an API
const mockActivity = {
  id: 1,
  title: "Sensory Water Beads Play",
  description: "A colorful sensory activity that helps develop fine motor skills and sensory exploration.",
  ageRange: "2-4 years",
  duration: "30 minutes",
  category: "Sensory Play",
  difficulty: "Easy",
  materials: [
    "Water beads (pre-soaked for 4-6 hours)",
    "Large plastic container or tray",
    "Small cups or containers",
    "Scoops, spoons, or tongs",
    "Optional: food coloring to dye the beads"
  ],
  steps: [
    "Pre-soak water beads according to package instructions (usually 4-6 hours).",
    "Place the soaked water beads in a large container or tray.",
    "Set up small cups, scoops, and tongs around the tray.",
    "Show your child how to scoop, pour, and transfer the beads.",
    "Allow free exploration with the beads, supervising at all times."
  ],
  tips: [
    "Water beads are not edible and should be used only with children who no longer mouth objects.",
    "Store soaked beads in the refrigerator in a sealed container to use again.",
    "Add light underneath for an extra sensory element.",
    "Try freezing some beads for a different sensory experience."
  ],
  benefits: [
    "Develops fine motor skills",
    "Encourages sensory exploration",
    "Introduces concepts of volume and pouring",
    "Promotes focus and concentration"
  ],
  videoUrl: "https://www.youtube.com/embed/exampleVideoId",
  hasVideo: true,
  images: [
    "/images/activities/water-beads-1.jpg",
    "/images/activities/water-beads-2.jpg"
  ]
};

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, fetch data from API based on ID
    // For now, we'll use mock data and simulate loading
    const fetchActivity = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setActivity(mockActivity);
        setLoading(false);
      } catch (err) {
        setError('Failed to load activity details. Please try again later.');
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!activity) {
    return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Alert severity="info">Activity not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2 }} 
        variant="outlined"
        onClick={() => window.history.back()}
      >
        Back to Activities
      </Button>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {activity.title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip icon={<AccessTimeIcon />} label={`Duration: ${activity.duration}`} />
          <Chip icon={<CategoryIcon />} label={`Category: ${activity.category}`} />
          <Chip icon={<EmojiPeopleIcon />} label={`Age: ${activity.ageRange}`} />
        </Box>

        <Typography variant="body1" paragraph>
          {activity.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button variant="outlined" startIcon={<FavoriteIcon />}>
            Save
          </Button>
          <Button variant="outlined" startIcon={<ShareIcon />}>
            Share
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            How to Do This Activity
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Materials Needed:
          </Typography>
          <List>
            {activity.materials.map((material, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleOutlineIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={material} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Step-by-Step Instructions:
          </Typography>
          <List>
            {activity.steps.map((step, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <Box 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </Box>
                </ListItemIcon>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          {activity.hasVideo ? (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Watch How to Do It
              </Typography>
              <Card>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0
                    }}
                    src={activity.videoUrl}
                    title={`How to do ${activity.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </Card>
            </Box>
          ) : (
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', bgcolor: 'grey.100', borderRadius: 1 }}>
              <PlayCircleOutlineIcon sx={{ fontSize: 60, color: 'grey.500', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No video tutorial available for this activity
              </Typography>
            </Box>
          )}

          {activity.images && activity.images.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Activity Images
              </Typography>
              <Grid container spacing={2}>
                {activity.images.map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt={`${activity.title} - image ${index + 1}`}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tips for Success
            </Typography>
            <List>
              {activity.tips.map((tip, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Benefits for Your Child
            </Typography>
            <List>
              {activity.benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivityDetail;