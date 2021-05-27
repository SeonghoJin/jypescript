export interface Clazz {
    new (...args: any[]): any;
}
export interface GenericClazz<T> {
    new (...args: any[]): any;
}
export interface TypeGuard<T> {
    (object: any): object is T;
}
export interface IDBconfig {
    DB_PORT: string | undefined;
    DB_HOST: string | undefined;
    DB_PROT: string | undefined;
    DB_USER: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_NAME: string | undefined;
}
export interface IDatabase {
    find(query: any): Promise<any>;
    insert(data: any): Promise<any>;
}
export declare const isIDatabase: TypeGuard<IDatabase>;
export interface Repository<T> {
    database: IDatabase;
}
