export interface IRuralProducerCreate {
    cpf_cpnj: string,
    producerName: string,
    farmName: string,
    city: string,
    state: string,
    totalArea: number,
    arableArea: number,
    vegetableArea: number,
    plantedCrops: string[]
}