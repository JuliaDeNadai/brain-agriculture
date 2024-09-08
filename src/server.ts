import express from 'express';

const app = express();

const port = 3000;

app.get('/healthcheck', (req, res) => {
  res.send('ok');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});