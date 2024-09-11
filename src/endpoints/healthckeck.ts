import express from 'express';

const healthCheckEnpoint = express.Router()

healthCheckEnpoint.route('/')
    .get((req: express.Request, res: express.Response) => {
        res.send('Hello from Brain Agriculture');
    });

export {healthCheckEnpoint}