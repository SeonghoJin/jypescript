import mysql from 'mysql2';
import { IDatabase, IDatabaseConfig } from '../interface/index.js';

export class MySQL implements IDatabase {

    private connection;

    constructor(config: IDatabaseConfig) {
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.name
        })
    }
    update(query: any, updateQuery?: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getAllData(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }

    find(query: any): Promise<any[]> {
        this.connection.query("desc table");
        throw new Error("Method not implemented.");
    }
    insert(data: any): Promise<void> {
        this.connection.query("desc table");
        throw new Error("Method not implemented.");
    }
}