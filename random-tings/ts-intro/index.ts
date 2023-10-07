import * as _ from 'lodash';

console.log("hi")

async function helloo() {
    return 'world'
}

let h: number = 4

let j: any = "hi"
j = 5  // wouldn't work without any



type Style = 'bold' | 'italic'

let font: Style = 'bold'




interface Person {
    first: string,
    last: string,
    [key: string]: any
}


const person1: Person = {
    first: 'Jeff',
    last: 'J'
}

const person2: Person = {
    first: "Joe",
    last: 'J',
    fast: true,
    age: 24
}




function pow(x: number, y: number): string {
    return Math.pow(x, y).toString()
}

function sideEffect(name: string): void {
    console.log("Hello, ", name)
}




const arr: number[] = []

arr.push(1)
arr.push(23)





type MyList = [number?, number?]

const arrT: MyList = []
arrT.push(23)
arrT.push(6)
arrT.push(5) // erm

console.log(arrT)






function RevArr<T>(arr: T[]): T[] {
    const copy = [...arr]
    copy.reverse()
    return copy
}



type Option<T> = Some<T> | None;

enum OptionKind {
  Some,
  None,
}

interface Some<T> {
  kind: OptionKind.Some;
  value: T;
}

interface None {
  kind: OptionKind.None;
}

function Some<T>(value: T): Some<T> {
  return { kind: OptionKind.Some, value };
}

function None(): None {
  return { kind: OptionKind.None };
}