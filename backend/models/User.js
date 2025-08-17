const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  user_type: {
    type: String,
    enum: ['donor', 'recipient', 'admin'],
    default: 'donor'
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profile_image: {
    type: String,
    default: null
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  verification_token: String,
  reset_password_token: String,
  reset_password_expires: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate verification token
userSchema.methods.generateVerificationToken = function() {
  const crypto = require('crypto');
  this.verification_token = crypto.randomBytes(32).toString('hex');
  return this.verification_token;
};

// Generate reset password token
userSchema.methods.generateResetPasswordToken = function() {
  const crypto = require('crypto');
  this.reset_password_token = crypto.randomBytes(32).toString('hex');
  this.reset_password_expires = Date.now() + 3600000; // 1 hour
  return this.reset_password_token;
};

module.exports = mongoose.model('User', userSchema);