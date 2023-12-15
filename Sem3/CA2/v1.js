const normalView = 'Road'
const aerialView = 'AerialWithLabels'

// IMPORTANT NOTE:
// Limerick doesn't work, I don't know why, I'd either spend more time in the docs (which I don't, the docs are terrible) or ask chatgpt (which I can't), so I hope that Sligo is a fine replacement


async function initialFetch(viewType) {
    const BingMapsKey = 'no'
    const url = `https://dev.virtualearth.net/REST/v1/Imagery/Map/${viewType}/Routes?wp.0=Dublin,WA;64;1&wp.1=Sligo,WA;66;2&wp.2=Cork,WA;66;3&key=${BingMapsKey}`

    const res = await fetch(url)
    const data = await res.blob()
    const imgSrc = URL.createObjectURL(data);

    return imgSrc
}

async function renderMap(imgSrc) {
    const img = document.getElementById('roadmap')
    img.src = imgSrc
}

renderMap(await initialFetch(normalView))


// keeps track of the current view state
let viewState = normalView

const button = document.createElement('button')
button.innerText = 'Toggle Satellite View'
button.onclick = async () => {
    // toggle and rerender
    if (viewState == normalView) {
        viewState = aerialView
    } else {
        viewState = normalView
    }

    renderMap(await initialFetch(viewState))
}
document.body.append(button)



const b2 = document.createElement('button')
button.innerText = 'User Location'
button.onclick = async() => {

    
}

