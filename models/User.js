import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  whatsapp: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['seller', 'buyer'],
    default: 'buyer'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    trim: true
  },
  easypaisa: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        // Only validate if easypaisa is provided
        return !v || /^03\d{9}$/.test(v);
      },
      message: 'Easypaisa number must be 11 digits starting with 03'
    }
  },
  jazzcash: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        // Only validate if jazzcash is provided
        return !v || /^03\d{9}$/.test(v);
      },
      message: 'JazzCash number must be 11 digits starting with 03'
    }
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);