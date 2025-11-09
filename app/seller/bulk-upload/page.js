'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import LoadingSpinner from '../../../components/LoadingSpinner';

const EXAMPLE_JSON = [
  {
    "title": "Introduction to Computer Science",
    "courseCode": "cs101",
    "price": 1500,
    "description": "Comprehensive textbook covering fundamentals of computer science. Excellent condition with minimal highlighting. Perfect for CS101 students.",
    "condition": "good",
    "author": "John Smith",
    "edition": "5th Edition",
    "isbn": "978-0123456789",
    "semester": "Fall 2024",
    "tags": ["programming", "computer science", "textbook"]
  },
  {
    "title": "Mathematics for Computer Science",
    "courseCode": "mth101",
    "price": 1200,
    "description": "Essential mathematics concepts for computer science students. Clean pages with no markings. Includes all chapters and exercises.",
    "condition": "like-new",
    "author": "Jane Doe",
    "edition": "3rd Edition",
    "isbn": "978-0987654321",
    "semester": "Spring 2024",
    "tags": ["mathematics", "algorithms", "discrete math"]
  },
  {
    "title": "Business Management Principles",
    "courseCode": "mgt101",
    "price": 1000,
    "description": "Core management concepts and principles. Some highlighting but very readable. Great resource for MGT101.",
    "condition": "good",
    "author": "Robert Johnson",
    "edition": "2nd Edition",
    "isbn": "978-0456789123",
    "semester": "Fall 2023",
    "tags": ["management", "business", "principles"]
  }
];

export default function BulkUploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState('');
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'seller') {
      router.push('/');
      return;
    }

    setUser(parsedUser);
  }, [router]);

  const validateJSON = (data) => {
    try {
      const books = JSON.parse(data);
      
      if (!Array.isArray(books)) {
        return { isValid: false, error: 'JSON must be an array of books' };
      }

      if (books.length === 0) {
        return { isValid: false, error: 'Array cannot be empty' };
      }

      if (books.length > 200) {
        return { isValid: false, error: 'Maximum 200 books allowed per upload' };
      }

      // Validate each book
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const requiredFields = ['title', 'courseCode', 'price', 'description', 'condition'];
        
        for (const field of requiredFields) {
          if (!book[field]) {
            return { 
              isValid: false, 
              error: `Book ${i + 1}: Missing required field '${field}'` 
            };
          }
        }

        if (typeof book.price !== 'number' || book.price <= 0) {
          return { 
            isValid: false, 
            error: `Book ${i + 1}: Price must be a positive number` 
          };
        }

        if (!['new', 'like-new', 'good', 'fair'].includes(book.condition)) {
          return { 
            isValid: false, 
            error: `Book ${i + 1}: Invalid condition. Must be one of: new, like-new, good, fair` 
          };
        }
      }

      return { isValid: true, books };
    } catch (error) {
      return { isValid: false, error: 'Invalid JSON format' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jsonData.trim()) {
      setErrors({ submit: 'Please enter JSON data' });
      return;
    }

    const validation = validateJSON(jsonData);
    if (!validation.isValid) {
      setErrors({ submit: validation.error });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/books/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ books: validation.books })
      });

      const result = await response.json();

      if (result.success) {
        alert(`Successfully uploaded ${result.data.totalCreated} books!`);
        router.push('/seller');
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to upload books. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setJsonData(JSON.stringify(EXAMPLE_JSON, null, 2));
    setShowExample(false);
    setErrors({});
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bulk Upload Books</h1>
            <p className="text-lg text-gray-600">
              Upload multiple books at once using JSON format. Perfect for sellers with large inventories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
              
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Required Fields:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><code className="bg-gray-100 px-1 rounded">title</code> - Book title</li>
                    <li><code className="bg-gray-100 px-1 rounded">courseCode</code> - VU course code (e.g., "cs101")</li>
                    <li><code className="bg-gray-100 px-1 rounded">price</code> - Price in PKR (number)</li>
                    <li><code className="bg-gray-100 px-1 rounded">description</code> - Book description</li>
                    <li><code className="bg-gray-100 px-1 rounded">condition</code> - "new", "like-new", "good", or "fair"</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Optional Fields:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><code className="bg-gray-100 px-1 rounded">author</code> - Author name</li>
                    <li><code className="bg-gray-100 px-1 rounded">edition</code> - Book edition</li>
                    <li><code className="bg-gray-100 px-1 rounded">isbn</code> - ISBN number</li>
                    <li><code className="bg-gray-100 px-1 rounded">semester</code> - Semester info</li>
                    <li><code className="bg-gray-100 px-1 rounded">tags</code> - Array of tags</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>Limits:</strong> Maximum 200 books per upload. Each book must have valid course code from VU curriculum.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowExample(!showExample)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {showExample ? 'Hide Example' : 'Show Example JSON'}
                </button>
              </div>

              {showExample && (
                <div className="mt-4">
                  <pre className="bg-gray-50 border rounded-md p-3 text-xs overflow-x-auto">
                    {JSON.stringify(EXAMPLE_JSON, null, 2)}
                  </pre>
                  <button
                    onClick={loadExample}
                    className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Use This Example
                  </button>
                </div>
              )}
            </div>

            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="jsonData" className="block text-sm font-medium text-gray-700 mb-2">
                    JSON Data *
                  </label>
                  <textarea
                    id="jsonData"
                    value={jsonData}
                    onChange={(e) => {
                      setJsonData(e.target.value);
                      setErrors({});
                    }}
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Paste your JSON data here..."
                  />
                </div>

                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (jsonData.trim()) {
                          const validation = validateJSON(jsonData);
                          if (validation.isValid) {
                            alert(`JSON is valid! Found ${validation.books.length} books.`);
                            setErrors({});
                          } else {
                            setErrors({ submit: validation.error });
                          }
                        } else {
                          setErrors({ submit: 'Please enter JSON data first' });
                        }
                      }}
                      className="px-4 py-2 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Validate JSON
                    </button>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {loading && <LoadingSpinner size="sm" className="mr-2" />}
                      {loading ? 'Uploading...' : 'Upload Books'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}