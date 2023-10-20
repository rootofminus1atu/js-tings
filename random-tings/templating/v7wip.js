

function checkIfString(thing) {
    return typeof thing === "string"
}

function checkIfCallback(thing) {
    return typeof thing === "function"
}

function checkIfObj(thing) {
    return typeof thing === "object" && thing !== null && !Array.isArray(thing)
}

// Builds the HTML tree from the JSON data provided as the argument
function buildHTML(...data) {
    return data.map((item) => createElement(item))
}

// Helper function to erase everything inside an element
function killChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

// Wrapper to make appending data more convenient
function appendDataToElement(element, ...data) {
    element.append(...buildHTML(...data))
}

// Wrapper to make setting data more convenient
function setDataToElement(element, ...data) {
    killChildren(element)
    element.append(...buildHTML(...data));
}

// Creates an HTML element from the JSON data
function createElement(elementData) {
    const element = document.createElement(elementData.tag);

    if (elementData.props) {
        for (const [propName, prop] of Object.entries(elementData.props)) {
            element.setAttribute(propName, prop)
        }
    }

    if (elementData.events) {
        for (const [eventName, event] of Object.entries(elementData.events)) {
            
            const reactiveEvent = () => {
                event()
                // additional code so that the proper nodes get updated
                // which nodes? 
                // maybe run a traversal to see where ... where what is used?
                // I need to know what's used too

                // maybe... run the event that contains signals
                // which would trigger getters/setters in the signals
                
                // so I need to extract all the dependencies from the original event
                // but how do I do it without mutating the state?
                // or maybe by mutating it forwards and then backwards?
                // can that even be done?

                // CHECK THE CLICK EVENT COMMENT
            }
            // OR MAYBE
            // WE DONT NEED TO DO STUFF HERE
            // maybe instead we wrap the usage in an effect
            // and that effect would subscribe
            // look at signals-tutorial again

            element.addEventListener(eventName, reactiveEvent)
        }
    }

    if (elementData.children) {
        elementData.children.map((childData) => {
            if (checkIfObj(childData)) {
                const newElem = createElement(childData)
                element.appendChild(newElem)
            } else {
                const newText = document.createTextNode(childData)
                element.appendChild(newText)
            }
        })
    }

    return element;
}


let tracker = 0

class Signal {
    constructor(value) {
        this._value = value; // Use a distinct instance property name
        this._tracker = tracker;
        tracker++;
        console.log(`constructed signal with tracker: ${this._tracker}`);
    }

    get value() {
        console.log(`this.value accessed: ${this._value}`);
        return this._value; // Access the instance property, not the getter
    }

    set value(value) {
        console.log(`this.value set: : ${this._value} -> ${value}`);
        this._value = value; // Set the instance property, not the getter
    }

    get tracker() {
        console.log(`this.tracker accessed: ${this._tracker}`);
        return this._tracker; // Access the instance property, not the getter
    }

    set tracker(tracker) {
        console.log(`this.tracker set ${this._tracker} -> ${tracker}`);
        this._tracker = tracker; // Set the instance property, not the getter
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
                        console.log(`console.log in click: ${count.value}`)
                        // this step needs to be automated
                        // document.getElementById(count.tracker).innerText = `The count.value is ${count.value}`
                    
                        // I might need a dependency array instead of executing this
                        // and capturing
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
    console.log("in display")
    return {
        tag: 'h1',
        props: {
            id: `${count.tracker}`
        },
        children: [
            // effect(() => "text {count.value}") something liek that
            `The count is `,
            count.value  // wrap this in an effect... somehow
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





