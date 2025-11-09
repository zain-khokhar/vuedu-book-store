import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/mongodb.js';
import User from '../../../../models/User.js';
import { generateToken } from '../../../../lib/auth.js';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { name, email, password, phone, whatsapp, role, address } = await request.json();

    if (!name || !email || !password || !phone) {
      return Response.json(
        { success: false, error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      whatsapp,
      role: role || 'buyer',
      address
    });

    await user.save();

    const token = generateToken(user._id);

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      role: user.role,
      address: user.address
    };

    return Response.json({
      success: true,
      data: {
        user: userResponse,
        token
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}