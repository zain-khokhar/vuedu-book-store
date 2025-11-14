import mongoose from 'mongoose';
import { COURSE_CODES } from '../lib/constants.js';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  courseCode: {
    type: String,
    required: true,
    uppercase: true,
    validate: {
      validator: function(v) {
        return COURSE_CODES.includes(v.toLowerCase());
      },
      message: 'Invalid course code'
    }
  },
  category: {
    type: String,
    required: true,
    uppercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'good', 'fair'],
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  semester: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  edition: {
    type: String,
    trim: true
  },
  isbn: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

bookSchema.index({ courseCode: 1, category: 1 });
bookSchema.index({ title: 'text', description: 'text', courseCode: 'text' });
bookSchema.index({ price: 1 });
bookSchema.index({ createdAt: -1 });

export default mongoose.models.Book || mongoose.model('Book', bookSchema);