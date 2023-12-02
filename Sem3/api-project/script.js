const BASE = "https://api.openopus.org"

function url(endpoint) {
    return `${BASE}${endpoint}`
}


const btn = document.createElement('button')
btn.innerText = "click"
btn.addEventListener('click', () => {
    document.getElementById('composer-details').classList.add('details-open')
})
document.body.append(btn)



async function getComposers() {
    const endpoint = url("/composer/list/pop.json")
    // add TRY CATCH here
    const res = await fetch(endpoint)
    // add IF !res.ok here
    const json = await res.json()

    return json.composers
}

async function getWorks(composerId) {
    const endpoint = url(`/work/list/composer/${composerId}/genre/Popular.json`)

    // add try catch too or abstract this into a fetch function
    const res = await fetch(endpoint)
    const json = await res.json()

    return json.works
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
    a.innerText = "read more"
    a.onclick = async (e) => {
        e.preventDefault()

        // resize screen
        // start fetching and display a loading spinner
        // then display the works and other stuff 

        const works = await getWorks(composer.id)
        console.log(works)
    } 

    div.append(h1, img, a)

    return div
}

function renderComposers(comps) {
    const cards = comps.map(comp => composerCard(comp))

    document.getElementById('composers-container').append(...cards)
}

renderComposers(await getComposers())



