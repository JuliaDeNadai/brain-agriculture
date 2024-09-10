import request from 'supertest';
import { app } from '../../api/api';

describe('GET /healthcheck', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/api/healthcheck');

    expect(response.status).toBe(200);
  });

});