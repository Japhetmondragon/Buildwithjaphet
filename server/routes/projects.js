const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js');
const { protect } = require('../middleware/authMiddleware.js');

// utils
const slugify = (str = '') =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // non-alphanum -> -
    .replace(/^-+|-+$/g, '')     // trim -
    .replace(/-{2,}/g, '-');     // collapse --

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { tag, stack } = req.query;
    let query = {};
    
    if (tag) query.tags = tag;
    if (stack) query.stack = stack;
    
    const projects = await Project.find(query).sort({featured: -1, order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/id/:id
// Private — fetch by ID (useful for the admin edit form)
router.get('/id/:id', protect, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
// @access  Public
router.get('/:slug', async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug.toLowerCase() });
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
router.post('/', protect, async (req, res, next) => {
  try {
    const body = { ...req.body };

    if (!body.title) {
      res.status(400);
      throw new Error('Title is required');
    }

    // generate/normalize slug
    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    } else if (body.slug) {
      body.slug = slugify(body.slug);
    }

    const created = await Project.create(body);
    res.status(201).json(created);
  } catch (error) {
    if (error?.code === 11000) {
      res.status(400);
      error.message = 'Slug already exists. Choose a different slug.';
    }
    next(error);
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (typeof updates.slug === 'string') {
      updates.slug = slugify(updates.slug);
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    res.json(updated);
  } catch (error) {
    if (error?.code === 11000) {
      res.status(400);
      error.message = 'Slug already exists. Choose a different slug.';
    }
    next(error);
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    res.json({ message: 'Project removed' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;