import { Pool } from "pg";
import PostgresSingleton from "../database/postgresSingleton";
import { IRuralProducerCreate, IRuralProducerGet } from "../models/ruralProducer";
import { IDashboardData } from "@Models/dashboard";

class RuralProducerRepository {
    pool: Pool = PostgresSingleton.getInstance();

    async create({cpf_cnpj, producerName, farmName, city, state, totalArea, arableArea, vegetableArea, plantedCrops}: IRuralProducerCreate): Promise<Omit<IRuralProducerGet, 'producerId' | 'farmId'> | null>{
      
      const result = await this.pool.query(`INSERT INTO "Producer"
            ( 
              cpf_cnpj,
              producer_name,
              farm_name,
              city,
              state,
              total_area,
              arable_area,
              vegetable_area,
              planted_cropd
            )VALUES(
              '${cpf_cnpj}',
              '${producerName}',
              '${farmName}',
              '${city}',
              '${state}',
              ${totalArea},
              ${arableArea},
              ${vegetableArea},
              '${plantedCrops}'
            )`)

      if(result.rowCount === 0) return null
      
      return { cpf_cnpj, producerName, farmName, city, state, totalArea, arableArea, vegetableArea, plantedCrops }
  }

  async getByCpfOrCnpj(cpf_cnpj: string): Promise<IRuralProducerGet | null> {
     
    let result = await this.pool.query(`
      SELECT 
        p.id as "producerId",
        p.cpf_cnpj cpf_cnpj,
        p.name as "producerName",
        f.id as "farmId",
        f."name" as "farmName",
        f.city city,
        f.state state,
        f.total_area,
        f.arable_area,
        f.vegetable_area
      FROM "Producer" p 
      JOIN "Farm" f on f.producer = p.id  
      WHERE cpf_cnpj = '${cpf_cnpj}'`)

    if(result.rowCount === 0 ) return null

    return result.rows[0]
  }

  async getAll(): Promise<IRuralProducerGet[]> {
     
    let result = await this.pool.query(`
      SELECT 
        p.cpf_cnpj cpf_cnpj,
        p.name as "producerName",
        f."name" as "farmName",
        f.city city,
        f.state state,
        f.total_area,
        f.arable_area,
        f.vegetable_area
      FROM "Producer" p 
      JOIN "Farm" f on f.producer = p.id `)

    return result.rows
  }
}

export {RuralProducerRepository}