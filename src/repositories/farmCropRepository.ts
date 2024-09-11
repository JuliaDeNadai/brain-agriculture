import { Pool } from "pg";
import PostgresSingleton from "../database/postgresSingleton";

class FarmCropRepository {
  pool: Pool = PostgresSingleton.getInstance();

  async create(crops: Map<number, number>[]){
    // [farmId, cropId]

    let cropsInsert = ``

    for(let crop in crops){
      cropsInsert += `(${crop}, ${crop})`
    }

    const result = await this.pool.query(`INSERT INTO "Farm_Crop" ( farm, crop ) VALUES ${cropsInsert} RETURNING id`)

    if(result.rowCount === 0) return null

    return { }
  }

  async deleteByFarm(farmId: number){
    let result = await this.pool.query(`DELETE FROM "Farm_Crop" where farm = '${farmId}'`)

    if(result.rowCount === 0) return false
    
    return true
  }
}

export {FarmCropRepository}