import { Pool } from 'pg';
import { injectable } from 'tsyringe';

@injectable()
class PostgresSingleton {
  private static instance: Pool | null;

  constructor() {}

  public static getInstance(): Pool {
    if (!PostgresSingleton.instance) {
      PostgresSingleton.instance = new Pool({
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
      });

      PostgresSingleton.instance.on('connect', () => {
        console.log('Conectado ao banco de dados');
      });

      PostgresSingleton.instance.on('error', (err: any) => {
        console.error('Erro no banco de dados:', err);
        process.exit(-1)
      });
    }

    return PostgresSingleton.instance;
  }

  public static async closeConnection() {
    if (PostgresSingleton.instance) {
      await PostgresSingleton.instance.end();
      console.log('Conexão fechada com o banco de dados');
      PostgresSingleton.instance = null;
    }
  }
  
}

export default PostgresSingleton;