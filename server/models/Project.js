const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxLength: 100
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Project summary is required'],
    maxLength: 300
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  heroImage: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  role: {
    type: String,
    required: false
  },
  stack: [{
    type: String,
    trim: true
  }],
  problem: {
    type: String,
    required: true
  },
  approach: {
    type: String,
    required: true
  },
  results: {
    type: String,
    required: true
  },
  links: {
    github: String,
    live: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);