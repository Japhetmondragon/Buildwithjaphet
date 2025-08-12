const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // lowercased on save()
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
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure unique index for email
userSchema.index({ email: 1 }, { unique: true });

// Lowercase email on findOneAndUpdate / findByIdAndUpdate
userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() || {};
  if (typeof update.email === 'string') {
    update.email = update.email.trim().toLowerCase();
  }
  if (update.$set && typeof update.$set.email === 'string') {
    update.$set.email = update.$set.email.trim().toLowerCase();
  }
  this.setUpdate(update);
  next();
});

// Hash password only when it changes
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password (case-sensitive)
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
