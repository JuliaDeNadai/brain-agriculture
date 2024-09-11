import { FarmRepository } from "../repositories/farmRepository";

class DashboardController {

  repository: FarmRepository = new FarmRepository()

  async getData(){
    return await this.repository.getDashboardData()
  }
}

export {DashboardController}