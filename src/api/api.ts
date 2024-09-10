import 'express-async-errors';
import express from 'express';
import { endpoints } from '../endpoints';
import { errorMiddleware } from '../middlewares/errorMiddleware';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../swagger_output.json";

const app = express();

app.use(express.json());
app.use(endpoints)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(errorMiddleware)


export {app}