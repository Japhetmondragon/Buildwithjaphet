const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminEmail = 'admin@example.com';
    const adminPassword = 'Admin123!@#';
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit();
    }
    
    // Create admin
    const admin = await User.create({
      email: adminEmail,
      password: adminPassword,
      isAdmin: true
    });
    
    console.log(`Admin created: ${admin.email}`);
    console.log(`Password: ${adminPassword}`);
    console.log('CHANGE THIS PASSWORD IMMEDIATELY!');
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();