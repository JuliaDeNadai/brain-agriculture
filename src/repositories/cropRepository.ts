import { Pool } from "pg";
import PostgresSingleton from "../database/postgresSingleton";
import { IRuralProducerCreate } from "@Models/ruralProducer";
import { IGetByName } from "./interfaces/iDatabaseOperations";

class CropRepository implements IGetByName<string> {
  pool: Pool = PostgresSingleton.getInstance();

  async getByName(name: string){
    let result = await this.pool.query(`SELECT * FROM "Crop" WHERE name = '${name}'`)

    return result.rows
  }
}

export {CropRepository}