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

const myDoc = [
    {
        tag: 'header',
        props: {
            class: 'my-header-class',
        },
        children: [
            {
                tag: 'h1',
                text: 'h1 from a header!',
            },
            {
                tag: 'p',
                props: {
                    class: 'p-class',
                },
                text: 'paragraph lorem ipsum',
            },
            {
                tag: 'p',
                text: 'another p',
            },
            {
                tag: 'button',
                text: 'click me',
                props: {
                    onclick: 'sayHi()',
                },
            },
        ],
    },
    {
        tag: 'p',
        text: 'paragraph from <span> outside </span> header more text!',
    },
    myDiv('HI'),
    myDiv('ANOTHER'),
    myDiv('DJ KHALED'),
];

function myDiv(text) {
    return {
        tag: 'div',
        props: {
            class: 'a-div-lol',
        },
        children: [
            {
                tag: 'p',
                text: 'another p',
            },
            {
                tag: 'input',
                props: {
                    type: 'text',
                    placeholder: 'enter text',
                },
            },
            {
                tag: 'h1',
                text: text,
            },
        ],
    };
}


const root = document.getElementById("root")

appendDataToElement(root, ...myDoc)



function someDiv(text, num1, num2) {
    // do calculations and logic processing
    const result = num1 + num2

    return (
        {
            tag: 'div',
            props: {
                class: 'div-class-name-that-can-be-used-in-css',
            },
            children: [
                {
                    tag: 'h1',
                    text: text,
                },
                {
                    tag: 'p',
                    text: num1 + ' + ' + num2 + ' = ' + result,
                },
                {
                    tag: 'input',
                    props: {
                        type: 'text',
                        placeholder: 'enter text',
                    },
                },
            ],
        }
    )
}

function someStuff(n) {
    return (
        {
            tag: 'p',
            text: `The number is ${n}`
        }
    )
}

const nums = [1, 2, 3, 4]

appendDataToElement(
    document.getElementById("append-here"), 
    ...nums.map(n => someStuff(n)),
    someDiv("text lol", 5, 7)
)




