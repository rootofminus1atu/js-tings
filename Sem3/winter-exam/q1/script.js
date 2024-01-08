function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function randomString(n) {
    const letters = "abcdefghijklmnopqrstuvwxyz"
    let text = ""

    for (let i = 0; i < n; i++) {
        text += letters.charAt(Math.floor(Math.random() * letters.length))
    }
        
    return text
}

/// creates a single random square
function randomSquare() {
    const p = document.createElement('p')
    p.classList.add('the-square')
    p.style.backgroundColor = getRandomColor()
    p.innerText = randomString(4)
    return p
}

/// creates n random squares
function manyRandomSquares(n) {
    const squares = Array(n).fill().map(() => randomSquare())
    return squares
}

/// generates the divs
function generateDivs(n, where) {
    let currentContainer = where
    let width = 1200
    let height = 500
    let green = 255
    let borderSize = n

    for (let i = 0; i < n; i++) {
        const container = document.createElement('div')
        container.classList.add('container')
        container.style.width = `${width}px`
        container.style.height = `${height}px`
        container.style.backgroundColor = `rgb(0, ${green}, 0)`
        container.style.border = `${borderSize}px dashed red`

        container.addEventListener('click', (e) => {
            e.target.remove()
        })

        const forSquares = document.createElement('div')
        forSquares.classList.add('for-squares')
        forSquares.append(...manyRandomSquares(i + 1))
        container.append(forSquares)

        
        currentContainer.append(container)

        // moving to the next iteration
        currentContainer = container
        width *= 0.6
        height *= 0.6
        green *= 0.8
        borderSize *= 1.2
    }

}

const button = document.getElementById('generate-divs')
button.addEventListener('click', () => {
    const howMany = document.getElementById('how-many').value || 0

    const where = document.getElementById('generation-container')

    where.innerHTML = ''
    
    generateDivs(howMany, where)
})





