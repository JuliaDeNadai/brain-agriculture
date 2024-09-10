import { IRuralProducerCreate, IRuralProducerGet } from "../models/ruralProducer";
import { IDashboardData } from "@Models/dashboard";
import { RuralProducerRepository } from "../repositories/ruralProducerRepository";
import { validateCPF } from "../utils/validateCPF";
import { validateCNPJ } from "../utils/validateCNPJ";

class RuralProducerController {

    repository: RuralProducerRepository = new RuralProducerRepository()

    async create({ cpf_cpnj, producerName, farmName, city, state, totalArea, arableArea, vegetableArea, plantedCrops }: IRuralProducerCreate): Promise<IRuralProducerGet | null>{

        if(!this.validateTotalFarmArea(totalArea, arableArea, vegetableArea)){
            throw new Error('Área total deve ser maior ou igual a soma das áreas agriculturáveis e de vegetação.')
        }

        if(cpf_cpnj.length === 11){ 
            
            if(!validateCPF(cpf_cpnj)) throw new Error('Invalid CPF')

        }else{ 
            
            if(!validateCNPJ(cpf_cpnj)) throw new Error('Invalid CNPJ')
        }
        // todo: validate crops

        return await this.repository.create({ cpf_cpnj, producerName, farmName, city, state, totalArea, arableArea, vegetableArea, plantedCrops })
    }

    async get(cpf_cnpj: string): Promise<IRuralProducerGet | null>{

        return await this.repository.getByCpfOrCnpj(cpf_cnpj)
    }

    async getAll(): Promise<IRuralProducerGet[]>{
        return await this.repository.getAll()
    }

    async delete(cpf_cnpj: string): Promise<boolean>{
        return await this.repository.deleteByCpfOrCnpj(cpf_cnpj)
    }
    
    validateTotalFarmArea(totalArea: number, arableArea: number, vegetableArea: number): boolean {
        return totalArea > arableArea + vegetableArea
    }
}

export {RuralProducerController}