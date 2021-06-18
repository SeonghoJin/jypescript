import nedb from 'nedb'
import { IDatabase, IDatabaseConfig } from '../interface'

export class NeDB implements IDatabase {
    private db: nedb
    constructor(config: IDatabaseConfig) {
        this.db = new nedb({
            filename: 'nedb/' + config.name,
            autoload: true
        })
    }
    remove(query: any): Promise<any> {
        return new Promise<void>((res, rej) => {
            this.db.remove(query, {}, () => {
                res();
            })
        })
    }

    getAllData(): Promise<any[]> {
        return new Promise<any[]>((res, rej) => {
            res(this.db.getAllData());
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

    update(query: any, updateQuery?: any): Promise<void> {
        return new Promise<void>((res, rej) => {
            this.db.update(query, updateQuery, { multi: true }, function (err, numReplaced) {
                res();
            })
        })
    }

}
