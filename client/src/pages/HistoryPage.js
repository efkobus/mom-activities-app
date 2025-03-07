import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getActivityHistory } from '../utils/api';
import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { format } from 'date-fns';
import HistoryIcon from '@mui/icons-material/History';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CategoryIcon from '@mui/icons-material/Category';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchHistory();
  }, []);
  
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getActivityHistory();
      setHistory(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching activity history:', err);
      setError('Failed to load activity history. Please try again.');
      setLoading(false);
    }
  };
  
  // Group history by month
  const groupByMonth = (historyItems) => {
    const grouped = {};
    
    historyItems.forEach(item => {
      const date = new Date(item.completedDate);
      const monthYear = format(date, 'MMMM yyyy');
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(item);
    });
    
    return grouped;
  };
  
  const groupedHistory = groupByMonth(history);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <HistoryIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Activity History
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {history.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Activity History Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            When you complete activities with your child, they will appear here.
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/activities"
          >
            Find Activities
          </Button>
        </Paper>
      ) : (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardHeader 
                  title="Activity Stats" 
                  avatar={<TodayIcon color="primary" />}
                />
                <Divider />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1">Total Activities:</Typography>
                    <Typography variant="body1" fontWeight="bold">{history.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1">This Month:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {(groupedHistory[format(new Date(), 'MMMM yyyy')] || []).length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Most Recent:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {history.length > 0 ? format(new Date(history[0].completedDate), 'MMM d, yyyy') : 'N/A'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={8}>
              {Object.keys(groupedHistory).sort((a, b) => {
                // Sort in reverse chronological order
                return new Date(b) - new Date(a);
              }).map(monthYear => (
                <Box key={monthYear} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DateRangeIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h2">
                      {monthYear}
                    </Typography>
                  </Box>
                  
                  <Paper>
                    <List>
                      {groupedHistory[monthYear].map((item, index) => (
                        <React.Fragment key={item._id || index}>
                          {index > 0 && <Divider component="li" />}
                          <ListItem 
                            component={RouterLink}
                            to={`/activities/${item.activity._id}`}
                            sx={{ 
                              textDecoration: 'none', 
                              color: 'inherit',
                              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar 
                                src={item.activity.images?.[0]} 
                                alt={item.activity.title}
                                variant="rounded"
                              >
                                {item.activity.title.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                              primary={item.activity.title}
                              secondary={
                                <React.Fragment>
                                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                                    {format(new Date(item.completedDate), 'EEEE, MMMM d, yyyy')}
                                  </Box>
                                  {item.notes && (
                                    <Box component="span" sx={{ display: 'block', fontStyle: 'italic' }}>
                                      "{item.notes}"
                                    </Box>
                                  )}
                                </React.Fragment>
                              }
                            />
                            <ListItemSecondaryAction>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                                <Chip 
                                  size="small" 
                                  label={`Ages ${item.activity.ageRange?.min}-${item.activity.ageRange?.max}`}
                                  icon={<ChildCareIcon fontSize="small" />}
                                />
                                <Chip 
                                  size="small" 
                                  label={`${item.activity.timeRequired} min`}
                                  icon={<AccessTimeIcon fontSize="small" />}
                                />
                              </Box>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default HistoryPage;