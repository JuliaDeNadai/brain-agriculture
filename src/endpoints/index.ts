import express from 'express';
import { healthCheckEnpoint } from './healthckeck';
import { ruralProducerEnpoint } from './ruralProducer';

const endpoints = express.Router()

endpoints.use('/healthcheck', healthCheckEnpoint)
endpoints.use('/ruralProducer', ruralProducerEnpoint)

export {endpoints};