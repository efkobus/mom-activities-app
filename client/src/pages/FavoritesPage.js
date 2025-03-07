import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getFavorites, removeFromFavorites } from '../utils/api';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
  Paper
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CategoryIcon from '@mui/icons-material/Category';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchFavorites();
  }, []);
  
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to load favorite activities. Please try again.');
      setLoading(false);
    }
  };
  
  const handleRemoveFavorite = async (activityId) => {
    try {
      await removeFromFavorites(activityId);
      setFavorites(favorites.filter(activity => activity._id !== activityId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove from favorites. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Favorite Activities
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {favorites.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Favorite Activities Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Browse activities and click the heart icon to add them to your favorites.
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/activities"
          >
            Explore Activities
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity._id}>
              <Card className="activity-card hover-lift">
                <CardMedia
                  component="img"
                  height="160"
                  image={activity.images?.[0] || 'https://via.placeholder.com/300x160?text=Activity'}
                  alt={activity.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {activity.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activity.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {activity.timeRequired} min
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ChildCareIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Ages {activity.ageRange?.min}-{activity.ageRange?.max}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                    {activity.developmentalAreas?.map((area) => (
                      <Chip
                        key={area}
                        label={area}
                        size="small"
                        icon={<CategoryIcon fontSize="small" />}
                        sx={{ 
                          backgroundColor: 
                            area === 'cognitive' ? '#e3f2fd' :
                            area === 'motor' ? '#e8f5e9' :
                            area === 'social' ? '#fff3e0' :
                            area === 'language' ? '#f3e5f5' :
                            area === 'emotional' ? '#ffebee' :
                            '#e0f7fa'
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={`/activities/${activity._id}`}
                  >
                    View Details
                  </Button>
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveFavorite(activity._id)}
                    sx={{ ml: 'auto' }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;