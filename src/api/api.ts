import 'express-async-errors';
import express from 'express';
import { endpoints } from '../endpoints';
import { errorMiddleware } from '../middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use('/api', endpoints)

app.use(errorMiddleware)

export {app}