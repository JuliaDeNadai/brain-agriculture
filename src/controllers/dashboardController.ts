import { container, injectable } from "tsyringe";
import { FarmRepository } from "../repositories/farmRepository";

@injectable()
class DashboardController {

  repository: FarmRepository = container.resolve(FarmRepository)

  async getData(){
    return await this.repository.getDashboardData()
  }
}

export {DashboardController}