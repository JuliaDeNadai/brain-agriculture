import { IRuralProducer, IRuralProducerCreate, IRuralProducerGet } from "@Models/ruralProducer";

export interface IRuralProducerInterface {
  get(cpf_cnpj: string): Promise<Partial<IRuralProducer> | null>,
  create(ruralProducer: IRuralProducerCreate): Promise<Omit<IRuralProducer, 'id'> | null>,
  getAll(): Promise<IRuralProducerGet[]>,
  delete(cpf_cnpj: string): Promise<boolean>,
  validateTotalFarmArea(totalArea: number, arableArea: number, vegetableArea: number): boolean
}