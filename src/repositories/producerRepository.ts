import { Pool } from "pg";
import PostgresSingleton from "../database/postgresSingleton";
import { Producer } from "../models/producer";

class ProducerRepository {
  pool: Pool = PostgresSingleton.getInstance();

  async create({cpf_cnpj, name}: Omit<Producer, 'id'>): Promise<Producer | null>{
    const result = await this.pool.query(`INSERT INTO "Producer"
      ( 
        cpf_cnpj,
        name
      )VALUES(
        '${cpf_cnpj}',
        '${name}'
      )
      RETURNING id`)

    if(result.rowCount === 0) return null

    let {id} = result.rows[0]

    return { cpf_cnpj, name, id }
  }

  async delete(id: number){
    let result = await this.pool.query(`DELETE FROM "Producer" where id = '${id}'`)

    if(result.rowCount === 0) return false
    
    return true
  }

}

export {ProducerRepository}