const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/Project.js');

dotenv.config();

const projects = [
  {
    title: "E-Commerce Platform Redesign",
    slug: "ecommerce-platform-redesign",
    summary: "Rebuilt a legacy e-commerce platform increasing conversion rates by 47% through modern UX patterns and performance optimization.",
    tags: ["react", "node", "mongodb", "stripe"],
    heroImage: "/projects/ecommerce-hero.jpg",
    gallery: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
    role: "Full Stack Developer",
    stack: ["React", "Node.js", "MongoDB", "Redis", "Stripe API"],
    problem: "The client's 8-year-old e-commerce platform was losing $2M annually due to cart abandonment and slow page loads.",
    approach: "Implemented React with code-splitting, optimized MongoDB queries, added Redis caching layer, and redesigned checkout flow based on user testing.",
    results: "47% increase in conversion rate, 3.2s to 0.8s page load time, $950K additional revenue in first quarter.",
    links: {
      github: "https://github.com/yourusername/ecommerce-demo",
      live: "https://ecommerce-demo.netlify.app"
    },
    featured: true,
    order: 1
  },
  {
    title: "Real-Time Analytics Dashboard",
    slug: "analytics-dashboard",
    summary: "Built a real-time analytics dashboard processing 100K+ events/second for a SaaS startup's customer insights platform.",
    tags: ["react", "websockets", "d3", "postgresql"],
    heroImage: "/projects/analytics-hero.jpg",
    gallery: ["/projects/analytics-1.jpg", "/projects/analytics-2.jpg"],
    role: "Frontend Lead",
    stack: ["React", "D3.js", "WebSockets", "PostgreSQL", "Docker"],
    problem: "Client needed to visualize complex user behavior patterns in real-time for 500+ enterprise customers.",
    approach: "Built custom D3 visualizations, implemented WebSocket connections for live updates, created efficient data aggregation pipeline.",
    results: "Reduced data latency from 5 minutes to <1 second, 89% customer satisfaction score, $3M Series A funding secured.",
    links: {
      live: "https://analytics-demo.vercel.app"
    },
    featured: true,
    order: 2
  },
  {
    title: "AI Content Generation API",
    slug: "ai-content-api",
    summary: "Developed a scalable API serving 1M+ requests daily for automated content generation using GPT-4 and custom fine-tuning.",
    tags: ["python", "fastapi", "openai", "redis"],
    heroImage: "/projects/ai-hero.jpg",
    gallery: ["/projects/ai-1.jpg", "/projects/ai-2.jpg"],
    role: "Backend Architect",
    stack: ["Python", "FastAPI", "OpenAI API", "Redis", "PostgreSQL"],
    problem: "Marketing agency needed to generate personalized content at scale while maintaining quality and brand voice.",
    approach: "Fine-tuned GPT-4 on client data, built caching layer for common requests, implemented rate limiting and queue system.",
    results: "Reduced content creation time by 85%, maintained 94% quality score, saved client $200K/month in content costs.",
    links: {
      github: "https://github.com/yourusername/ai-content-demo"
    },
    featured: false,
    order: 3
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Project.deleteMany({});
    console.log('Projects deleted');
    
    await Project.insertMany(projects);
    console.log('Sample projects added');
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();