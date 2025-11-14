'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { DataLoader } from '../../../components/LoadingSpinner';
import Link from 'next/link';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    orderNotes: '',
    paymentMethod: 'cash-on-delivery'
  });

  useEffect(() => {
    if (params?.id) {
      fetchBook();
    }
  }, [params?.id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}`);
      if (response.ok) {
        const result = await response.json();
        setBook(result.data);
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Error fetching book:', error);
      router.push('/404');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer: orderData,
          bookId: book._id,
          quantity: 1,
          paymentMethod: orderData.paymentMethod
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Order placed successfully! Both you and the seller have been notified via email.');
        setShowOrderForm(false);
        setOrderData({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          address: '',
          orderNotes: '',
          paymentMethod: 'cash-on-delivery'
        });
      } else {
        alert('Failed to place order: ' + result.error);
      }
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <DataLoader text="Loading book details..." />
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Return to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="text-blue-600 hover:text-blue-700">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/books" className="text-blue-600 hover:text-blue-700">Books</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600">{book.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Code Display */}
            <div className="lg:col-span-1">
              <div className="aspect-3/4 bg-gray-100 rounded-lg overflow-hidden relative flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-700">{book.courseCode.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Title and Badges */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(book.category)}`}>
                      {book.category}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(book.condition)}`}>
                      {book.condition}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 font-mono">
                      {book.courseCode.toUpperCase()}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  
                  {book.author && (
                    <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
                  )}
                  
                  <div className="text-3xl font-bold text-green-600 mb-6">
                    Rs. {book.price.toLocaleString()}
                  </div>
                </div>

                {/* Book Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {book.edition && (
                      <div>
                        <span className="font-medium text-gray-700">Edition:</span>
                        <span className="ml-2 text-gray-600">{book.edition}</span>
                      </div>
                    )}
                    {book.isbn && (
                      <div>
                        <span className="font-medium text-gray-700">ISBN:</span>
                        <span className="ml-2 text-gray-600">{book.isbn}</span>
                      </div>
                    )}
                    {book.semester && (
                      <div>
                        <span className="font-medium text-gray-700">Semester:</span>
                        <span className="ml-2 text-gray-600">{book.semester}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700">Views:</span>
                      <span className="ml-2 text-gray-600">{book.views || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{book.description}</p>
                </div>

                {/* Tags */}
                {book.tags && book.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seller Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-600">{book.seller.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">{book.seller.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-600">{book.seller.phone}</span>
                    </div>
                    {book.seller.whatsapp && (
                      <div>
                        <span className="font-medium text-gray-700">WhatsApp:</span>
                        <span className="ml-2 text-gray-600">{book.seller.whatsapp}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Order This Book
                  </button>
                  <a
                    href={`tel:${book.seller.phone}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
                  >
                    Call Seller
                  </a>
                  {book.seller.whatsapp && (
                    <a
                      href={`https://wa.me/${book.seller.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Order Book</h3>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={orderData.name}
                    onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={orderData.email}
                    onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={orderData.phone}
                    onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    value={orderData.whatsapp}
                    onChange={(e) => setOrderData({...orderData, whatsapp: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <textarea
                    required
                    rows={3}
                    value={orderData.address}
                    onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                  <textarea
                    rows={2}
                    value={orderData.orderNotes}
                    onChange={(e) => setOrderData({...orderData, orderNotes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special instructions..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cash-on-delivery"
                        checked={orderData.paymentMethod === 'cash-on-delivery'}
                        onChange={(e) => setOrderData({...orderData, paymentMethod: e.target.value})}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                        Cash on Delivery (COD)
                      </label>
                    </div>
                    
                    {book?.seller?.easypaisa && (
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="easypaisa"
                          name="paymentMethod"
                          value="easypaisa"
                          checked={orderData.paymentMethod === 'easypaisa'}
                          onChange={(e) => setOrderData({...orderData, paymentMethod: e.target.value})}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="easypaisa" className="ml-3 block text-sm font-medium text-gray-700">
                          Easypaisa ({book.seller.easypaisa})
                        </label>
                      </div>
                    )}
                    
                    {book?.seller?.jazzcash && (
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="jazzcash"
                          name="paymentMethod"
                          value="jazzcash"
                          checked={orderData.paymentMethod === 'jazzcash'}
                          onChange={(e) => setOrderData({...orderData, paymentMethod: e.target.value})}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="jazzcash" className="ml-3 block text-sm font-medium text-gray-700">
                          JazzCash ({book.seller.jazzcash})
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {orderData.paymentMethod !== 'cash-on-delivery' && (
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Send payment to the seller's {orderData.paymentMethod} account and confirm with them before delivery.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOrderForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={orderLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
                  >
                    {orderLoading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}