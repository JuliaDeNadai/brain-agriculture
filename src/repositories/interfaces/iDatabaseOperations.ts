export interface ICreate<T> {
  create(item: T): Promise<T | null>;
}

export interface IDelete {
  delete(id: number): Promise<Boolean>;
}

export interface IGetById<T> {
  getById(id: string): Promise<T | null>;
}

export interface IGetByName<T> {
  getByName(name: string): Promise<T[]>;
}

export interface IGetAll<T>{
  getAll(): Promise<T[]>
}