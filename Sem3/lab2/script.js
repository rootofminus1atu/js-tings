function functionExample() {
    let x = 3
    let y = "hello"
    let z = true

    alert(typeof(x))
    alert(typeof(y))
    alert(typeof(z))

    alert(`The contents of x are ${x} y contains ${y} and the variable z holds ${z}`)

    y = 22.723
    alert(typeof(y))
    alert(`The variable y now holds ${y}`)
}

function anotherFunction() {
    let x = 3

    for (var i = 0; i <= x; i++) {
        document.write(i);
    }

    alert(`The value of i is now ${i}`)
    alert(`The value of x is now ${x}`)

    // with `let`, the variable i dies right after the for loop
    // to keep it for the duration of the whole function we can use `var`
}