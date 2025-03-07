import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Paper,
  CircularProgress
} from '@mui/material';
import { format } from 'date-fns';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import RecommendIcon from '@mui/icons-material/Recommend';
import StarIcon from '@mui/icons-material/Star';
import { getActivities, getFavorites, getActivityHistory } from '../utils/api';
import ActivityCard from '../components/ActivityCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [recommendedActivities, setRecommendedActivities] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get recommended activities based on child's age if available
        let ageFilter = {};
        if (user?.children?.length > 0) {
          const youngestChild = [...user.children].sort((a, b) => 
            new Date(b.birthdate) - new Date(a.birthdate)
          )[0];
          
          const birthDate = new Date(youngestChild.birthdate);
          const today = new Date();
          const ageInYears = (today - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
          
          ageFilter = {
            ageMin: Math.max(0, Math.floor(ageInYears - 0.5)),
            ageMax: Math.ceil(ageInYears + 0.5)
          };
        }
        
        // Fetch recommended activities
        const recommendedRes = await getActivities({
          ...ageFilter,
          limit: 6
        });
        setRecommendedActivities(recommendedRes.activities);
        
        // Fetch favorites
        const favoritesRes = await getFavorites();
        setFavoriteActivities(favoritesRes.slice(0, 3));
        setFavoriteIds(new Set(favoritesRes.map(fav => fav._id)));
        
        // Fetch activity history
        const historyRes = await getActivityHistory();
        setRecentActivities(historyRes.slice(0, 5));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);
  
  const handleFavoriteToggle = (activityId, isFavorite) => {
    if (isFavorite) {
      setFavoriteIds(prev => new Set([...prev, activityId]));
    } else {
      setFavoriteIds(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(activityId);
        return newSet;
      });
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find and track educational activities for your {user?.children?.length > 0 ? 'children' : 'child'}
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {/* Left column */}
        <Grid item xs={12} md={8}>
          {/* Recommended Activities */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                <RecommendIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recommended Activities
              </Typography>
              <Button component={RouterLink} to="/activities">
                View All
              </Button>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              {recommendedActivities.length > 0 ? (
                recommendedActivities.slice(0, 3).map((activity) => (
                  <Grid item xs={12} sm={6} md={4} key={activity._id}>
                    <ActivityCard 
                      activity={activity} 
                      isFavorite={favoriteIds.has(activity._id)}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary" align="center">
                    No recommended activities yet. Start by adding a child profile.
                  </Typography>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      component={RouterLink} 
                      to="/children"
                    >
                      Add Child Profile
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
            
            {recommendedActivities.length > 0 && (
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button 
                  variant="outlined" 
                  component={RouterLink} 
                  to="/activities"
                >
                  Explore More Activities
                </Button>
              </Box>
            )}
          </Paper>
          
          {/* Recent Activity */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Activity
              </Typography>
              <Button component={RouterLink} to="/history">
                View All
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {recentActivities.length > 0 ? (
              <List>
                {recentActivities.map((item) => (
                  <ListItem 
                    key={item._id}
                    component={RouterLink}
                    to={`/activities/${item.activity._id}`}
                    sx={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={item.activity.images?.[0]} alt={item.activity.title}>
                        {item.activity.title.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={item.activity.title}
                      secondary={`Completed on ${format(new Date(item.completedDate), 'MMM d, yyyy')}`}
                    />
                    {item.notes && (
                      <Chip 
                        label="Notes" 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 3 }}>
                You haven't completed any activities yet. Start exploring!
              </Typography>
            )}
          </Paper>
        </Grid>
        
        {/* Right column */}
        <Grid item xs={12} md={4}>
          {/* Subscription Status */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Subscription Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip 
                  label={user?.subscription === 'free' ? 'Free Plan' : user?.subscription === 'premium' ? 'Premium Plan' : 'Family Plan'} 
                  color={user?.subscription === 'free' ? 'default' : 'secondary'}
                  icon={user?.subscription !== 'free' ? <StarIcon /> : undefined}
                />
              </Box>
              
              {user?.subscription === 'free' ? (
                <Button 
                  variant="contained" 
                  fullWidth 
                  component={RouterLink} 
                  to="/subscription"
                >
                  Upgrade to Premium
                </Button>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {user?.subscriptionExpiry && (
                    <>Expires: {format(new Date(user.subscriptionExpiry), 'MMMM d, yyyy')}</>
                  )}
                </Typography>
              )}
            </CardContent>
          </Card>
          
          {/* Child Profiles */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <ChildCareIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Child Profiles
                </Typography>
                <Button 
                  size="small" 
                  component={RouterLink} 
                  to="/children"
                >
                  Manage
                </Button>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              {user?.children && user.children.length > 0 ? (
                <List dense>
                  {user.children.map((child) => (
                    <ListItem key={child._id}>
                      <ListItemAvatar>
                        <Avatar>
                          {child.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={child.name}
                        secondary={`${format(new Date(child.birthdate), 'MMM d, yyyy')}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    No child profiles yet
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    component={RouterLink} 
                    to="/children"
                  >
                    Add Child
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
          
          {/* Favorites */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <FavoriteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Favorites
                </Typography>
                <Button 
                  size="small" 
                  component={RouterLink} 
                  to="/favorites"
                >
                  View All
                </Button>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              {favoriteActivities.length > 0 ? (
                <List dense>
                  {favoriteActivities.map((activity) => (
                    <ListItem 
                      key={activity._id}
                      component={RouterLink}
                      to={`/activities/${activity._id}`}
                      sx={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={activity.images?.[0]} alt={activity.title}>
                          {activity.title.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={activity.title}
                        secondary={`Ages ${activity.ageRange.min}-${activity.ageRange.max}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                  You haven't saved any favorites yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;