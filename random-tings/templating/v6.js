

function checkIfString(thing) {
    return typeof thing === "string"
}

function checkIfCallback(thing) {
    return typeof thing === "function";
}

function checkIfObj(thing) {
    return typeof thing === "object" && thing !== null && !Array.isArray(thing)
}

// Builds the HTML tree from the JSON data provided as the argument
function buildHTML(...data) {
    return data.map((item) => createElement(item));
}

// Helper function to erase everything inside an element
function killChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Wrapper to make appending data more convenient
function appendDataToElement(element, ...data) {
    element.append(...buildHTML(...data));
}

// Wrapper to make setting data more convenient
function setDataToElement(element, ...data) {
    killChildren(element);
    element.append(...buildHTML(...data));
}

// Creates an HTML element from the JSON data
function createElement(elementData) {
    const element = document.createElement(elementData.tag);

    if (elementData.props) {
        for (const [propName, prop] of Object.entries(elementData.props)) {
            element.setAttribute(propName, prop);
        }
    }

    if (elementData.events) {
        for (const [eventName, event] of Object.entries(elementData.events)) {
            element.addEventListener(eventName, event)
        }
    }

    if (elementData.children) {
        elementData.children.map((childData) => {
            if (checkIfObj(childData)) {
                const newElem = createElement(childData);
                element.appendChild(newElem);
            } else {
                const newText = document.createTextNode(childData)
                element.appendChild(newText)
            }
        });
    }

    return element;
}


let tracker = 0

class Signal {
    constructor(value) {
        this.value = value
        this.tracker = tracker
        tracker++
        console.log(tracker)
    }
}


function myElem() {
    let count = new Signal(0)
    console.log(count)

    return {
        tag: "div",
        children: [
            {
                tag: 'button',
                events: {
                    click: () => {
                        count.value++
                        console.log(count.value)
                        // this step needs to be automated
                        document.getElementById(count.tracker).innerText = `The count.value is ${count.value}`
                    }
                },
                children: [
                    "click me"
                ]
            },
            myDisplay(count)
        ],
    };
}



function myDisplay(count) {
    return {
        tag: 'h1',
        props: {
            id: `${count.tracker}`
        },
        children: [
            `The count is `,
            count.value
        ]
    }
}

const root = document.getElementById("root");

function render() {
    setDataToElement(root, myElem(), myElem());
}

render();


/*
Importantly, when the button is clicked and the value is incremented, the framework only needs to update the text node from 0 to 1. 
It can do that because, during the initial rendering of the template, the Signal has learned the count.value has been accessed by the text node only. 
Therefore it knows that if the value of the count changes, it only needs to update the text node and nothing else.

during the initial render - important
*/

