class Signal {
    constructor(value) {
        this._value = value;
        this._subscribers = new Set(); // Track subscribers (components/elements)
    }

    get value() {
        // When the value is accessed, track the dependency.
        if (currentComponent) {
            this._subscribers.add(currentComponent);
        }
        return this._value;
    }

    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            // Trigger updates for all subscribers.
            this._subscribers.forEach((subscriber) => subscriber.update());
        }
    }
}

let currentComponent = null;

class Component {
    constructor(renderFunction) {
        this.render = renderFunction;
        this.update(); // Initial render and subscription to Signals
    }

    update() {
        currentComponent = this;
        this._element = this.render();
        currentComponent = null;
    }

    getElement() {
        return this._element;
    }
}

// Custom createElement function
function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    if (props) {
        for (const [propName, prop] of Object.entries(props)) {
            if (propName === "events" && typeof prop === "object") {
                // Handle event properties
                for (const [eventName, eventCallback] of Object.entries(prop)) {
                    element.addEventListener(eventName, eventCallback);
                }
            } else {
                element.setAttribute(propName, prop);
            }
        }
    }

    if (children) {
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Element) {
                element.appendChild(child);
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
    }

    return element;
}

// Your code
function myElem() {
    return new Component(() => {
        let count = new Signal(0);
        return {
            tag: "div",
            children: [
                {
                    tag: 'button',
                    events: {
                        click: () => {
                            count.value++;
                        }
                    },
                    children: [
                        "click me"
                    ]
                },
                myDisplay(count).render()
            ],
        };
    });
}

function myDisplay(countSignal) {
    return new Component(() => {
        return {
            tag: 'h1',
            children: [
                `The count is `,
                countSignal.value
            ]
        };
    });
}

const root = document.getElementById("root");

function render2() {
    const component = myElem();
    const element = component.getElement();

    console.log(component)
    console.log(element)

    // Clear the root element
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    // Append the new element
    root.appendChild(element);
}

render2();