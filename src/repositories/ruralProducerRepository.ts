import { Pool } from "pg";
import PostgresSingleton from "../database/postgresSingleton";
import { IRuralProducerCreate, IRuralProducerGet } from "../models/ruralProducer";
import { IDashboardData } from "@Models/dashboard";

class RuralProducerRepository {
    pool: Pool = PostgresSingleton.getInstance();

    async create({cpf_cpnj, producerName, farmName, city, state, totalArea, arableArea, vegetableArea, plantedCrops}: IRuralProducerCreate): Promise<IRuralProducerGet | null>{
      
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
              '${cpf_cpnj}',
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
      
      return { cpf_cpnj, producerName, farmName, city, state, totalArea, arableArea, vegetableArea, plantedCrops }
  }

  async getByCpfOrCnpj(cpf_cnpj: string): Promise<IRuralProducerGet | null> {
     
    let result = await this.pool.query(`SELECT * FROM "Producer" where cpf_cnpj = '${cpf_cnpj}'`)

    if(result.rowCount === 0 ) return null

    return result.rows[0]
  }

  async getAll(): Promise<IRuralProducerGet[]> {
     
    let result = await this.pool.query(`SELECT * FROM "Producer"`)

    return result.rows
  }

  async deleteByCpfOrCnpj(cpf_cnpj: string): Promise<boolean>{
     
    let result = await this.pool.query(`DELETE FROM "Producer" where cpf_cnpj = '${cpf_cnpj}'`)

    if(result.rowCount === 0) return false
    
    return true
  }

  async getTotals(){
    let result = await this.pool.query(`
      select 
        count(*) total_farms,
        SUM(total_area) total_area,
        SUM(vegetable_area) planted_area,
        SUM(vegetable_area) vegetable_area,
        SUM(arable_area) arable_area
      from "Producer"
      `)

    return result.rows[0]
  }

  async getTotalFarmsGroupedByState(){
    let result = await this.pool.query(`
      select 
        state,
        count(*) total_farms
      from "Producer"
      group by state
      `)

    return result.rows
  }

  async getTotalFarmsGroupedByCrops(){

  }
  

  async getDashboardData(): Promise<IDashboardData> {
    const { total_farms, total_area, planted_area, arable_area, vegetable_area } = await this.getTotals()
    const totalFarmsByState = await this.getTotalFarmsGroupedByState()
    //const totalFarmsGroupedByCrops = await this.getTotalFarmsGroupedByCrops()

    return { total_farms, total_area, planted_area, arable_area, vegetable_area, totalFarmsByState }
  }

}

export {RuralProducerRepository}