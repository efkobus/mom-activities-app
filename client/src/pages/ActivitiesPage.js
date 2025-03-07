import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link as RouterLink } from 'react-router-dom';

const ActivitiesPage = () => {
  const [ageRange, setAgeRange] = useState([1, 6]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for activities
  const activities = [
    {
      id: 1,
      title: "Sensory Water Play",
      description: "Develop fine motor skills and sensory exploration with water and various containers.",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&auto=format&fit=crop",
      age: "1-3",
      time: 20,
      category: "Sensory",
      materials: ["Water", "Containers", "Toys"],
      favorite: false
    },
    {
      id: 2,
      title: "Color Sorting Game",
      description: "Learn colors and practice categorization with this simple sorting activity.",
      image: "https://images.unsplash.com/photo-1615147342761-9238e15d8b96?w=500&auto=format&fit=crop",
      age: "2-4",
      time: 15,
      category: "Cognitive",
      materials: ["Colored objects", "Sorting containers"],
      favorite: true
    },
    {
      id: 3,
      title: "DIY Musical Instruments",
      description: "Create simple instruments and explore rhythm, sound, and music concepts.",
      image: "https://images.unsplash.com/photo-1619379179326-c50977cd30fa?w=500&auto=format&fit=crop",
      age: "3-6",
      time: 30,
      category: "Creative",
      materials: ["Empty containers", "Rice/beans", "Rubber bands"],
      favorite: false
    },
    {
      id: 4,
      title: "Nature Scavenger Hunt",
      description: "Explore the outdoors while learning about nature and developing observation skills.",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&auto=format&fit=crop",
      age: "4-6",
      time: 45,
      category: "Outdoor",
      materials: ["Scavenger hunt list", "Collection bag"],
      favorite: false
    },
    {
      id: 5,
      title: "Letter Recognition Game",
      description: "Practice letter recognition and early literacy skills through play.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop",
      age: "3-5",
      time: 15,
      category: "Language",
      materials: ["Letter cards", "Small toys"],
      favorite: true
    },
    {
      id: 6,
      title: "Counting with Playdough",
      description: "Develop number sense and fine motor skills with this tactile math activity.",
      image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=500&auto=format&fit=crop",
      age: "2-4",
      time: 20,
      category: "Math",
      materials: ["Playdough", "Number cards"],
      favorite: false
    }
  ];

  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Filter activities based on search and filters
  const filteredActivities = activities.filter(activity => {
    // Parse age range from string (e.g., "2-4" -> [2, 4])
    const [minAge, maxAge] = activity.age.split('-').map(Number);
    
    // Check if activity matches all filters
    return (
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'all' || activity.category === category) &&
      (timeFilter === 'all' || 
        (timeFilter === 'short' && activity.time <= 15) ||
        (timeFilter === 'medium' && activity.time > 15 && activity.time <= 30) ||
        (timeFilter === 'long' && activity.time > 30)) &&
      (maxAge >= ageRange[0] && minAge <= ageRange[1])
    );
  });

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight={700}
          className="slide-in-left"
        >
          Educational Activities
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          paragraph
          className="fade-in"
        >
          Discover activities tailored to your child's age and developmental needs
        </Typography>

        {/* Search and Filters */}
        <Paper 
          elevation={2} 
          sx={{ p: 3, mb: 4, borderRadius: 2 }}
          className="fade-in"
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search activities..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={8} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Sensory">Sensory</MenuItem>
                  <MenuItem value="Cognitive">Cognitive</MenuItem>
                  <MenuItem value="Creative">Creative</MenuItem>
                  <MenuItem value="Outdoor">Outdoor</MenuItem>
                  <MenuItem value="Language">Language</MenuItem>
                  <MenuItem value="Math">Math</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} md={2}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                onClick={toggleFilters}
                sx={{ height: '56px' }}
              >
                Filters
              </Button>
            </Grid>
          </Grid>

          {showFilters && (
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee' }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Age Range (years)
                  </Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={ageRange}
                      onChange={handleAgeChange}
                      valueLabelDisplay="on"
                      min={0}
                      max={6}
                      step={1}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3' },
                        { value: 4, label: '4' },
                        { value: 5, label: '5' },
                        { value: 6, label: '6' },
                      ]}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Activity Duration
                  </Typography>
                  <FormControl fullWidth variant="outlined">
                    <Select
                      value={timeFilter}
                      onChange={handleTimeChange}
                      displayEmpty
                    >
                      <MenuItem value="all">Any Duration</MenuItem>
                      <MenuItem value="short">Quick (≤ 15 min)</MenuItem>
                      <MenuItem value="medium">Medium (15-30 min)</MenuItem>
                      <MenuItem value="long">Extended ({'>'} 30 min)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

        {/* Results count */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            Showing {filteredActivities.length} activities
          </Typography>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <Select
              defaultValue="recommended"
              displayEmpty
            >
              <MenuItem value="recommended">Recommended</MenuItem>
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="az">A to Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Activities Grid */}
        <Grid container spacing={3}>
          {filteredActivities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative'
                }}
                className="activity-card fade-in hover-lift"
              >
                <CardActionArea component={RouterLink} to={`/activities/${activity.id}`}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={activity.image}
                    alt={activity.title}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      left: 12, 
                      display: 'flex', 
                      gap: 1 
                    }}
                  >
                    <Chip 
                      label={activity.category} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.9)', 
                        fontWeight: 500,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' }
                      }} 
                      icon={<CategoryIcon fontSize="small" />}
                    />
                    <Chip 
                      label={`${activity.time} min`} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.9)', 
                        fontWeight: 500,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' }
                      }} 
                      icon={<AccessTimeIcon fontSize="small" />}
                    />
                  </Box>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      right: 12
                    }}
                  >
                    {activity.favorite ? (
                      <FavoriteIcon sx={{ color: '#FF6B6B' }} className="pulse" />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: 'white' }} />
                    )}
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ChildCareIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Ages {activity.age}
                      </Typography>
                    </Box>
                    <Typography gutterBottom variant="h6" component="h2">
                      {activity.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2">
                      Materials needed:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                      {activity.materials.map((material, idx) => (
                        <Chip 
                          key={idx} 
                          label={material} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty state */}
        {filteredActivities.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom>
              No activities match your filters
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Try adjusting your search criteria or filters to find activities.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                setSearchTerm('');
                setCategory('all');
                setTimeFilter('all');
                setAgeRange([1, 6]);
              }}
            >
              Reset All Filters
            </Button>
          </Box>
        )}

        {/* Load more button */}
        {filteredActivities.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ px: 4 }}
              className="hover-lift"
            >
              Load More Activities
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ActivitiesPage;