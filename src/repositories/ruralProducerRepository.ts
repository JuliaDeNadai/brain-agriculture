import { IRuralProducerCreate } from "../models/ruralProducer";

class RuralProducerRepository {
    async create(ruralProducer: IRuralProducerCreate): Promise<string>{
        return ruralProducer.producerName
    }
}

export {RuralProducerRepository}