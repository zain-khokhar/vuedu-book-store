import dbConnect from '../../../../../lib/mongodb.js';
import Book from '../../../../../models/Book.js';
import BookView from '../../../../../models/BookView.js';
import { authMiddleware } from '../../../../../lib/auth.js';

export async function POST(request, { params }) {
  await dbConnect();
  const { id: bookId } = await params;
  let userId = null;
  let sessionId = null;

  // Get user from auth
  const authResult = await authMiddleware(request);
  if (authResult && authResult.user) {
    userId = authResult.user._id;
  }

  // Get session_id from body
  const body = await request.json();
  sessionId = body.session_id;

  // Check if already viewed
  let alreadyViewed = false;
  if (userId) {
    alreadyViewed = await BookView.exists({ book_id: bookId, user_id: userId });
  } else if (sessionId) {
    alreadyViewed = await BookView.exists({ book_id: bookId, session_id: sessionId });
  }

  if (alreadyViewed) {
    return Response.json({ success: true, alreadyViewed: true });
  }

  // Create view record
  await BookView.create({
    book_id: bookId,
    user_id: userId || undefined,
    session_id: sessionId || undefined
  });

  // Increment book views
  await Book.findByIdAndUpdate(bookId, { $inc: { views: 1 } });

  return Response.json({ success: true, alreadyViewed: false });
}
