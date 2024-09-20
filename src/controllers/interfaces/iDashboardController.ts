import { IDashboardData } from "@Models/dashboard";

export interface IDashboardController {
  getData(): Promise<IDashboardData>
}