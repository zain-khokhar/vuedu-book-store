import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ book }) {
  const {
    _id,
    title,
    courseCode,
    category,
    price,
    condition,
    images,
    seller,
    views,
    createdAt
  } = book;

  const getCategoryColor = (category) => {
    const colors = {
      CS: 'bg-blue-100 text-blue-800',
      MGT: 'bg-green-100 text-green-800',
      MTH: 'bg-purple-100 text-purple-800',
      EDU: 'bg-yellow-100 text-yellow-800',
      ENG: 'bg-pink-100 text-pink-800',
      ECO: 'bg-indigo-100 text-indigo-800',
      PSY: 'bg-red-100 text-red-800',
      SOC: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getConditionColor = (condition) => {
    const colors = {
      'new': 'bg-emerald-100 text-emerald-800',
      'like-new': 'bg-green-100 text-green-800',
      'good': 'bg-yellow-100 text-yellow-800',
      'fair': 'bg-orange-100 text-orange-800',
    };
    return colors[condition] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/books/${_id}`}>
      <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        {/* Image Section */}
        <div className="aspect-4/3 bg-gray-100 relative overflow-hidden">
          {images && images.length > 0 ? (
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-xs text-gray-500">No Image</p>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>

          {/* Condition Badge */}
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(condition)}`}>
              {condition}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Course Code */}
          <div className="mb-2">
            <span className="text-xs font-mono font-semibold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">
              {courseCode}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Price */}
          <div className="mb-3">
            <span className="text-lg font-bold text-green-600">
              Rs. {price.toLocaleString()}
            </span>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {seller?.name}
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {views || 0}
            </span>
          </div>

          {/* Date */}
          <div className="text-xs text-gray-400">
            Listed {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}