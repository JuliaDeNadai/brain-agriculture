export interface IFarm {
  id: number,
  name: string,
  city: string,
  state: string,
  totalArea: number,
  arableArea: number,
  vegetableArea: number,
}

export interface IFarmCreate {
  name: string,
  city: string,
  state: string,
  totalArea: number,
  arableArea: number,
  vegetableArea: number,
  producerId: number
}