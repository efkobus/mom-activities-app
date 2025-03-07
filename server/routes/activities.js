const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const { auth, premiumRequired } = require('../middleware/auth');

// Get all activities (with filtering)
router.get('/', auth, activitiesController.getActivities);

// Get single activity
router.get('/:id', auth, activitiesController.getActivity);

// Add activity to favorites
router.post('/:id/favorite', auth, activitiesController.addToFavorites);

// Remove activity from favorites
router.delete('/:id/favorite', auth, activitiesController.removeFromFavorites);

// Log completed activity
router.post('/:id/log', auth, activitiesController.logActivity);

// Get activity packs
router.get('/packs', auth, activitiesController.getActivityPacks);

// Get activities in a pack
router.get('/packs/:id', auth, activitiesController.getPackActivities);

module.exports = router;