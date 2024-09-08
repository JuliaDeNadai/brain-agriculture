import express from 'express';

const healthCheckEnpoint = express.Router()

healthCheckEnpoint.route('/')
    .get((req, res) => {
        res.send('ok');
    });

export {healthCheckEnpoint}