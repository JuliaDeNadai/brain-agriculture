import request from 'supertest';
import { app } from '../../api/api';
import {DashboardController} from '../../controllers/dashboardController'

jest.mock('../../controllers/dashboardController')

describe('GET /dashboard', () => {
  let mockGetDashboardData: jest.SpyInstance;

  beforeAll(() => {
    
    mockGetDashboardData = jest.spyOn(DashboardController.prototype, 'getData')
      .mockResolvedValue({
        total_farms: 1,
        total_area: 12,
        planted_area: 8,
        arable_area: 2,
        vegetable_area: 8
      });
  });

  afterAll(() => {
    mockGetDashboardData.mockRestore();  
  });


  it('should return dashboard data with status 200', async () => {
    const response = await request(app).get('/api/dashboard');

    expect(response.status).toBe(200);
  });

  it('should return dashboard data with all attributes', async () => {
    const response = await request(app).get('/api/dashboard');

    expect(response.body).toHaveProperty('total_farms');
    expect(response.body).toHaveProperty('total_area');
    expect(response.body).toHaveProperty('planted_area');
    expect(response.body).toHaveProperty('arable_area');
    expect(response.body).toHaveProperty('vegetable_area');
  });

});