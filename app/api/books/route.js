import dbConnect from '../../../lib/mongodb.js';
import Book from '../../../models/Book.js';
import User from '../../../models/User.js';
import { authMiddleware } from '../../../lib/auth.js';
import { CATEGORIES } from '../../../lib/constants.js';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const courseCode = searchParams.get('courseCode') || '';
    const condition = searchParams.get('condition') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const query = { availability: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } },
        { publisher: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) {
      query.category = category.toUpperCase();
    }

    if (courseCode) {
      query.courseCode = courseCode.toUpperCase();
    }

    if (condition) {
      query.condition = condition;
    }

    // Enhanced price filtering
    if (minPrice !== null && minPrice !== '' || maxPrice !== null && maxPrice !== '') {
      query.price = {};
      if (minPrice !== null && minPrice !== '') {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice !== null && maxPrice !== '') {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    const sortOptions = {};
    // Support for views sorting
    if (sortBy === 'views') {
      sortOptions.views = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const skip = (page - 1) * limit;

    const [books, totalCount] = await Promise.all([
      Book.find(query)
        .populate('seller', 'name email phone whatsapp')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Book.countDocuments(query)
    ]);

    // Increment view count for analytics (but don't wait for it)
    if (books.length > 0 && !search) {
      const bookIds = books.map(book => book._id);
        Book.updateMany(
          { _id: { $in: bookIds } },
          { $inc: { views: 1 } }
        ).catch(console.error);
    }

    const totalPages = Math.ceil(totalCount / limit);

    return Response.json({
      success: true,
      data: {
        books,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          search,
          category,
          courseCode,
          condition,
          minPrice,
          maxPrice,
          sortBy,
          sortOrder
        }
      }
    });

  } catch (error) {
    console.error('Error fetching books:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult.error) {
      return Response.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    if (user.role !== 'seller') {
      return Response.json(
        { success: false, error: 'Only sellers can add books' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    const bookData = await request.json();
    
    const categoryPrefix = bookData.courseCode.substring(0, 3).toUpperCase();
    bookData.category = categoryPrefix;
    bookData.seller = user._id;

    const book = new Book(bookData);
    await book.save();

    const populatedBook = await Book.findById(book._id)
      .populate('seller', 'name email phone whatsapp')
      .lean();

    return Response.json({
      success: true,
      data: populatedBook
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating book:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to create book' },
      { status: 400 }
    );
  }
}