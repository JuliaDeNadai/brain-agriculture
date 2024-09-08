import express from 'express';
import { endpoints } from './endpoints';

const app = express();

const port = 3000;

app.use('/api', endpoints)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});