const BASE = "https://api.openopus.org"

function url(endpoint) {
    return `${BASE}${endpoint}`
}

// this works????
// const res = await fetch(url("/composer/list/rec.json"))
// console.log(await res.json())

async function getComposers() {
    const res = await fetch(url("/composer/list/pop.json"))
    const json = await res.json()

    return json.composers
}


function dce(str) {
    return document.createElement(str)
}


function composerCard(composer) {
    const div = document.createElement('div')
    div.id = `${composer.id}`
    div.classList.add('composer-card')

    const h1 = document.createElement('h1')
    h1.innerText = composer.name

    const img = document.createElement('img')
    img.src = composer.portrait
    img.width = '100'

    const a = document.createElement('a')
    a.setAttribute('href', 'https://www.example.com');
    a.innerText = "see works"

    div.append(h1, img, a)

    return div
}

function renderComposers(comps) {
    const cards = comps.map(comp => composerCard(comp))

    document.getElementById('composers-container').append(...cards)
}

renderComposers(await getComposers())



