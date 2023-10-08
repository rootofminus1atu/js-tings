let counter = 1
let double = counter * 2

const container = document.createElement("h1")
document.body.append(container)

function updateCounterText() {
    container.innerHTML = `${counter} x 2 = ${double}`
}
updateCounterText()

const button = document.createElement("button")
document.body.append(button)
button.innerHTML = "+1"

button.addEventListener("click", () => {
    counter += 1
    double = counter * 2
    updateCounterText()
})

