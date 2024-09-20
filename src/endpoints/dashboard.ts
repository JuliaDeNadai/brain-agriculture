import { container } from 'tsyringe';
import { DashboardController } from '../controllers/dashboardController';
import { RuralProducerController } from '../controllers/ruralProducerController';
import express from 'express';

const dashboardEnpoint = express.Router()
const controller = container.resolve(DashboardController)

dashboardEnpoint.route('/')
    .get(async (request: express.Request, response: express.Response) => {
        const result = await controller.getData()

        return response.status(200).send(result)
    });

export {dashboardEnpoint}