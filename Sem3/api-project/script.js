const BASE = "https://api.openopus.org"

function url(endpoint) {
    return `${BASE}${endpoint}`
}

async function getComposers() {
    const endpoint = url("/composer/list/pop.json")
    // add TRY CATCH here
    const res = await fetch(endpoint)
    // add IF !res.ok here
    const json = await res.json()

    return json.composers
}

async function searchComposers(term) {
    if (!term) {
        return await getComposers()
    }
    
    const endpoint = url(`/composer/list/search/${term}.json`)

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





function showDetails() {
    const container = document.getElementById('composers-container');
    container.classList.add('resize');
}

function hideDetails() {
    const container = document.getElementById('composers-container');
    eraseDetails()
    container.classList.remove('resize');
}

function eraseDetails() {
    const container = document.getElementById('composer-details')
    container.innerHTML = ''
}


function year(date) {
    const arr = date.split('-')

    return arr.length > 0 ? arr[0] : null
}



function detailsRenderLoading() {
    eraseDetails()

    const spinner = document.createElement('div')
    spinner.classList.add('loading-spinner')
    
    document.getElementById('composer-details').append(spinner)
}

function detailsRenderError(error) {
    eraseDetails()

    const msg = document.createElement('p')
    msg.innerText = error.message

    document.getElementById('composer-details').append(msg)
}

function detailedComposerCard(composer) {
    const div = document.createElement('div')
    div.classList.add("composer-details-container")

    const leftDiv = document.createElement('div')
    leftDiv.classList.add("composer-details-left")
    const rightDiv = document.createElement('div')
    rightDiv.classList.add("composer-details-right")


    const img = document.createElement('div')
    img.classList.add('composer-card-img')
    img.style.backgroundImage = `url(${composer.portrait})`
    img.style.width = '10rem'

    leftDiv.append(img)

    const h1 = document.createElement('h1')
    h1.innerText = composer.complete_name

    const p = document.createElement('p')
    p.innerText = `${composer.name} was a renowned composer who lived during the ${composer.epoch} epoch. Born in ${year(composer.birth)}, ${composer.name} made significant contributions to the world of music until ${year(composer.death)}.`
    
    rightDiv.append(h1, p)

    div.append(leftDiv, rightDiv)

    return div
}

function workItem(work) {
    const li = document.createElement('li')
    
    const title = document.createElement('p')
    title.innerText = `${work.title}`

    if (work.subtitle) {
        title.innerText += ` (${work.subtitle})`
    }

    li.append(title)

    return li
}

function detailsRenderData(composer, works) {
    eraseDetails()

    const composerDetailed = detailedComposerCard(composer)
    
    const worksContainer = document.createElement('div')
    worksContainer.classList.add('works-container')

    const worksHeader = document.createElement('h3')
    worksHeader.innerText = `${composer.name}'s works worth checking out:`
    
    const workItems = works.map((work) => workItem(work))
    const ul = document.createElement('ul')
    ul.append(...workItems)

    worksContainer.append(worksHeader, ul)
    
    document.getElementById('composer-details').append(composerDetailed, worksContainer)
}



async function manageComposerDetails(composer) {
    // resize screen
    showDetails()

    // start fetching and display a loading spinner
    detailsRenderLoading()
    try {
        const works = await getWorks(composer.id)

        // then display the works and other stuff 
        detailsRenderData(composer, works)
    } catch(error) {
        detailsRenderError(error)
    }
}


function composerCard(composer) {
    const div = document.createElement('div')
    div.id = `${composer.id}`
    div.classList.add('composer-card')

    const h2 = document.createElement('h2')
    h2.innerText = composer.name
    h2.classList.add('composer-card-name')


    const img = document.createElement('div')
    img.classList.add('composer-card-img')
    img.style.backgroundImage = `url(${composer.portrait})`



    const a = document.createElement('a')
    a.setAttribute('href', '');
    a.classList.add('composer-link');
    a.innerText = "read more"
    a.addEventListener('click', async (e) => {
        e.preventDefault()

        await manageComposerDetails(composer)
    })

    div.append(img, h2, a)

    return div
}

function renderComposers(comps) {
    const cards = comps.map(comp => composerCard(comp))

    const container = document.getElementById('composers-container')
    container.addEventListener('click', async (e) => {
        const isLinkClick = e.target.tagName === 'A' && e.target.classList.contains('composer-link')

        if (!isLinkClick) {
            hideDetails()
        }
    })
    
    container.append(...cards)
}

renderComposers(await getComposers())



