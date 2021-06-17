
export interface TypeGuard<T> { (object: any): object is T }

export interface IDatabaseConfig {
    port?: string | undefined,
    host?: string | undefined,
    user?: string | undefined,
    password?: string | undefined,
    name?: string | undefined,
}

export interface IDatabase {
    find(query: any): Promise<any[]>
    insert(data: any): Promise<any>
    getAllData(): Promise<any[]>
}

export const isIDatabase: TypeGuard<IDatabase> = (database: any): database is IDatabase => {
    return (<IDatabase>database).find !== undefined
        && (<IDatabase>database).insert !== undefined
}

export interface Repository<T> {
    database: IDatabase;
}

export interface Clazz {
    new(...args: any[]): any
}

export interface GenericClazz<T> {
    new(...args: any[]): any
}