import { IDatabase } from "../interface/IDataBase";

export interface Repository<T> {
    database: IDatabase;
}