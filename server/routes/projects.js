const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { tag, stack } = req.query;
    let query = {};
    
    if (tag) query.tags = tag;
    if (stack) query.stack = stack;
    
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
// @access  Public
router.get('/:slug', async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    
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
router.post('/', async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
router.put('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    res.json({ message: 'Project removed' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;