import { IDatabase, IDBconfig } from '../interface';
export declare class NeDB implements IDatabase {
    private db;
    constructor(config: IDBconfig);
    insert(data: any): Promise<void>;
    find(query: any): Promise<any[]>;
}
