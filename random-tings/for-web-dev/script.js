
clubs =  [
    {
        id: '29837498273',
        name: 'fishing',
        description: 'desc'
    },
    {
        id: '2983749y5ji54j3',
        name: 'cooking',
        description: 'asfasfasf'
    },
    {
        id: '298374wr3t273',
        name: 'golf',
        description: 'asdasdasdasd'
    },
    {
        id: '298374sd273',
        name: 'chemistry',
        description: 'descfdsd'
    },
]

products = [
    {
        name: "milk",
        price: 2
    },
    {
        name: "orange",
        price: 3
    },
]

// todo: 
// make it work for lists of nested objects

huh = [
    {
        light: {
            name: "lol"
        },
        dark: {
            name: "hi"
        }
    }
]

class TemplatizeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TemplatizeError";
    }
}

function fillTemplate(template, item) {
    const regex = /{([^}]+)}/g

    const result = template.replace(regex, match => {
        const trimmedMatch = match.slice(1, -1) 

        if (!item.hasOwnProperty(trimmedMatch)) {
            throw new TemplatizeError(`Property '${trimmedMatch}' not found in the object.`)
        }

        return item[trimmedMatch]
    })

    return result
}


function templatize(element) {
    const listName = element.getAttribute("json-list");

    if (!listName) {
        throw new TemplatizeError("You forgot to add a 'json-list' attribute to your templatize div.");
    }

    const list = window[listName];

    if (!list) {
        throw new TemplatizeError(`A list named '${listName}' could not be found.`);
    }


    const template = element.innerHTML
    element.innerHTML = ''

    const htmlContent = list
        .map(item => {
            try {
                return fillTemplate(template, item) 
            } catch (error) {
                throw new TemplatizeError(`${error.message} Make sure that '${listName}' contains objects that all have that property. Or that the HTML template is using the right property name.`);
            }
        })
        .join('')

    element.innerHTML = htmlContent

}


function templatizeAll() {
    const elements = Array.from(document.getElementsByClassName("templatize"))

    elements.forEach(element => templatize(element))
}

templatizeAll()







// const tempContainer = document.getElementById("clubs")
// console.log(tempContainer)

// const template = tempContainer.children[0]
// console.log(template)

// remove the template after getting the data from it

// do the loop stuff and replacement

// tempContainer.appendChild(template.cloneNode(true))


