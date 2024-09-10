import request from 'supertest';
import { app } from '../../api/api';
import {RuralProducerController} from '../../controllers/ruralProducerController'

jest.mock('../../controllers/dashboardController')

describe('GET /ruralProducer/:cpf_cnpj', () => {
  let mockGetRuralProducer: jest.SpyInstance;

  beforeAll(() => {
    
    mockGetRuralProducer = jest.spyOn(RuralProducerController.prototype, 'get')
      .mockResolvedValue({
        cpf_cpnj: "string",
        producerName: "string",
        farmName: "string",
        city: "string",
        state: "string",
        totalArea: 12,
        arableArea: 12,
        vegetableArea: 12,
        plantedCrops: ["string"]
      });
  });

  afterAll(() => {
    mockGetRuralProducer.mockRestore();  
  });


  it('should return rural producer data with status 200', async () => {
    const response = await request(app).get('/api/ruralProducer/string');

    expect(response.status).toBe(200);
  });

  it('should return rura producer data with all attributes', async () => {
    const response = await request(app).get('/api/ruralProducer/string');

    expect(response.body).toHaveProperty('cpf_cpnj');
    expect(response.body).toHaveProperty('producerName');
    expect(response.body).toHaveProperty('farmName');
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('state');
    expect(response.body).toHaveProperty('totalArea');
    expect(response.body).toHaveProperty('arableArea');
    expect(response.body).toHaveProperty('vegetableArea');
    expect(response.body).toHaveProperty('plantedCrops');
  });

});

describe('DELETE /ruralProducer/:cpf_cnpj', () => {
  let mockGetRuralProducer: jest.SpyInstance;

  beforeAll(() => {
    
    mockGetRuralProducer = jest.spyOn(RuralProducerController.prototype, 'delete')
      .mockResolvedValue(true);
  });

  afterAll(() => {
    mockGetRuralProducer.mockRestore();  
  });


  it('should return status 204 on success', async () => {
    const response = await request(app).delete('/api/ruralProducer/string');

    expect(response.status).toBe(204);
  });

});