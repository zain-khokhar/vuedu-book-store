import Link from 'next/link';

export default function BookCard({ book }) {
  const {
    _id,
    title,
    courseCode,
    category,
    price,
    condition,
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
        {/* Course Code Section */}
        <div className="aspect-4/3 bg-blue-900 relative overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <span className="text-2xl font-bold text-white ">{courseCode}</span>
          </div>
          
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
              {Math.floor(views) || 0}
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