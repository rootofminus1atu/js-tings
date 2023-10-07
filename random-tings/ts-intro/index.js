console.log("hi");
async function helloo() {
    return 'world';
}
let h = 4;
let j = "hi";
j = 5; // wouldn't work without any
let font = 'bold';
const person1 = {
    first: 'Jeff',
    last: 'J'
};
const person2 = {
    first: "Joe",
    last: 'J',
    fast: true,
    age: 24
};
function pow(x, y) {
    return Math.pow(x, y).toString();
}
function sideEffect(name) {
    console.log("Hello, ", name);
}
const arr = [];
arr.push(1);
arr.push(23);
const arrT = [];
arrT.push(23);
arrT.push(6);
arrT.push(5); // erm
console.log(arrT);
function RevArr(arr) {
    const copy = [...arr];
    copy.reverse();
    return copy;
}
var OptionKind;
(function (OptionKind) {
    OptionKind[OptionKind["Some"] = 0] = "Some";
    OptionKind[OptionKind["None"] = 1] = "None";
})(OptionKind || (OptionKind = {}));
function Some(value) {
    return { kind: OptionKind.Some, value };
}
function None() {
    return { kind: OptionKind.None };
}
export {};
