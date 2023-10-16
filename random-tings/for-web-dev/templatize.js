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


export default function templatizeAll() {
    const elements = Array.from(document.getElementsByClassName("templatize"))

    elements.forEach(element => templatize(element))
}
