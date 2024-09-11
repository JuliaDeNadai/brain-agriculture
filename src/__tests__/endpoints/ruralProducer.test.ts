import request from 'supertest';
import { app } from '../../api/api';
import {RuralProducerController} from '../../controllers/ruralProducerController'

jest.mock('../../controllers/dashboardController')

describe('GET /ruralProducer/:cpf_cnpj', () => {
  let mockGetRuralProducer: jest.SpyInstance;

  beforeAll(() => {
    
    mockGetRuralProducer = jest.spyOn(RuralProducerController.prototype, 'get')
      .mockResolvedValue({
        id: 1,
        name: "Mocked name",
        cpf_cnpj: "99999999999",
        farm: {
            id: 1,
            name: "mocked farm name",
            city: "mocked city",
            state: "mocked state",
            totalArea: 10.0,
            arableArea: 8.0,
            vegetableArea: 2.0
        }
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

    expect(response.body).toHaveProperty('cpf_cnpj');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('farm');
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