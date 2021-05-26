import { Clazz } from "../interface/Clazz";
import { TypeGuard } from "../interface/TypeGuard";


export default new class {
    private container: Map<Clazz, any>;
    constructor() {
        this.container = new Map<Clazz, any>();
    }

    set(clazz: Clazz, ...args: any[]) {
        let item = this.container.get(clazz);
        if (item !== undefined) {
            return item;
        }
        item = new clazz(...args);
        this.container.set(clazz, item);
        return item;
    }

    get(clazz: Clazz, ...args: any[]): Clazz | null {
        let item = this.container.get(clazz);
        if (item === undefined) {
            item = new clazz(...args);
            this.container.set(clazz, item);
        }
        return item;
    }

    getBeanOfInterface<T>(typeGuard: TypeGuard<T>): T | null {
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
