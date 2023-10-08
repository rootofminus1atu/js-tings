/// creates an HTML element from the JSON data
function createElement(elementData) {
    const element = document.createElement(elementData.tag)

    if (elementData.props) {
        for (const propName in elementData.props) {
            element.setAttribute(propName, elementData.props[propName]);
        }
    }

    if (elementData.text) {
        const textNode = document.createTextNode(elementData.text)
        element.appendChild(textNode)
    }

    if (elementData.children) {
        elementData.children.forEach(childData => {
            const newElem = createElement(childData)
            element.appendChild(newElem)
        })
    }

    return element;
}

/// builds the HTML tree from the JSON data provided as the argument
function buildHTML(...data) {
    return data.map(item => createElement(item));
}

/// helper function to erase everything inside an element
function killChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/// wrapper to make appending data more convenient
function appendDataToElement(element, ...data) {
    element.append(...buildHTML(...data))
}

/// wrapper to make setting data more convenient
function setDataToElement(element, ...data) {
    killChildren(element)
    element.append(...buildHTML(...data))
}


// ACTUAL USAGE AND EXAMPLES BELOW

let count = 0;

function increaseCount() {
    count += 1;
    console.log(count);

    const button = document.getElementById('count-button');
    button.textContent = `count: ${count}`;
}

function myElem() {
    return {
        tag: 'div',
        props: {
            class: 'hi-class'
        },
        children: [
            {
                tag: 'button',
                text: `count: ${count}`,
                props: {
                    onclick: `increaseCount()`,
                    id: 'count-button',
                }
            }
        ]
    };
}


const root = document.getElementById("root")

appendDataToElement(root, myElem())




