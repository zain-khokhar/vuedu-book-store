import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dbConnect from './mongodb.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const authMiddleware = async (req) => {
  try {
    console.log('Auth middleware called');
    console.log('JWT_SECRET being used:', JWT_SECRET);
    
    // Try multiple ways to get the token
    let token = null;
    
    // Method 1: Authorization header
    const authHeader = req.headers.get('authorization');
    console.log('Auth header from .get():', authHeader);
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('Token extracted from Bearer header:', token);
      
      // Test verification immediately
      const testVerify = verifyToken(token);
      console.log('Token verification test result:', testVerify);
    }
    
    // Method 2: Fallback for different header access patterns
    if (!token && req.headers.authorization) {
      console.log('Trying fallback header access:', req.headers.authorization);
      if (typeof req.headers.authorization === 'string' && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      }
    }
    
    console.log('Extracted token:', token ? `${token.substring(0, 20)}...` : 'null');
    
    if (!token) {
      console.log('No token found');
      return { error: 'No token provided', status: 401 };
    }

    const decoded = verifyToken(token);
    console.log('Token decoded:', decoded ? 'success' : 'failed');
    
    if (!decoded) {
      return { error: 'Invalid token', status: 401 };
    }

    await dbConnect();
    const user = await User.findById(decoded.userId).select('-password');
    console.log('User found:', user ? user.email : 'not found');
    
    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    return { user };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return { error: 'Authentication failed', status: 401 };
  }
};