
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
                    onclick: 'clickedyclickclick',
                },
            },
        ],
    },
    {
        tag: 'p',
        text: 'paragraph from outside header more text!',
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
                    value: 'Sample Text',
                },
            },
            {
                tag: 'h1',
                text: text,
            },
        ],
    };
}

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



const root = document.getElementById("root")

function buildHTML(doc) {
    return doc.map(item => createElement(item));
}

const htmlStructure = buildHTML(myDoc);

htmlStructure.forEach(element => {
    root.appendChild(element);
});


