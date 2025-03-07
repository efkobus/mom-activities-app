import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getChildren, addChild, updateChild, deleteChild } from '../utils/api';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const interests = [
  'Animals', 'Art', 'Books', 'Cooking', 'Dancing', 'Drawing', 'Games', 
  'Music', 'Nature', 'Numbers', 'Outdoors', 'Science', 'Sports', 'Vehicles'
];

const developmentalAreas = [
  'Cognitive', 'Language', 'Motor', 'Social', 'Emotional', 'Sensory', 'Creative'
];

const ChildrenPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentChild, setCurrentChild] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Form state
  const [childFormData, setChildFormData] = useState({
    name: '',
    birthdate: '',
    interests: [],
    developmentalFocus: []
  });

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await getChildren();
      setChildren(response || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch children:', err);
      setError('Failed to load children profiles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildFormData({
      ...childFormData,
      [name]: value
    });
  };

  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    setChildFormData({
      ...childFormData,
      [name]: typeof value === 'string' ? value.split(',') : value
    });
  };

  const handleOpenDialog = (child = null) => {
    if (child) {
      // Format date for the input field (YYYY-MM-DD)
      const birthdate = child.birthdate ? new Date(child.birthdate).toISOString().split('T')[0] : '';
      setChildFormData({
        name: child.name || '',
        birthdate: birthdate,
        interests: child.interests || [],
        developmentalFocus: child.developmentalFocus || []
      });
      setCurrentChild(child);
    } else {
      setChildFormData({
        name: '',
        birthdate: '',
        interests: [],
        developmentalFocus: []
      });
      setCurrentChild(null);
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setCurrentChild(null);
  };

  const handleSaveChild = async () => {
    try {
      setLoading(true);

      const childData = {
        ...childFormData,
        birthdate: new Date(childFormData.birthdate).toISOString()
      };

      let response;
      if (currentChild) {
        // Update existing child
        response = await updateChild(currentChild._id, childData);
        setNotification({
          open: true,
          message: `${childFormData.name}'s profile has been updated`,
          severity: 'success'
        });
      } else {
        // Add new child
        response = await addChild(childData);
        setNotification({
          open: true,
          message: `${childFormData.name} has been added`,
          severity: 'success'
        });
      }

      handleCloseDialog();
      fetchChildren();
    } catch (err) {
      console.error('Failed to save child:', err);
      setNotification({
        open: true,
        message: `Error: ${err.response?.data?.message || 'Failed to save. Please try again.'}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChild = async (childId) => {
    if (window.confirm('Are you sure you want to delete this child profile? This action cannot be undone.')) {
      try {
        setLoading(true);
        await deleteChild(childId);
        fetchChildren();
        setNotification({
          open: true,
          message: 'Child profile has been deleted',
          severity: 'success'
        });
      } catch (err) {
        console.error('Failed to delete child:', err);
        setNotification({
          open: true,
          message: `Error: ${err.response?.data?.message || 'Failed to delete. Please try again.'}`,
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // For babies less than 1 year old
    if (age === 0) {
      const monthAge = today.getMonth() - birthDate.getMonth() + 
        (today.getDate() < birthDate.getDate() ? -1 : 0);
      return monthAge === 1 ? '1 month' : `${monthAge} months`;
    }
    
    return age === 1 ? '1 year' : `${age} years`;
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading && children.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Children Profiles</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Child
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {children.length === 0 && !loading ? (
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            No children profiles found. Add your first child to get started.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Your First Child
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {children.map((child) => (
            <Grid item xs={12} sm={6} md={4} key={child._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {child.birthdate && calculateAge(child.birthdate)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Born: {child.birthdate && new Date(child.birthdate).toLocaleDateString()}
                  </Typography>

                  {child.interests && child.interests.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                        Interests:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {child.interests.map((interest, index) => (
                          <Chip key={index} label={interest} size="small" />
                        ))}
                      </Box>
                    </>
                  )}

                  {child.developmentalFocus && child.developmentalFocus.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                        Developmental Focus:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {child.developmentalFocus.map((focus, index) => (
                          <Chip 
                            key={index} 
                            label={focus} 
                            size="small"
                            color="primary" 
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </>
                  )}
                </CardContent>
                <Divider />
                <CardActions>
                  <Button 
                    startIcon={<EditIcon />} 
                    size="small"
                    onClick={() => handleOpenDialog(child)}
                  >
                    Edit
                  </Button>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => handleDeleteChild(child._id)}
                    sx={{ ml: 'auto' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Child Dialog */}
      <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentChild ? `Edit ${currentChild.name}'s Profile` : 'Add New Child'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={childFormData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Birth Date"
              name="birthdate"
              type="date"
              value={childFormData.birthdate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="interests-label">Interests</InputLabel>
              <Select
                labelId="interests-label"
                multiple
                name="interests"
                value={childFormData.interests}
                onChange={handleMultiSelectChange}
                input={<OutlinedInput label="Interests" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {interests.map((interest) => (
                  <MenuItem key={interest} value={interest.toLowerCase()}>
                    {interest}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="developmental-focus-label">Developmental Focus</InputLabel>
              <Select
                labelId="developmental-focus-label"
                multiple
                name="developmentalFocus"
                value={childFormData.developmentalFocus}
                onChange={handleMultiSelectChange}
                input={<OutlinedInput label="Developmental Focus" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {developmentalAreas.map((area) => (
                  <MenuItem key={area} value={area.toLowerCase()}>
                    {area}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveChild} 
            variant="contained" 
            disabled={!childFormData.name || !childFormData.birthdate}
          >
            {loading ? <CircularProgress size={24} /> : (currentChild ? 'Update' : 'Add')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChildrenPage;