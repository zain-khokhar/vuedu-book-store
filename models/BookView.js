import mongoose from 'mongoose';

const bookViewSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // nullable
  session_id: { type: String }, // nullable
  created_at: { type: Date, default: Date.now }
});

// Ensure unique views per user or per session
bookViewSchema.index({ book_id: 1, user_id: 1 }, { unique: true, sparse: true });
bookViewSchema.index({ book_id: 1, session_id: 1 }, { unique: true, sparse: true });

export default mongoose.models.BookView || mongoose.model('BookView', bookViewSchema);
