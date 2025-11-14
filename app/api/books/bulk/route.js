import dbConnect from '../../../../lib/mongodb.js';
import Book from '../../../../models/Book.js';
import { authMiddleware } from '../../../../lib/auth.js';

export async function POST(request) {
  try {
    console.log('Bulk upload API called');
    
    const authResult = await authMiddleware(request);
    console.log('Auth result:', authResult);
    
    if (authResult.error) {
      console.error('Auth error:', authResult.error);
      return Response.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;
    if (user.role !== 'seller') {
      return Response.json(
        { success: false, error: 'Only sellers can upload books' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    const { books } = await request.json();
    
    if (!Array.isArray(books) || books.length === 0) {
      return Response.json(
        { success: false, error: 'Please provide an array of books' },
        { status: 400 }
      );
    }

    if (books.length > 200) {
      return Response.json(
        { success: false, error: 'Maximum 200 books allowed per upload' },
        { status: 400 }
      );
    }

    const processedBooks = books.map(book => {
      const categoryPrefix = book.courseCode.substring(0, 3).toUpperCase();
      return {
        ...book,
        category: categoryPrefix,
        seller: user._id,
        courseCode: book.courseCode.toLowerCase()
      };
    });

    const createdBooks = await Book.insertMany(processedBooks, {
      ordered: false
    });

    const populatedBooks = await Book.find({
      _id: { $in: createdBooks.map(book => book._id) }
    }).populate('seller', 'name email phone whatsapp');

    return Response.json({
      success: true,
      data: {
        totalCreated: createdBooks.length,
        books: populatedBooks
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Bulk upload error:', error);
    
    if (error.name === 'BulkWriteError') {
      const successCount = error.result.insertedCount;
      const failedCount = error.writeErrors.length;
      
      return Response.json({
        success: false,
        error: `Bulk upload partially failed. ${successCount} books created, ${failedCount} failed.`,
        details: error.writeErrors.map(err => ({
          index: err.index,
          error: err.errmsg
        }))
      }, { status: 207 });
    }

    return Response.json(
      { success: false, error: error.message || 'Bulk upload failed' },
      { status: 400 }
    );
  }
}