/* 

Task 1

*/

function processLoop() {
    alert("In function processLoop")

    let mainCount = 0
    let subCount = 0

    for (mainCount = 10; mainCount >= 6; mainCount--) {
        document.write(`Main Counter is at value ${mainCount} <br>`)
    }

    document.write("End of first loop <br>")

    for (mainCount = 3; mainCount >= 0; mainCount--) {
        for (subCount = 4; subCount >= 0; subCount--) {
            document.write(`Main Counter is at value ${mainCount} and Sub Counter is at value ${subCount} <br>`)
        }
    }
}

/* 

Task 2

*/

function processIf() {
    alert("In function processIf")

    let num1 = 0
    let num2 = 0
    let num3 = 0

    num1 = parseInt(prompt("Enter a number: "))
    num2 = parseInt(prompt("Enter another number: "))
    num3 = parseInt(prompt("Enter yet another number: "))

    const largest = findLargest(num1, num2, num3)

    document.write(`The largest number is ${largest}`)
}

function findLargest(n1, n2, n3) {
    let largest = n1

    if (n2 > largest) {
        largest = n2
    } 
    
    if (n3 > largest) {
        largest = n3
    }

    return largest
}

function drawShapes() {
    let block = '#'

    // check getC for Task 3
    let c = getC()
    let k = getK(block, 21)
    let y = getY(block, 25)

    document.write(`I think this is a reversed C <br> ${c} <br> K <br> ${k} <br> Y <br> ${y}`)
}

/* 

Task 3 below

*/

function getC() {
    // I added <pre></pre> so that the spacing is consistent
    let str = "<pre>"

    // the block used to draw the shape
    let block = '#'

    // the loop that draws a line for each iteration
    for (let i = 0; i < 7; i++) {

        // if we're in the first or last line
        if (i == 0 || i == 6) {

            // draw 7 blocks
            str += block.repeat(7)

        // otherwise
        } else {

            // draw 1 block after 6 spaces
            str += " ".repeat(6) + block
        }

        // add a line break to go to the next line
        str += "<br>"
    }

    // closing the pre tag
    str += "</pre>"

    // returning the string that can then be displayed in drawShapes()
    return str
}

/*

Task 4 below

*/

function getK(block, size) {
    let str = "<pre>"

    for (let i = 0; i < size; i++) {
        let middleAmount = Math.abs(Math.floor(size / 2) - i)
        let middle = " ".repeat(middleAmount)

        str += block + middle + block

        str += "<br>"
    }

    str += "</pre>"

    return str
}

function getY(block, size) {
    let str = "<pre>"
    
    for (let i = 0; i < size; i++) {
        let sideAmount = i;
        let middleAmount = size - 2 - 2 * sideAmount;

        if (middleAmount >= 0) {
            let side = " ".repeat(sideAmount);
            let middle = " ".repeat(middleAmount);

            str += side + block + middle + block + side;
        } else {
            let halfAmount = Math.floor(size / 2);
            let side = " ".repeat(halfAmount);

            str += side + block + side;
        }

        str += "<br>";
    }

    str += "</pre>"

    return str
}