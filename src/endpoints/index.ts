import express from 'express';
import { healthCheckEnpoint } from './healthckeck';
import { ruralProducerEnpoint } from './ruralProducer';
import { dashboardEnpoint } from './dashboard';

const endpoints = express.Router()

endpoints.use('/healthcheck', healthCheckEnpoint)
endpoints.use('/ruralProducer', ruralProducerEnpoint)
endpoints.use('/dashboard', dashboardEnpoint)

export {endpoints};