import { TypeGuard } from "./TypeGuard";

export interface Clazz {
    new(...args: any[]): any
}

export interface GenericClazz<T> {
    new(...args: any[]): any
}