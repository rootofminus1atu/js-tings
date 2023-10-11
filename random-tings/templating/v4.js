// Define an initial state
let state = {
    count: 0,
};

// Function to update the state and trigger a re-render
function updateState(newState) {
    console.log(getCount())
    console.log(state)
    state = { ...state, ...newState };
    render()
}

// Function to create a signal that updates the state
function createSignal(initialValue) {
    let value = initialValue;
    return [
        () => value,
        (newValue) => {
            value = newValue;
            updateState(newValue); // Trigger a re-render when the signal changes
        },
    ];
}

// Create a signal for the count
const [getCount, setCount] = createSignal(8);

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
                    {
                        text: `count is ${getCount()}`,
                    },
                ],
            },
        ],
    };
}

// Initial render
render();
