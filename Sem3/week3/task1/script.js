// for the min/max process

const process = () => {
    const elems = document.getElementsByClassName("num-box")
    const elemsArr = Array.from(elems)

    const nums = getNumsFromInputsArray(elemsArr)
    
    const min = Math.min(...nums)
    const max = Math.max(...nums)

    displayResult(min, max)
}

function getNumsFromInputsArray(elemsArr) {
    const nums = elemsArr
        .map(elem => elem.value)
        .map(num => parseInt(num))
        .filter(item => !Number.isNaN(item))  // filter out the NaN's

    return nums
}

function displayResult(min, max) {
    const resultContainer = document.getElementById("result")

    // erase anything inside the container before displaying
    cleanUp(resultContainer)

    appendH2(resultContainer, `The smallest number: ${min}`)
    appendH2(resultContainer, `The biggest number: ${max}`)
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


// for generating texboxes

function range(n) {
    return [...Array(n).keys()]
}

const generateTextboxes = () => {
    const boxContainer = document.getElementById("boxes")

    const howMany = 3;

    range(howMany).forEach((_) => {
        const textInputElem = document.createElement("input")
        textInputElem.type = "text";
        textInputElem.className = "num-box";
        textInputElem.placeholder = "some number"
        
        boxContainer.appendChild(textInputElem);
    });
};







generateTextboxes();