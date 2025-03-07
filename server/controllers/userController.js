const User = require('../models/User');
const Activity = require('../models/Activity');
const ActivityPack = require('../models/ActivityPack');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Update user
    req.user.name = name || req.user.name;
    req.user.email = email || req.user.email;
    
    await req.user.save();
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add child profile
exports.addChild = async (req, res) => {
  try {
    const { name, birthdate, interests, developmentalFocus } = req.body;
    
    // Validate required fields
    if (!name || !birthdate) {
      return res.status(400).json({ message: 'Name and birthdate are required' });
    }
    
    // Add child to user
    req.user.children.push({
      name,
      birthdate: new Date(birthdate),
      interests: interests || [],
      developmentalFocus: developmentalFocus || []
    });
    
    await req.user.save();
    
    res.status(201).json({
      message: 'Child profile added successfully',
      child: req.user.children[req.user.children.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update child profile
exports.updateChild = async (req, res) => {
  try {
    const { name, birthdate, interests, developmentalFocus } = req.body;
    const childId = req.params.id;
    
    // Find child
    const child = req.user.children.id(childId);
    if (!child) {
      return res.status(404).json({ message: 'Child profile not found' });
    }
    
    // Update child
    child.name = name || child.name;
    child.birthdate = birthdate ? new Date(birthdate) : child.birthdate;
    child.interests = interests || child.interests;
    child.developmentalFocus = developmentalFocus || child.developmentalFocus;
    
    await req.user.save();
    
    res.json({
      message: 'Child profile updated successfully',
      child
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete child profile
exports.deleteChild = async (req, res) => {
  try {
    const childId = req.params.id;
    
    // Find child
    const child = req.user.children.id(childId);
    if (!child) {
      return res.status(404).json({ message: 'Child profile not found' });
    }
    
    // Remove child
    child.remove();
    await req.user.save();
    
    res.json({ message: 'Child profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's favorite activities
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Activity.find({
      _id: { $in: req.user.favoriteActivities }
    });
    
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's activity history
exports.getActivityHistory = async (req, res) => {
  try {
    // Populate activity details
    await req.user.populate('activityHistory.activity');
    
    res.json(req.user.activityHistory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update subscription
exports.updateSubscription = async (req, res) => {
  try {
    const { subscription, expiryDate } = req.body;
    
    // Validate subscription type
    if (!['free', 'premium', 'family'].includes(subscription)) {
      return res.status(400).json({ message: 'Invalid subscription type' });
    }
    
    // Update subscription
    req.user.subscription = subscription;
    
    if (expiryDate) {
      req.user.subscriptionExpiry = new Date(expiryDate);
    } else if (subscription !== 'free') {
      // Set default expiry to 1 month from now
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1);
      req.user.subscriptionExpiry = expiry;
    }
    
    await req.user.save();
    
    res.json({
      message: 'Subscription updated successfully',
      subscription: req.user.subscription,
      expiryDate: req.user.subscriptionExpiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Purchase activity pack
exports.purchasePack = async (req, res) => {
  try {
    const packId = req.params.id;
    
    // Check if pack exists
    const pack = await ActivityPack.findById(packId);
    if (!pack) {
      return res.status(404).json({ message: 'Activity pack not found' });
    }
    
    // Check if already purchased
    const alreadyPurchased = req.user.purchasedPacks.some(
      p => p.packId.toString() === packId
    );
    
    if (alreadyPurchased) {
      return res.status(400).json({ message: 'Pack already purchased' });
    }
    
    // Add to purchased packs
    req.user.purchasedPacks.push({
      packId,
      purchaseDate: new Date()
    });
    
    await req.user.save();
    
    res.json({
      message: 'Activity pack purchased successfully',
      pack: {
        id: pack._id,
        title: pack.title,
        purchaseDate: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get purchased packs
exports.getPurchasedPacks = async (req, res) => {
  try {
    // Populate pack details
    await req.user.populate('purchasedPacks.packId');
    
    const packs = req.user.purchasedPacks.map(pack => ({
      id: pack.packId._id,
      title: pack.packId.title,
      description: pack.packId.description,
      coverImage: pack.packId.coverImage,
      purchaseDate: pack.purchaseDate
    }));
    
    res.json(packs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};