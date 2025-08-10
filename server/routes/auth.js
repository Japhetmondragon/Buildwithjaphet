const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // must select password since it's hidden by default
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      const isProd = process.env.NODE_ENV === 'production';
      res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,                      // required for SameSite=None
      sameSite: isProd ? 'none' : 'lax',   // cross-site in prod, dev is fine with lax
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',                           // be explicit
      });
      return res.json({ _id: user._id, email: user.email, isAdmin: user.isAdmin });
    }

    res.status(401);
    throw new Error('Invalid email or password');
  } catch (err) {
    next(err);
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', '', {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  expires: new Date(0),
  path: '/',
  });
  
  res.json({ message: 'Logged out successfully' });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  });
});

module.exports = router;