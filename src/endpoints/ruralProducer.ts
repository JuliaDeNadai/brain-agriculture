import express from 'express';
import { RuralProducerController } from '../controllers/ruralProducerController';

const ruralProducerEnpoint = express.Router()

ruralProducerEnpoint.route('/')
    .post((req: express.Request, res: express.Response) => {

        console.log(req.body)
        let controller = new RuralProducerController()

        try{
            let producer = controller.create(req.body)
            res.send(producer);

        }
        catch(err){
            res.send('error');
        }
    });

export {ruralProducerEnpoint}