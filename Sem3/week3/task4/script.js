function processHobbies() {
    const checkBoxes = document.getElementsByName("hobby")

    const hobbies = Array.from(checkBoxes)
        .filter(elem => elem.checked)
        .map(elem => elem.value)

    displayHobbies(hobbies)

}


function displayHobbies(hobbies) {
    const container = document.getElementById("result")

    cleanUp(container)

    hobbies.map(hobby => {
        appendH2(container, hobby)
    })
}

function cleanUp(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function appendH2(parent, text) {
    const h2Elem = document.createElement("h2")
    h2Elem.innerHTML = text
    parent.appendChild(h2Elem)
}