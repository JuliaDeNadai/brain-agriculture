import { IDashboardData, IGetTotals, ITotalFarmsByState, ITotalFarmsGroupedByCrops } from "@Models/dashboard";
import { IFarm, IFarmCreate } from "@Models/farm";

export interface IFarmInterface {
  create(farm: Omit<IFarmCreate, 'id'>): Promise<IFarm | null>
  getDashboardData(): Promise<IDashboardData>,
  getTotalFarmsGroupedByCrops(): Promise<ITotalFarmsGroupedByCrops[]>,
  getTotalFarmsGroupedByState(): Promise<ITotalFarmsByState[]>,
  getTotals(): Promise<Omit<IGetTotals, 'totalFarmsGroupedByCrops' | 'totalFarmsByState'>>
}