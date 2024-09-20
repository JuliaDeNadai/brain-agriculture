export interface iFarmCropInterface {
  create(crops: Map<number, number>[]): Promise<{} | null>
  deleteByFarm(farmId: number): Promise<Boolean>
}