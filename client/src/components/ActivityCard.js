import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  CardActionArea,
  CardActions
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { addToFavorites, removeFromFavorites } from '../utils/api';

const ActivityCard = ({ activity, isFavorite, onFavoriteToggle }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/activities/${activity._id}`);
  };
  
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      if (isFavorite) {
        await removeFromFavorites(activity._id);
      } else {
        await addToFavorites(activity._id);
      }
      if (onFavoriteToggle) {
        onFavoriteToggle(activity._id, !isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  // Get the first image or use a placeholder
  const imageUrl = activity.images && activity.images.length > 0
    ? activity.images[0]
    : 'https://via.placeholder.com/300x200?text=Activity';
  
  return (
    <Card className="activity-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={activity.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
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
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {activity.developmentalAreas.map((area) => (
              <Chip
                key={area}
                label={area}
                size="small"
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
          
          {activity.isPremium && (
            <Chip
              label="Premium"
              size="small"
              color="secondary"
              sx={{ mt: 1 }}
            />
          )}
        </CardContent>
      </CardActionArea>
      
      <CardActions disableSpacing>
        <IconButton 
          aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
          onClick={handleFavoriteClick}
          color={isFavorite ? "secondary" : "default"}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Ages {activity.ageRange.min}-{activity.ageRange.max}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;