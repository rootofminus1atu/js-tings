// Creates an HTML element from the JSON data
function createElement(elementData) {
    const element = document.createElement(elementData.tag);

    if (elementData.props) {
        for (const propName in elementData.props) {
            element.setAttribute(propName, elementData.props[propName]);
        }
    }

    if (elementData.children) {
        elementData.children.forEach((childData) => {
            if (checkIfString(childData)) {
                const newText = document.createTextNode(childData)
                element.appendChild(newText)
            } else {
                const newElem = createElement(childData);
                element.appendChild(newElem);
            }
        });
    }

    return element;
}

function checkIfString(thing) {
    return typeof thing === "string"
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



function myElem() {
    return {
        tag: "div",
        props: {
            class: "hi-class",
        },
        children: [
            {
                tag: 'p',
                children: [
                    "hi this is p",
                    {
                        tag: 'h1',
                        children: [
                            `h1 stuff`
                        ]
                    },
                    `and more text`
                ]
            }
        ],
    };
}

const root = document.getElementById("root");

function render() {
    setDataToElement(root, myElem());
}

render();
