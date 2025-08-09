const request = require('supertest');
const app = require('../server');

describe('Projects API', () => {
  test('GET /api/projects returns projects', async () => {
    const response = await request(app)
      .get('/api/projects')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  test('GET /api/projects/:slug returns single project', async () => {
    const response = await request(app)
      .get('/api/projects/ecommerce-platform-redesign')
      .expect(200);
    
    expect(response.body.slug).toBe('ecommerce-platform-redesign');
  });
  
  test('GET /api/projects/invalid-slug returns 404', async () => {
    await request(app)
      .get('/api/projects/invalid-slug')
      .expect(404);
  });
});