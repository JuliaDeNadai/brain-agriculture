import { Pool } from "pg";
import PostgresSingleton from "../database/postgresSingleton";
import { IFarm, IFarmCreate } from "../models/farm";
import { IDashboardData } from "../models/dashboard";
import { injectable } from "tsyringe";
import { ICreate, IDelete } from "./interfaces/iDatabaseOperations";
import { IFarmInterface } from "./interfaces/iFarmInterface";

interface IResultRows {
  total_farms: number 
  total_area: number 
  planted_area: number 
  arable_area: number 
  vegetable_area: number
}

@injectable()
class FarmRepository implements IDelete, IFarmInterface {
  pool: Pool = PostgresSingleton.getInstance();

  async create({name, city, state, totalArea, arableArea, vegetableArea, producerId}: Omit<IFarmCreate, 'id'>): Promise<IFarm | null>{
    const result = await this.pool.query(`INSERT INTO "Farm"
      ( 
        name,
        city,
        state,
        total_area,
        arable_area,
        vegetable_area,
        producer
      )VALUES(
        '${name}',
        '${city}',
        '${state}',
        ${totalArea},
        ${arableArea},
        ${vegetableArea},
        ${producerId}
      )
      RETURNING id`)

    if(result.rowCount === 0) return null

    let { id } = result.rows[0]

    return { name, city, state, totalArea, arableArea, vegetableArea, id }
  }

  async delete(id: number){
    let result = await this.pool.query(`DELETE FROM "Farm" where id = '${id}'`)

    if(result.rowCount === 0) return false
    
    return true
  }

  async getTotals(){
    let result = await this.pool.query(`
      select 
        count(*) total_farms,
        COALESCE(SUM(total_area), 0) AS total_area,
        COALESCE(SUM(vegetable_area), 0) AS planted_area,
        COALESCE(SUM(vegetable_area), 0) AS vegetable_area,
        COALESCE(SUM(arable_area), 0) AS arable_area
      from "Farm"
      `)
      
    let {
      total_farms = 0, 
      total_area = 0, 
      planted_area = 0, 
      arable_area = 0, 
      vegetable_area = 0 
    }: IResultRows = result.rows[0]
    
    return {total_farms, total_area, planted_area, arable_area, vegetable_area}
  }

  async getTotalFarmsGroupedByState(){
    let result = await this.pool.query(`
      select 
        state,
        count(*) total_farms
      from "Farm"
      group by state
      `)

    return result.rows || []
  }

  async getTotalFarmsGroupedByCrops(){
    let result = await this.pool.query(`
        select 
          COUNT(*) total_farms,
          c."name" crop 
        from "Crop" c 
        join "Farm_Crop" fc on fc.crop = c.id 
        join "Farm" f on f.id = fc.farm 
        group by c.id 
      `)

    return result.rows || []
  }
  

  async getDashboardData(): Promise<IDashboardData> {
    const { total_farms, total_area, planted_area, arable_area, vegetable_area } = await this.getTotals()
    const totalFarmsByState = await this.getTotalFarmsGroupedByState()
    const totalFarmsGroupedByCrops = await this.getTotalFarmsGroupedByCrops()

    return { total_farms, total_area, planted_area, arable_area, vegetable_area, totalFarmsByState, totalFarmsGroupedByCrops }
  }
}

export {FarmRepository}