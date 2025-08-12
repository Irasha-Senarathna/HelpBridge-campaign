const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  Campaign_ID: {
    type: String,
    unique: true,
    index: true
  },
  Title: {
    type: String,
    required: [true, 'Campaign title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    index: true
  },
  Description: {
    type: String,
    required: [true, 'Campaign description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  Target_amount: {
    type: Number,
    required: [true, 'Target amount is required'],
    min: [1, 'Target amount must be at least 1'],
    set: v => Math.round(v * 100) / 100
  },
  Current_donation: {
    type: Number,
    default: 0,
    min: [0, 'Current donation cannot be negative'],
    set: v => Math.round(v * 100) / 100
  },
  Start_date: {
    type: Date,
    required: [true, 'Start date is required'],
    default: Date.now
  },
  End_date: {
    type: Date,
    required: [true, 'End date is required']
  },
  Status: {
    type: String,
    enum: ['Active', 'Completed', 'Paused', 'Cancelled'],
    default: 'Active',
    index: true
  },
  Product: {
    type: String,
    required: [true, 'Product type is required'],
    enum: ['Food', 'Clothing', 'Medicine', 'Education', 'Shelter', 'Other'],
    index: true
  },
  image: {
    type: String,
    default: null
  },
  Created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Simple and reliable Campaign_ID generation
campaignSchema.pre('save', async function(next) {
  try {
    // Only generate Campaign_ID for new campaigns that don't have one
    if (this.isNew && !this.Campaign_ID) {
      // Use timestamp and random string for uniqueness
      const timestamp = Date.now().toString(36).toUpperCase();
      const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase();
      this.Campaign_ID = `CAMP-${timestamp}-${randomStr}`;
      console.log('Generated Campaign_ID:', this.Campaign_ID);
    }

    // Update status based on dates
    const now = new Date();
    if (this.End_date && this.End_date <= now && this.Status === 'Active') {
      this.Status = 'Completed';
    }
    
    next();
  } catch (error) {
    console.error('Pre-save error:', error);
    // Fallback Campaign_ID generation
    if (this.isNew && !this.Campaign_ID) {
      this.Campaign_ID = `CAMP-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    }
    next();
  }
});

// Virtual for progress percentage
campaignSchema.virtual('progressPercentage').get(function() {
  if (this.Target_amount <= 0) return 0;
  const percentage = (this.Current_donation / this.Target_amount) * 100;
  return Math.min(Math.round(percentage * 100) / 100, 100);
});

// Virtual for days remaining
campaignSchema.virtual('daysRemaining').get(function() {
  if (this.Status !== 'Active') return 0;
  
  const now = new Date();
  const end = new Date(this.End_date);
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

// Text index for search functionality
campaignSchema.index({
  Title: 'text',
  Description: 'text'
}, {
  weights: {
    Title: 3,
    Description: 1
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);