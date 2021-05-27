import mysql from 'mysql2';
import { IDatabase, IDBconfig } from '../interface/index.js';

export class MySQL implements IDatabase {

    private connection;

    constructor(config: IDBconfig) {
        this.connection = mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        })
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