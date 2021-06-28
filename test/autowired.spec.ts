import { expect, assert } from "chai";
import { AutoWired, TypeGuard } from "../dist";

interface IClass {
    test: () => void;
};
const isIclass: TypeGuard<IClass> = (arg: any): arg is IClass => {
    return arg.test != null;
}
class A { };
class B implements IClass {
    test: () => void
    constructor() {

        this.test = () => {
            console.log(1);
        }
    }
};
class C {
    @AutoWired()
    a: A;
    @AutoWired()
    b: B;
}
try {
    class AutoWiredTest {

        @AutoWired()
        a1: A;

        @AutoWired({
            class: A
        })
        a2: A;

        a3: A = new A();

        @AutoWired({
            typeGuard: isIclass
        })
        b1: B

        @AutoWired()
        b2: B

        b3 = new B();

        @AutoWired()
        c: C;

        constructor() {
        }
    }

    const autoWiredTest = new AutoWiredTest();

    describe("autoWiredTest", () => {
        it("class AutoWired Test", () => {
            assert.instanceOf(autoWiredTest.a1, A, "a1 is " + autoWiredTest.a1)
            assert.instanceOf(autoWiredTest.a2, A, "a2 is " + autoWiredTest.a2)
            assert.instanceOf(autoWiredTest.a3, A, "a3 is " + autoWiredTest.a3)
            assert.strictEqual(autoWiredTest.a1, autoWiredTest.a2, autoWiredTest.a1 + " " + autoWiredTest.a2);
            assert.notStrictEqual(autoWiredTest.a2, autoWiredTest.a3, autoWiredTest.a2 + " " + autoWiredTest.a3)
        })

        it("interface AutoWired Test", () => {
            assert.instanceOf(autoWiredTest.b1, B, "b1 is an instance of B");
            assert.instanceOf(autoWiredTest.b2, B, "b2 is an instance of B");
            assert.instanceOf(autoWiredTest.b3, B, "b3 is an instance of B");
            assert.strictEqual(autoWiredTest.b1, autoWiredTest.b2, "b1 is equal b2");
            assert.notStrictEqual(autoWiredTest.b2, autoWiredTest.b3, "b2 is not equal b3");
        });

        it("property autowired Test", () => {
            assert.instanceOf(autoWiredTest.c, C, "c is an instance of C");
            assert.instanceOf(autoWiredTest.c.a, A, "c.a is an instance of A");
            assert.instanceOf(autoWiredTest.c.b, B, "c.a is an instance of B");
        });

    })

} catch (e) {
    it("create AutoWired Test fail", () => {
        expect.fail(e.message);
    })
}

