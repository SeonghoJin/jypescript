import { TypeGuard } from "../../interface/TypeGuard"

export interface IDatabase {
    find(query: any): Promise<any>
    insert(data: any): Promise<any>
}

export const isIDatabase: TypeGuard<IDatabase> = (database: any): database is IDatabase => {
    return (<IDatabase>database).find !== undefined
        && (<IDatabase>database).insert !== undefined
}