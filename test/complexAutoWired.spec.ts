import { expect, assert } from "chai";
import {AutoWired, TypeGuard} from "../dist";

class A{}
class B{
    @AutoWired()
    a : A;
}
class C{
    @AutoWired()
    b : B;
}
interface IA{testA : () => void;}
const isIA : TypeGuard<IA> = (object : any) : object is IA => {
    return object.testA != null;
}
interface IB{testB : () => void}
const isIB : TypeGuard<IB> = (object : any) : object is IB => {
    return object.testB != null;
}
class CA implements IA{
    constructor() {
    }
    testA = () => {}
}

class CB implements IB{
    constructor() {
    }
    @AutoWired()
    ca : CA;

    @AutoWired(
        {typeGuard : isIA}
    )
    ia : IA

    @AutoWired()
    c : C

    testB = () => {}
}

class D extends A{
    @AutoWired({
        typeGuard : isIB
    })
    cb : IB

    @AutoWired()
    ccb : CB
}

class F extends B{
    @AutoWired({class : D})
    d : A
}

describe("ComplexAutoWiredTest", () => {
    const testInstance = new F();
    it("ComplexInstance test", () => {
        const testInstance2 = new F();
        assert.notStrictEqual(testInstance, testInstance2, "these are not strict equal");
        assert.instanceOf(testInstance, B, "testInstance is an instance of B");
        assert.instanceOf(testInstance, F, "testInstance is an instance of F");
    });

    it("ComplexdInstance d of B test", () => {
        const testInstance2 = new F();
        assert.strictEqual(testInstance.d, testInstance2.d, "these are strict equal");
        assert.instanceOf(testInstance.d, A, "this is an instance of A");
        assert.instanceOf(testInstance.d, D, "this is an instance of A");
    });

    it("ComplexInstance property test d.cb", () => {
        const testInstacne2= new F();
        const dOfTestInstacne = testInstance.d as D;
        const dofTestInstance2 = testInstacne2.d as D;
        assert.isNotEmpty(dOfTestInstacne.cb, "this is not Empty");
        assert.strictEqual(dOfTestInstacne.cb, dofTestInstance2.cb, "these are strict equal");
        assert.strictEqual(dOfTestInstacne.cb, dOfTestInstacne.ccb, "these are strict equal");
        assert.instanceOf(dOfTestInstacne.cb, CB, "this is an instance of CB");
        assert.notInstanceOf(dOfTestInstacne.cb, CA, "this isn't an instance of CA");
    });

    it("ComplexInstance property test d.cb.c", () => {
        const testInstanceProperty = ((testInstance.d as D).cb as CB).c;
        assert.instanceOf(testInstanceProperty, C, "this is an instance of C");
        assert.instanceOf(testInstanceProperty.b, B, "this is an instance of B");
        assert.instanceOf(testInstanceProperty.b.a, A, "this is an instance of A");
    });

})

