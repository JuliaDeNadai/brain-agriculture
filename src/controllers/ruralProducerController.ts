import { IRuralProducer, IRuralProducerCreate, IRuralProducerGet } from "../models/ruralProducer";
import { IDashboardData } from "@Models/dashboard";
import { RuralProducerRepository } from "../repositories/ruralProducerRepository";
import { validateCPF } from "../utils/validateCPF";
import { validateCNPJ } from "../utils/validateCNPJ";
import { ProducerRepository } from "../repositories/producerRepository";
import { FarmRepository } from "../repositories/farmRepository";
import { FarmCropRepository } from "../repositories/farmCropRepository";

class RuralProducerController {

    ruralProducerRepository: RuralProducerRepository = new RuralProducerRepository()
    producerRepository: ProducerRepository = new ProducerRepository()
    farmRepository: FarmRepository = new FarmRepository()
    farmCropRepository: FarmCropRepository = new FarmCropRepository()

    async create({ cpf_cnpj, producerName, farmName, city, state, totalArea, arableArea, vegetableArea, plantedCrops }: IRuralProducerCreate): Promise<Omit<IRuralProducer, 'id'> | null>{

        if(!this.validateTotalFarmArea(totalArea, arableArea, vegetableArea)){
            throw new Error('Área total deve ser maior ou igual a soma das áreas agriculturáveis e de vegetação.')
        }

        if(cpf_cnpj.length === 11){ 
            
            if(!validateCPF(cpf_cnpj)) throw new Error('Invalid CPF')

        }else{ 
            
            if(!validateCNPJ(cpf_cnpj)) throw new Error('Invalid CNPJ')
        }
        // todo: validate crops

        let producer = await this.producerRepository.create({cpf_cnpj, name: producerName})
        
        if(producer == null) throw new Error('Failed to insert new Producer')

        let farm = await this.farmRepository.create({ name: farmName, city, state, totalArea, arableArea, vegetableArea, producerId: producer.id})

        if(farm == null) throw new Error('Failed to insert new Farm')

        /* if(plantedCrops.length > 0 ){
            console.log(plantedCrops)
        } */

        let createdEntity = {
            id: producer.id,
            name: producer.name,
            cpf_cnpj: producer.cpf_cnpj,
            farm: farm
        }

        return createdEntity
    }

    async get(cpf_cnpj: string): Promise<Partial<IRuralProducer> | null>{

        let ruralProducer = await this.ruralProducerRepository.getByCpfOrCnpj(cpf_cnpj)

        if(ruralProducer === null) return null

        let entity = {
            id: ruralProducer.producerId,
            name: ruralProducer.producerName,
            cpf_cnpj: ruralProducer.cpf_cnpj,
            farm: {
                id: ruralProducer.farmId,
                name: ruralProducer.farmName,
                city: ruralProducer.city,
                state: ruralProducer.state,
                totalArea: ruralProducer.totalArea,
                arableArea: ruralProducer.arableArea,
                vegetableArea: ruralProducer.vegetableArea
            }
        }
        return entity
    }

    async getAll(): Promise<IRuralProducerGet[]>{
        return await this.ruralProducerRepository.getAll()
    }

    async delete(cpf_cnpj: string): Promise<boolean>{

        let ruralProducer = await this.ruralProducerRepository.getByCpfOrCnpj(cpf_cnpj)

        if(ruralProducer === null) return false

        await this.farmCropRepository.deleteByFarm(ruralProducer.farmId)

        await this.farmRepository.delete(ruralProducer.farmId)
        
        await this.producerRepository.delete(ruralProducer.producerId)

        return true
    }
    
    validateTotalFarmArea(totalArea: number, arableArea: number, vegetableArea: number): boolean {
        return totalArea > arableArea + vegetableArea
    }
}

export {RuralProducerController}