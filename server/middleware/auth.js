const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Middleware to check if user has premium subscription
const premiumRequired = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (req.user.subscription === 'free') {
      return res.status(403).json({ message: 'Premium subscription required' });
    }
    
    // Check if subscription is expired
    if (req.user.subscriptionExpiry && new Date(req.user.subscriptionExpiry) < new Date()) {
      return res.status(403).json({ message: 'Subscription expired' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { auth, premiumRequired };