import { DashboardController } from '@Controllers/dashboardController';
import { RuralProducerController } from '@Controllers/ruralProducerController';
import { CropRepository } from '../repositories/cropRepository';
import { FarmRepository } from '@Repositories/farmRepository';
import { ProducerRepository } from '@Repositories/producerRepository';
import { container } from 'tsyringe';
import PostgresSingleton from 'src/database/postgresSingleton';


// database pool
const pool = PostgresSingleton.getInstance();
container.register('pool', {
  useValue: pool,
});


import { FarmCropRepository } from '@Repositories/farmCropRepository';

// repositories
container.registerSingleton<CropRepository>(CropRepository);
container.registerSingleton<ProducerRepository>(ProducerRepository);
container.registerSingleton<FarmRepository>(FarmRepository);
container.registerSingleton<FarmCropRepository>(FarmCropRepository);

// controllers
container.registerSingleton<RuralProducerController>(RuralProducerController);
container.registerSingleton<DashboardController>(DashboardController);
