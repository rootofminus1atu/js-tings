class Signal {
    _value
    dependencies

    constructor(initValue) {
        this.dependencies = new Set()
        this._value = initValue
    }

    get value() {
        if (RUNNING) {
            this.dependencies.add(RUNNING)
        }
        return this._value
    }

    set value(newValue) {
        if (this._value === newValue) {
            return
        }
        this._value = newValue
        this.notify()
    }

    notify() {
        for (const dependency of this.dependencies) {
            dependency.update()
        }
    }
}

class Computed {
    _value
    computeFn
    isStale

    constructor(computeFn) {
        console.log(`Creating Computed with ${computeFn}`)
        this.computeFn = computeFn
        this.isStale = true
        console.log(this)
        runAndExtractDependencies(this)
    }

    get value() {
        if (this.isStale) {
            this._value = this.computeFn()
            this.isStale = false
        }
        return this._value
    }

    execute() {
        this.computeFn()
    }

    update() {
        this.isStale = true
    }
}

class Effect {
    effectFn

    constructor(effectFn) {
        this.effectFn = effectFn
        runAndExtractDependencies(this)
    }

    execute() {
        this.effectFn()
    }

    update() {
        this.execute()
    }
}

let RUNNING = null

function runAndExtractDependencies(task) {
    console.log(`The task: ${RUNNING}`)
    RUNNING = task
    console.log(`The task after assigning: ${RUNNING}`)
    task.execute()
    console.log(`The task after executing `)
    RUNNING = null
}

// Creates an HTML element from the JSON data
function createElement(elementData) {
    const element = document.createElement(elementData.tag);

    if (elementData.props) {
        for (const propName in elementData.props) {
            element.setAttribute(propName, elementData.props[propName]);
        }
    }

    if (elementData.text) {
        const textNode = document.createTextNode(elementData.text);
        element.appendChild(textNode);
    }

    if (elementData.children) {
        elementData.children.forEach((childData) => {
            const newElem = createElement(childData);
            element.appendChild(newElem);
        });
    }

    return element;
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

// Render the UI based on the current state
function render() {
    setDataToElement(root, myElem());
}

const root = document.getElementById("root");

function myElem() {
    return {
        tag: "div",
        props: {
            class: "hi-class",
        },
        children: [
            {
                tag: "button",
                props: {
                    id: "count-button",
                    onclick: 'setCount(getCount() + 1)'
                },
                children: [
                    `count is 2`
                ],
            },
        ],
    };
}

// Initial render
render();
