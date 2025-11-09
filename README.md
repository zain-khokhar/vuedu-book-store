# VUEDU BOOK BANK

A modern, responsive bookstore application for Virtual University students to buy and sell hardcopy textbooks across Pakistan.

## 🌟 Features

### Core Functionality
- **📚 Book Marketplace**: Buy and sell hardcopy books for all VU subjects
- **🔍 Advanced Search**: Fast, optimized search across 377+ course codes
- **📱 Mobile Responsive**: Ultra-smooth, 100% mobile-responsive design
- **👥 User Management**: Separate buyer and seller accounts with JWT authentication
- **📧 Email Notifications**: Automatic notifications for both buyers and sellers

### For Sellers
- **📝 Single Book Upload**: Easy form-based book listing
- **📦 Bulk Upload**: Upload 100+ books using JSON format
- **📊 Book Management**: Edit, update, and manage book listings
- **💰 Direct Contact**: Direct communication with buyers

### For Buyers
- **🛒 Easy Ordering**: Simple order placement with contact details
- **📞 Direct Communication**: Phone, WhatsApp, and email contact with sellers
- **🔄 Real-time Updates**: Email notifications for order status

## 🎨 Design Features

- **Modern UI**: Clean, professional design appealing to students
- **Fast Performance**: Optimized for speed and smooth user experience
- **Professional Loaders**: Loading states for initial load and heavy data operations
- **Custom 404 Page**: Professional error handling
- **Category Organization**: Books organized by VU departments (CS, MGT, MTH, etc.)

## 🏗️ Technical Stack

- **Frontend**: Next.js 16.0.1, React 19.2.0, Tailwind CSS 4
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: JWT-based authentication system
- **Email Service**: Nodemailer with Gmail SMTP
- **Database**: MongoDB with optimized indexing

## 📋 Course Code Support

The system supports all 377+ VU course codes across categories:
- **CS**: Computer Science
- **MGT**: Management Sciences  
- **MTH**: Mathematics
- **EDU**: Education
- **ENG**: English
- **ECO**: Economics
- **PSY**: Psychology
- **And many more...**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Gmail account for email notifications

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/vuedu-book-bank
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key
   
   # Email Configuration
   MY_EMAIL=your-email@gmail.com
   MY_EMAIL_PASS=your-app-password
   
   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
book-store/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── books/         # Book management endpoints
│   │   ├── categories/    # Category endpoints
│   │   └── orders/        # Order management endpoints
│   ├── auth/              # Authentication pages
│   ├── books/             # Book-related pages
│   ├── seller/            # Seller dashboard pages
│   ├── layout.js          # Root layout
│   ├── page.js            # Homepage
│   └── not-found.js       # 404 page
├── components/            # Reusable components
├── docs/                  # Documentation
├── lib/                   # Utility libraries
├── models/                # MongoDB models
└── public/                # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get books with filtering/search
- `POST /api/books` - Create new book (sellers only)
- `GET /api/books/[id]` - Get book details
- `PUT /api/books/[id]` - Update book (owner only)
- `DELETE /api/books/[id]` - Delete book (owner only)
- `POST /api/books/bulk` - Bulk upload books (sellers only)

### Categories
- `GET /api/categories` - Get all categories and course codes

### Orders
- `POST /api/orders` - Place new order

## 📖 Bulk Upload Guide

For sellers with large inventories, use the bulk upload feature with JSON format:

```json
[
  {
    "title": "Introduction to Computer Science",
    "courseCode": "cs101",
    "price": 1500,
    "description": "Excellent condition textbook...",
    "condition": "good",
    "author": "John Smith",
    "edition": "5th Edition",
    "isbn": "978-0123456789",
    "semester": "Fall 2024",
    "tags": ["programming", "computer science"]
  }
]
```

**Limits**: Maximum 200 books per upload

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Protected API routes

## 📧 Email Integration

The system automatically sends email notifications:
- **To Sellers**: When they receive a new order
- **To Buyers**: Order confirmation with seller contact details

## 🎯 VUEDU Integration

Footer includes links to VUEDU ecosystem:
- [Blogs](https://vuedu.dev/blogs)
- [Online Quiz](https://vuedu.dev/quiz)
- [Past Papers](https://vuedu.dev/past-papers)
- [Study Material](https://vuedu.dev/study-material)

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables for Production
Ensure all environment variables are properly set for production deployment.

---

**Made with ❤️ for Virtual University Students across Pakistan**
