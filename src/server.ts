import 'express-async-errors';
import express from 'express';
import { endpoints } from './endpoints';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { app } from './api/api';

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});