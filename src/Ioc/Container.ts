import { Clazz, TypeGuard } from "../interface";

export const Container = new class {

    container: Map<Clazz, any>;

    constructor() {
        this.container = new Map<Clazz, any>();
    }

    createInstance(clazz: Clazz, ...args: any[]) {
        return new clazz(...args);
    }

    set(clazz: Clazz, ...args: any[]) {
        let item = this.container.get(clazz);
        if (item != null) {
            return item;
        }
        item = this.createInstance(clazz, args);
        this.container.set(clazz, item);
        return item;
    }

    get(clazz: Clazz, ...args: any[]): Clazz | null {
        let item = this.container.get(clazz);
        if (item == null) {
            item = this.createInstance(clazz, args);
            this.container.set(clazz, item);
        }
        return item;
    }

    getBeanByTypeGuard<T>(typeGuard: TypeGuard<T>): T | null {
        let item: T | null = null;

        this.container.forEach((value, key) => {
            if (typeGuard(value)) {
                item = value;
                return;
            }
        });

        return item;
    }

}
