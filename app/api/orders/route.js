import dbConnect from '../../../lib/mongodb.js';
import Order from '../../../models/Order.js';
import Book from '../../../models/Book.js';
import User from '../../../models/User.js';
import { sendOrderNotification } from '../../../lib/email.js';

export async function POST(request) {
  try {
    await dbConnect();
    
    const orderData = await request.json();
    const { buyer, bookId, quantity = 1, orderNotes, paymentMethod } = orderData;

    if (!buyer.name || !buyer.email || !buyer.phone || !buyer.address) {
      return Response.json(
        { success: false, error: 'Please provide all buyer details' },
        { status: 400 }
      );
    }

    const book = await Book.findById(bookId).populate('seller');
    if (!book) {
      return Response.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    if (!book.availability) {
      return Response.json(
        { success: false, error: 'This book is no longer available' },
        { status: 400 }
      );
    }

    const totalPrice = book.price * quantity;

    const order = new Order({
      buyer,
      book: bookId,
      seller: book.seller._id,
      quantity,
      totalPrice,
      orderNotes,
      paymentMethod: paymentMethod || 'cash-on-delivery'
    });

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('book')
      .populate('seller', 'name email phone whatsapp');

    const emailData = {
      buyer: buyer,
      seller: populatedOrder.seller,
      book: populatedOrder.book,
      orderId: populatedOrder._id.toString(),
      totalPrice
    };

    const emailResult = await sendOrderNotification(emailData);
    
    if (!emailResult.success) {
      console.error('Email notification failed:', emailResult.error);
    }

    return Response.json({
      success: true,
      data: populatedOrder,
      emailSent: emailResult.success
    }, { status: 201 });

  } catch (error) {
    console.error('Order creation error:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 400 }
    );
  }
}