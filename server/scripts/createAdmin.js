// server/scripts/createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const REQUIRED_FLAG = 'YES'; // change if you want a different confirmation word

const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD, CONFIRM_CREATE_ADMIN } = process.env;

if (CONFIRM_CREATE_ADMIN !== REQUIRED_FLAG) {
  console.error(
    'Safeguard active. Set CONFIRM_CREATE_ADMIN=YES (or your chosen word) to allow admin creation.'
  );
  process.exit(1);
}

const email = (ADMIN_EMAIL || '').trim().toLowerCase(); // <- normalize here
const password = ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD env vars.');
  process.exit(1);
}

// (optional) super basic email shape check
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('ADMIN_EMAIL is not a valid email address.');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ensure unique index exists (ok if already created)
    await User.syncIndexes();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }

    const admin = await User.create({
      email,                 // will also be lowercased by the model
      password,              // hashed by pre-save hook
      isAdmin: true,
    });

    console.log('Admin created:', admin.email);
    console.log('Remember to UNSET CONFIRM_CREATE_ADMIN and rotate ADMIN_PASSWORD.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
