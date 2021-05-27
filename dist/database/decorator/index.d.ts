import { Clazz, IDBconfig } from "../../interface";
export declare const Connect: (config: IDBconfig, database?: Clazz | undefined) => (target: any, propertyKey: any) => void;
