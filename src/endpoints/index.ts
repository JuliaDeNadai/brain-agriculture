import express from 'express';
import { healthCheckEnpoint } from './healthckeck';
import { ruralProducerEnpoint } from './ruralProducer';
import { dashboardEnpoint } from './dashboard';

const endpoints = express.Router()

endpoints.use('/api/healthcheck', healthCheckEnpoint)
endpoints.use('/api/ruralProducer', ruralProducerEnpoint)
endpoints.use('/api/dashboard', dashboardEnpoint)

export {endpoints};