import { RuralProducerRepository } from "../repositories/ruralProducerRepository";

class DashboardController {

  repository: RuralProducerRepository = new RuralProducerRepository()

  async getData(){
    return await this.repository.getDashboardData()
  }
}

export {DashboardController}