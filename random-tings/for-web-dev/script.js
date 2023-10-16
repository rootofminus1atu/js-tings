
clubs =  [
    {
        name: 'fishing',
        description: 'desc'
    },
    {
        name: 'cooking',
        description: 'asfasfasf'
    },
    {
        name: 'golf',
        description: 'asdasdasdasd'
    },
    {
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


const tempContainer = document.getElementById("clubs")
console.log(tempContainer)

const template = tempContainer.children[0]
console.log(template)


tempContainer.appendChild(template.cloneNode(true))
tempContainer.appendChild(template.cloneNode(true))
tempContainer.appendChild(template.cloneNode(true))
tempContainer.appendChild(template.cloneNode(true))

