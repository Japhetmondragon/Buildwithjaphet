const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,        // hide by default
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,       // regular users are NOT admin
    },
  },
  { timestamps: true }
);

// hash only when password changes
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // <-- return here
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
