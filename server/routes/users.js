const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// Update user profile
router.put('/profile', auth, userController.updateProfile);

// Add child profile
router.post('/children', auth, userController.addChild);

// Update child profile
router.put('/children/:id', auth, userController.updateChild);

// Delete child profile
router.delete('/children/:id', auth, userController.deleteChild);

// Get user's favorite activities
router.get('/favorites', auth, userController.getFavorites);

// Get user's activity history
router.get('/history', auth, userController.getActivityHistory);

// Update subscription
router.put('/subscription', auth, userController.updateSubscription);

// Purchase activity pack
router.post('/packs/:id/purchase', auth, userController.purchasePack);

// Get purchased packs
router.get('/packs', auth, userController.getPurchasedPacks);

module.exports = router;