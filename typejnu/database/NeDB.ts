import nedb from 'nedb'
import { IDBconfig } from './interface/DBconfig'
import { IDatabase } from './interface/IDataBase'

export class NeDB implements IDatabase {
    private db: nedb
    constructor(config: IDBconfig) {
        this.db = new nedb({
            filename: 'nedb/' + config.DB_NAME,
            autoload: true
        })
    }

    insert(data: any): Promise<void> {
        return new Promise<void>((res, rej) => {
            this.db.insert(data, (err, doc: any) => {
                res();
            })
        })
    }

    find(query: any): Promise<any[]> {
        return new Promise<any[]>((res, rej) => {
            this.db.find(query, (err: Error, doc: any[]) => {
                res(doc);
            })
        })
    }

}
