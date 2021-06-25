import { expect, assert } from "chai";
import { AutoWired, TypeGuard } from "../dist";

interface IClass {
    test: string;
};
const isIclass: TypeGuard<IClass> = (arg: any): arg is IClass => {
    return arg.test != null;
}
class A { };
class B implements IClass {
    test: "test";
};
class C {
    a: A;
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
            describe("autoWiredTest", () => {
                it("class AutoWired Test", () => {
                    assert.instanceOf(this.a1, A, "a1 is an instance of A")
                    assert.instanceOf(this.a2, A, "a2 is an instance of A")
                    assert.instanceOf(this.a3, A, "a3 is an instance of A")
                    assert.strictEqual(this.a1, this.a2, "a1 is equal a2")
                    assert.notStrictEqual(this.a2, this.a3, "a2 is not equal a3")
                })

                it("interface AutoWired Test", () => {
                    assert.instanceOf(this.b1, B, "b1 is an instance of B");
                    assert.instanceOf(this.b2, B, "b2 is an instance of B");
                    assert.instanceOf(this.b3, B, "b3 is an instance of B");
                    assert.strictEqual(this.b1, this.b2, "b1 is equal b2");
                    assert.notStrictEqual(this.b2, this.b3, "b2 is not equal b3");
                });

                it("property autowired Test", () => {
                    assert.instanceOf(this.c, C, "c is an instance of C");
                    assert.instanceOf(this.c.a, C, "c.a is an instance of A");
                    assert.instanceOf(this.c.b, B, "c.a is an instance of B");
                });

            })
        }
    }

    new AutoWiredTest();
} catch (e) {
    it("create AutoWired Test fail", () => {
        expect.fail(e.message);
    })
}
