import { Clazz, TypeGuard } from "../interface";
export declare const Container: {
    container: Map<Clazz, any>;
    set(clazz: Clazz, ...args: any[]): any;
    get(clazz: Clazz, ...args: any[]): Clazz | null;
    getBeanOfInterface<T>(typeGuard: TypeGuard<T>): T | null;
};
