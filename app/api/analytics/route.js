import dbConnect from '../../../lib/mongodb.js';
import Book from '../../../models/Book.js';
import Order from '../../../models/Order.js';
import User from '../../../models/User.js';
import { authMiddleware } from '../../../lib/auth.js';

export async function GET(request) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult.error) {
      return Response.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    if (user.role !== 'admin') {
      return Response.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    // Get basic statistics
    const [
      totalBooks,
      totalUsers,
      totalOrders,
      totalSellers,
      totalBuyers,
      recentBooks,
      topCategories,
      recentOrders
    ] = await Promise.all([
      Book.countDocuments({ availability: true }),
      User.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'seller' }),
      User.countDocuments({ role: 'buyer' }),
      Book.find({ availability: true })
        .populate('seller', 'name email')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      Book.aggregate([
        { $match: { availability: true } },
        { $group: { _id: '$category', count: { $sum: 1 }, avgPrice: { $avg: '$price' } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Order.find()
        .populate('buyer', 'name email')
        .populate('book', 'title price')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
    ]);

    // Calculate revenue
    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

    // Get monthly statistics
    const monthlyStats = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    return Response.json({
      success: true,
      data: {
        overview: {
          totalBooks,
          totalUsers,
          totalOrders,
          totalSellers,
          totalBuyers,
          totalRevenue
        },
        recentBooks,
        topCategories,
        recentOrders,
        monthlyStats
      }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}