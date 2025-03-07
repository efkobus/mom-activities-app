const mongoose = require('mongoose');

const activityPackSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: {
    type: Number,
    required: true
  },
  coverImage: {
    type: String // URL to cover image
  },
  theme: {
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
  developmentalFocus: [{
    type: String,
    enum: ['cognitive', 'motor', 'social', 'language', 'emotional', 'creativity'],
    required: true
  }],
  activityCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
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
activityPackSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ActivityPack = mongoose.model('ActivityPack', activityPackSchema);

module.exports = ActivityPack;