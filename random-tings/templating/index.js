const root = document.getElementById("root")

const myDoc = {
    header: {
        h1: "Welcome to main page"
    },
    nav: {
        ul: {
            li: {
                p: "page 1"
            },  // issue: can't have multiple elements like this in 1 obj
            li: {
                p: "page 2"
            },
        },
    },
    input: "this is input?" // not working for single tag elements

}

function checkIfObj(thing) {
    return typeof thing === "object" && thing !== null && !Array.isArray(thing)
}

function render(doc, parent) {
    for (let [elemName, elemContent] of Object.entries(doc)) {

        if (checkIfObj(elemContent)) {
            const newElement = document.createElement(elemName)
            parent.appendChild(newElement)
            render(elemContent, newElement)
        } else {
            const newElem = document.createElement(elemName);
            newElem.innerText = elemContent;
            parent.appendChild(newElem)
        }
        
    }
}

render(myDoc, root)