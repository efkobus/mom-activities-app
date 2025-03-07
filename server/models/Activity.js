const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  ageRange: {
    min: { 
      type: Number, 
      required: true 
    },
    max: { 
      type: Number, 
      required: true 
    }
  },
  timeRequired: {
    type: Number, // in minutes
    required: true
  },
  materials: [{
    type: String
  }],
  steps: [{
    type: String,
    required: true
  }],
  images: [{
    type: String // URLs to images
  }],
  developmentalAreas: [{
    type: String,
    enum: ['cognitive', 'motor', 'social', 'language', 'emotional', 'creativity'],
    required: true
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  packId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActivityPack',
    default: null
  },
  tags: [{
    type: String
  }],
  popularity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
activitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create text indexes for search functionality
activitySchema.index({ 
  title: 'text', 
  description: 'text', 
  tags: 'text',
  materials: 'text'
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;