// Annotation de type
const age: number = 23; 
// Annotation type parmétre/retour.
function wrap(value: string): { value: string } { 
    return { value };
}
// Inférence
const result = wrap("superValue") 
interface MyObject {
    prop1: string,
    values: Record<string, number>
}
const myObject: MyObject = {
    prop1: 12 as any, // Assertion de type
    values: {
        one: 1,
        two: 2,
    } satisfies Record<"one" | "two", unknown> // Annotation secondére,
}
class SuperClass implements MyObject { // Implémentation
    prop1: string = "12";
    values: Record<string, number> = {};
}
abstract class OtherClass {
    abstract superMethods(value: number): string
}
class SubClass extends OtherClass { // Abstraction
    superMethods(value: number): string {
        return value.toString();
    }
}
// Predicate
function isString(value: unknown): value is string {
    return typeof value === "string";
}
function assertsNumber(value: unknown): asserts value is string {
    if(typeof value !== "number") {
        throw new Error("is not number");
    }
}