import "reflect-metadata"
import 'express-async-errors';
import { app } from './api/api';

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});