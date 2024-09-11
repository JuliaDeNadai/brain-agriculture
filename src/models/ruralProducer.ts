import { IFarm } from "./farm"

export interface IRuralProducerCreate {
    cpf_cnpj: string,
    producerName: string,
    farmName: string,
    city: string,
    state: string,
    totalArea: number,
    arableArea: number,
    vegetableArea: number,
    plantedCrops: string[]
}

export interface IRuralProducerGet {
    producerId: number,
    cpf_cnpj: string,
    producerName: string,
    farmId: number,
    farmName: string,
    city: string,
    state: string,
    totalArea: number,
    arableArea: number,
    vegetableArea: number,
    plantedCrops: string[]
}

export interface IRuralProducer {
    id: number,
    cpf_cnpj: string,
    name: string,
    farm: IFarm,
}

