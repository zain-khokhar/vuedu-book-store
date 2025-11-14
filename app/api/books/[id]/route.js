import dbConnect from '../../../../lib/mongodb.js';
import Book from '../../../../models/Book.js';
import { authMiddleware } from '../../../../lib/auth.js';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    const book = await Book.findById(id)
      .populate('seller', 'name email phone whatsapp address')
      .lean();

    if (!book) {
      return Response.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    await Book.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return Response.json({
      success: true,
      data: book
    });

  } catch (error) {
    console.error('Error fetching book:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult.error) {
      return Response.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    const { id } = await params;

    await dbConnect();
    
    const book = await Book.findById(id);
    if (!book) {
      return Response.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    if (book.seller.toString() !== user._id.toString()) {
      return Response.json(
        { success: false, error: 'Unauthorized to update this book' },
        { status: 403 }
      );
    }

    const updateData = await request.json();
    
    if (updateData.courseCode) {
      const categoryPrefix = updateData.courseCode.substring(0, 3).toUpperCase();
      updateData.category = categoryPrefix;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate('seller', 'name email phone whatsapp');

    return Response.json({
      success: true,
      data: updatedBook
    });

  } catch (error) {
    console.error('Error updating book:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to update book' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult.error) {
      return Response.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    const { id } = await params;

    await dbConnect();
    
    const book = await Book.findById(id);
    if (!book) {
      return Response.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    if (book.seller.toString() !== user._id.toString()) {
      return Response.json(
        { success: false, error: 'Unauthorized to delete this book' },
        { status: 403 }
      );
    }

    await Book.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: 'Book deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting book:', error);
    return Response.json(
      { success: false, error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}