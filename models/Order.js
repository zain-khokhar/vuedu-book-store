import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
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
    address: {
      type: String,
      required: true,
      trim: true
    }
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderNotes: {
    type: String,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash-on-delivery', 'bank-transfer', 'jazzcash', 'easypaisa'],
    default: 'cash-on-delivery'
  }
}, {
  timestamps: true
});

orderSchema.index({ seller: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);