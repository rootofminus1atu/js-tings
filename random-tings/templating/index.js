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
            // check if Element object instead
            // god I need ts already
            if (childData instanceof Effect) {
                console.log(childData)

                // create a function bound to the current element
                // or store it somewhere so that it gets added to the reactiveEvent from above

                childData = childData.content
            } 
            
            if (checkIfObj(childData)) {
                const newElem = createElement(childData)
                element.appendChild(newElem)
            } else if (checkIfString(childData)) {
                const newText = document.createTextNode(childData)
                element.appendChild(newText)
            } else {
                console.error("lol wrong thing")
            }
        })
    }

    return element;
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
            }

            element.addEventListener(eventName, reactiveEvent)
        }
    }

    if (elementData.children) {
        elementData.children.map((childData) => {
            if (childData instanceof Effect) {
                console.log(childData)

                // create a function bound to the current element
                // or store it somewhere so that it gets added to the reactiveEvent from above

                childData = childData.content
            } 
            
            if (checkIfObj(childData)) {
                const newElem = createElement(childData)
                element.appendChild(newElem)
            } else if (checkIfString(childData)) {
                const newText = document.createTextNode(childData)
                element.appendChild(newText)
            } else {
                console.error("lol wrong thing")
            }
        })
    }

    return element;
}

class Effect {
    constructor(content) {
        this.content = content
    }

    subscribe(signal) {
        signal.dependencies.add(this)
        return this
    }
}

class Signal {
    constructor(value) {
        this._value = value;
        this.dependencies = new Set()
        console.log(`constructed signal`);
    }

    get value() {
        console.log(`this.value accessed: ${this._value}`);
        return this._value;
    }

    set value(value) {
        console.log(`this.value set: : ${this._value} -> ${value}`);
        this._value = value;
    }
}




let tracker = 0

class Signal {
    constructor(value) {
        this._value = value;
        this._tracker = tracker;
        this.dependencies = new Set()
        tracker++;
        console.log(`constructed signal with tracker: ${this._tracker}`);
    }

    get value() {
        console.log(`this.value accessed: ${this._value}`);
        return this._value;
    }

    set value(value) {
        console.log(`this.value set: : ${this._value} -> ${value}`);
        this._value = value;
    }

    get tracker() {
        console.log(`this.tracker accessed: ${this._tracker}`);
        return this._tracker;
    }

    set tracker(tracker) {
        console.log(`this.tracker set ${this._tracker} -> ${tracker}`);
        this._tracker = tracker;
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


class Effect {
    constructor(content) {
        this.content = content
    }

    subscribe(signal) {
        signal.dependencies.add(this)
        return this
    }
}


function myDisplay(count) {
    console.log("in display")
    return {
        tag: 'h1',
        props: {
            id: `${count.tracker}`
        },
        children: [
            // subscribing can be done automatically later
            new Effect(`The count is ${count.value}`).subscribe(count)
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