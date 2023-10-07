const root = document.getElementById("root")


const myDoc = [
    {
        tag: 'header',
        className: 'my-class',
        children: [
            {
                tag: 'h1',
                text: "h1 from a header!"
            },
            {
                tag: 'p',
                className: 'p-class',
                text: "paragraph lorem ipsum"
            },
            {
                tag: 'p',
                text: "another p"
            },
            {
                tag: 'input'
            }
        ]
    },
    {
        tag: 'p',
        text: "paragraph from outside header more text!"
    },
    myDiv("HI"),
    myDiv("ANOTHER"),
    myDiv("DJ KHALED")
];

function myDiv(text) {
    return (
        {
            tag: 'div',
            className: 'a-div-lol',
            children: [
                {
                    tag: 'p',
                    text: "another p"
                },
                {
                    tag: 'input'
                },
                {
                    tag: 'h1',
                    text: text
                }
            ]
        }
    )
}

function createElement(elementData) {
    const element = document.createElement(elementData.tag)

    if (elementData.className) {
        element.className = elementData.className
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

function buildHTML(doc) {
    return doc.map(item => createElement(item));
}

const htmlStructure = buildHTML(myDoc);

htmlStructure.forEach(element => {
    root.appendChild(element);
});