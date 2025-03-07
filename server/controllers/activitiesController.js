const Activity = require('../models/Activity');
const ActivityPack = require('../models/ActivityPack');
const User = require('../models/User');

// Get all activities (with filtering)
exports.getActivities = async (req, res) => {
  try {
    const {
      ageMin,
      ageMax,
      developmentalAreas,
      timeMax,
      materials,
      difficulty,
      search,
      page = 1,
      limit = 10
    } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by age range
    if (ageMin || ageMax) {
      query.ageRange = {};
      if (ageMin) query.ageRange.max = { $gte: parseInt(ageMin) };
      if (ageMax) query.ageRange.min = { $lte: parseInt(ageMax) };
    }
    
    // Filter by developmental areas
    if (developmentalAreas) {
      const areas = developmentalAreas.split(',');
      query.developmentalAreas = { $in: areas };
    }
    
    // Filter by time required
    if (timeMax) {
      query.timeRequired = { $lte: parseInt(timeMax) };
    }
    
    // Filter by materials
    if (materials) {
      const materialsList = materials.split(',');
      query.materials = { $all: materialsList };
    }
    
    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Check if user is premium
    const isPremium = req.user && req.user.subscription !== 'free';
    
    // If not premium, only show free activities
    if (!isPremium) {
      query.isPremium = false;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get activities
    const activities = await Activity.find(query)
      .sort({ popularity: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Activity.countDocuments(query);
    
    res.json({
      activities,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single activity
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    // Check if activity is premium and user has access
    if (activity.isPremium) {
      const isPremium = req.user && req.user.subscription !== 'free';
      const hasPurchasedPack = req.user && activity.packId && 
        req.user.purchasedPacks.some(pack => 
          pack.packId.toString() === activity.packId.toString());
      
      if (!isPremium && !hasPurchasedPack) {
        return res.status(403).json({ message: 'Premium subscription required' });
      }
    }
    
    // Increment popularity
    activity.popularity += 1;
    await activity.save();
    
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add activity to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const activityId = req.params.id;
    
    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    // Check if already in favorites
    if (req.user.favoriteActivities.includes(activityId)) {
      return res.status(400).json({ message: 'Activity already in favorites' });
    }
    
    // Add to favorites
    req.user.favoriteActivities.push(activityId);
    await req.user.save();
    
    res.json({ message: 'Activity added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove activity from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const activityId = req.params.id;
    
    // Remove from favorites
    req.user.favoriteActivities = req.user.favoriteActivities
      .filter(id => id.toString() !== activityId);
    
    await req.user.save();
    
    res.json({ message: 'Activity removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Log completed activity
exports.logActivity = async (req, res) => {
  try {
    const { notes } = req.body;
    const activityId = req.params.id;
    
    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    // Add to activity history
    req.user.activityHistory.push({
      activity: activityId,
      completedDate: new Date(),
      notes
    });
    
    await req.user.save();
    
    res.json({ message: 'Activity logged successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get activity packs
exports.getActivityPacks = async (req, res) => {
  try {
    const packs = await ActivityPack.find({ isActive: true });
    res.json(packs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get activities in a pack
exports.getPackActivities = async (req, res) => {
  try {
    const packId = req.params.id;
    
    // Check if pack exists
    const pack = await ActivityPack.findById(packId);
    if (!pack) {
      return res.status(404).json({ message: 'Activity pack not found' });
    }
    
    // Check if user has purchased this pack
    const hasPurchased = req.user && req.user.purchasedPacks.some(
      p => p.packId.toString() === packId
    );
    
    // If premium content and user hasn't purchased
    if (!hasPurchased && req.user.subscription === 'free') {
      return res.status(403).json({ message: 'Purchase required to access this pack' });
    }
    
    // Get activities in this pack
    const activities = await Activity.find({ packId });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};