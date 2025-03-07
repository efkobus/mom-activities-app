const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  interests: [String],
  developmentalFocus: [String]
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  children: [childSchema],
  subscription: {
    type: String,
    enum: ['free', 'premium', 'family'],
    default: 'free'
  },
  subscriptionExpiry: {
    type: Date
  },
  purchasedPacks: [{
    packId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActivityPack'
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  }],
  favoriteActivities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  activityHistory: [{
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    },
    completedDate: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;