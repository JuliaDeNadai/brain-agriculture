import { IRuralProducerCreate } from "../models/ruralProducer";
import { RuralProducerRepository } from "../repositories/ruralProducerRepository";

class RuralProducerController {

    repository: RuralProducerRepository = new RuralProducerRepository()

    /* 
        O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
        todo: O sistema deverá validar CPF e CNPJ digitados incorretamente.
        A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
        Cada produtor pode plantar mais de uma cultura em sua Fazenda.
    */
    async create(ruralProducer: IRuralProducerCreate): Promise<string>{

        if(!this.validateTotalFarmArea(ruralProducer.totalArea, ruralProducer.arableArea, ruralProducer.vegetableArea)){
            throw new Error('Área total deve ser maior ou igual a soma das áreas agriculturáveis e de vegetação.')
        }

        return await this.repository.create(ruralProducer)
    }

    validateTotalFarmArea(totalArea: number, arableArea: number, vegetableArea: number): boolean {
        return totalArea > arableArea + vegetableArea
    }
}

export {RuralProducerController}