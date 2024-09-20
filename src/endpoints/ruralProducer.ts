import express, {Request, Response} from 'express';
import { RuralProducerController } from '../controllers/ruralProducerController';
import { IRuralProducer, IRuralProducerCreate, IRuralProducerGet } from '../models/ruralProducer';
import { ruralProducerMiddleware } from '../middlewares/ruralProducerMiddleware';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

const ruralProducerEnpoint = express.Router()

const controller = container.resolve(RuralProducerController)

ruralProducerEnpoint.route('/')
    .post(ruralProducerMiddleware(), async (request: Request, response: Response) =>  {
        const errors = validationResult(request)
        if (!errors.isEmpty()) 
            return response.status(400).json({ errors: errors.array() });
        
        const {
            cpf_cnpj,
            producerName,
            farmName,
            city,
            state,
            totalArea,
            arableArea,
            vegetableArea,
            plantedCrops
        } = request.body as IRuralProducerCreate


        let producer: Omit<IRuralProducer, 'id'> | null = await controller.create({
            cpf_cnpj,
            producerName,
            farmName,
            city,
            state,
            totalArea,
            arableArea,
            vegetableArea,
            plantedCrops
        })

        if(producer === null) return response.sendStatus(500)
            
        response.status(201).json(producer);
        
    })
    .get(async (request: Request, response: Response) =>  {

        let producers = await controller.getAll()
        response.status(200).json(producers);

    })
 

ruralProducerEnpoint.route('/:cpf_cnpj')
    .get(async (request: Request, response: Response) => {
        let {cpf_cnpj} = request.params
        
        let producer = await controller.get(cpf_cnpj)
        
        if(producer === null) return response.sendStatus(404)
        
        response.status(200).json(producer);
    })
    .delete(async (request: Request, response: Response) => {
        let {cpf_cnpj} = request.params
        
        let result = await controller.delete(cpf_cnpj)

        if(result) return response.sendStatus(204);

        response.sendStatus(404);
        
    })


export {ruralProducerEnpoint}