import 'express-async-errors';
import express from 'express';
import { endpoints } from './endpoints';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

const port = 3000;
app.use(express.json());
app.use('/api', endpoints)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});