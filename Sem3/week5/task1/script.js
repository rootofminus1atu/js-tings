"use strict"

let interval

document.getElementById("div-button").addEventListener("click", () => {
    clearInterval(interval)
    interval = setInterval(spawnDiv, 500)
})

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(interval)
})

document.getElementById("reset").addEventListener("click", () => {
    const divs = document.getElementsByClassName("new-div")
    Array.from(divs).forEach(div => div.remove())
})


function spawnDiv() {
    const myDiv = newDiv()

    myDiv.appendChild(newPar())

    appendToRoot(myDiv)
}


function newDiv() {
    const div = document.createElement("div")
    div.classList.add("new-div")

    return div
}

function newPar() {
    const p = document.createElement("p")
    p.innerText = "New paragraph in New div"
    p.classList.add("new-p")

    return p
}

function appendToRoot(elem) {
    const root = document.getElementById("root")
    root.appendChild(elem)
}