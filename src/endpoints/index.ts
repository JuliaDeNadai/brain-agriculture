import express from 'express';
import { healthCheckEnpoint } from './healthckeck';

const endpoints = express.Router()

endpoints.use('/healthcheck', healthCheckEnpoint)

export {endpoints};