export interface IDashboardData {
  total_farms: number
    total_area: number
  planted_area: number
  arable_area: number
  vegetable_area: number
  totalFarmsByState: ITotalFarmsByState[]
  totalFarmsGroupedByCrops: any
}

export interface ITotalFarmsByState {
  state: string
  total_farms: number
  
}

export interface ITotalFarmsGroupedByCrops {
  total_farms: number
  crop: string
}

export interface IGetTotals {
  total_farms: number
  total_area: number
  planted_area: number
  arable_area: number
  vegetable_area: number
  totalFarmsByState: ITotalFarmsByState[]
  totalFarmsGroupedByCrops: ITotalFarmsGroupedByCrops[]
}