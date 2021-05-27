import { IDatabase, IDBconfig } from '../interface/index.js';
export declare class MySQL implements IDatabase {
    private connection;
    constructor(config: IDBconfig);
    find(query: any): Promise<any[]>;
    insert(data: any): Promise<void>;
}
