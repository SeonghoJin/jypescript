import { assert } from "chai";
import { AutoWired, TypeGuard } from "../dist";

interface iclass{
    prop : string;
}
const isIclass : TypeGuard<iclass> = (object : any) : object is iclass => {
    return object.prop !== undefined;
}
class A{}
class B implements iclass{
    prop : string = "123";
}

class Test{

    @AutoWired()
    a1 : A

    @AutoWired()
    a2 : A

    @AutoWired({class : A})
    a3 : A

    @AutoWired({typeGuard : isIclass})
    b1 : iclass

    @AutoWired({class : B})
    b2 : iclass

    @AutoWired()
    b3 : iclass

    constructor(){
        describe("DI test", () => {
            it('A istance is singleton', () => {
                assert.notStrictEqual(this.a1, undefined, "a1 is undefined");
                assert.strictEqual(this.a1, this.a2);
                assert.strictEqual(this.a2, this.a3);
            });

            it('interface type inject instance test', () => {
                assert.notStrictEqual(this.b1 , undefined, "b1 is undefined");
                assert.notStrictEqual(this.b2, undefined, "b2 is undefined");
                assert.strictEqual(this.b3, undefined, "b3 is undefined");
            });

            it('interface type singleton test', () => {
                assert.equal(this.b1, this.b2);
            });

        })

    }
}

new Test();