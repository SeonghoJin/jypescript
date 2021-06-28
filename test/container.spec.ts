import { assert } from "chai";
import { Container, TypeGuard } from "../dist";

class A { }
interface IB {
    test: () => void;
}
class B implements IB {
    test = () => {
        console.log(1);
    }
}

const IBTypeGuard: TypeGuard<IB> = (arg: any): arg is IB => {
    return arg.test != null;
}


describe("Container test", () => {
    it("container get test", () => {
        assert.instanceOf(Container.get(A), A, "this is an instance of A");
        assert.instanceOf(Container.get(B), B, "this is an instance of B");
    });

    it("container set test", () => {
        assert.instanceOf(Container.set(A), A, "this is an instance of A");
        assert.instanceOf(Container.set(B), B, "this is an instance of B");
    })

    it("container singleton test", () => {
        assert.strictEqual(Container.get(A), Container.set(A), "there are A");
        assert.strictEqual(Container.get(B), Container.set(B), "there are B");
    });

    it("container getBeanByTypeGuard test", () => {
        const instance = Container.getBeanByTypeGuard(IBTypeGuard);
        assert.instanceOf(instance, B, "this is an " + instance);
    })

})