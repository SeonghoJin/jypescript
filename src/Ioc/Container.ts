import { Clazz, TypeGuard } from "../interface";

export const Container = new class {

    container: Map<Clazz, any>;
    injectable: Set<Function>;

    constructor() {
        this.container = new Map<Clazz, any>();
        this.injectable = new Set<Function>();
    }

    createInstance(clazz: Clazz, ...args: any[]) {
        const item = new clazz(...args);
        this.container.set(clazz, item);
        return item;
    }

    set(clazz: Clazz, ...args: any[]) {
        let item = this.container.get(clazz);
        if (item != null) {
            return item;
        }
        item = this.createInstance(clazz, args);
        this.resolve(item);
        return item;
    }

    get(clazz: Clazz, ...args: any[]): Clazz | null {
        let item = this.container.get(clazz);
        if (item == null) {
            item = this.createInstance(clazz, args);
        }
        return item;
    }

    getBeanByTypeGuard<T>(typeGuard: TypeGuard<T>): T | null {
        let item: T | null = null;

        this.container.forEach((value) => {
            if (typeGuard(value)) {
                item = value;
                return;
            }
        });

        return item;
    }

    resolve(item: any) {
        this.injectable.forEach((callback) => {
            if (callback(item)) {
                this.injectable.delete(callback);
            }
        });
    }

    insertInjectable(callback: Function) {
        this.injectable.add(callback);
    }

}
