
import { getWorks } from "./fetching.js"



/// creates a detailed card for a composer
/// in addition to the composer's portrait and full name, a description is provided too
function createDetailedComposerCard(composer) {
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

/// creates a simple list item containing the work of a composer 
function createWorkItem(work) {
    const li = document.createElement('li')
    
    const title = document.createElement('p')
    title.innerText = `${work.title} ${work.subtitle ? `(${work.subtitle})` : ''}`;

    li.append(title)

    return li
}


/// reveals the details section
function revealDetails() {
    const container = document.getElementById('composers-sidebar');
    container.classList.add('resize');
}

/// hides the details section
export function hideDetails() {
    const container = document.getElementById('composers-sidebar');
    eraseDetails()
    container.classList.remove('resize');
}

/// erases the details section in preparation for a render
function eraseDetails() {
    const container = document.getElementById('composer-details')
    container.innerHTML = ''
}


/// utility function to get the year only
function year(date) {
    const arr = date.split('-')

    return arr.length > 0 ? arr[0] : null
}

/// renders a spinner while the details are being fetched
function detailsRenderLoading() {
    eraseDetails()

    const spinner = document.createElement('div')
    spinner.classList.add('loading-spinner')
    
    document.getElementById('composer-details').append(spinner)
}

/// renders an error message, in case the details could not be found
function detailsRenderError(_error) {
    eraseDetails()

    const div = document.createElement('div')
    div.classList.add('error-container')

    const msg = document.createElement('p')
    msg.innerText = "Couldn't find this composer's details :("

    div.append(msg)

    document.getElementById('composer-details').append(div)
}


/// renders the data (composer and works) into the details section
function detailsRenderData(composer, works) {
    eraseDetails()

    const composerDetailed = createDetailedComposerCard(composer)
    
    const worksContainer = document.createElement('div')
    worksContainer.classList.add('works-container')

    const worksHeader = document.createElement('h3')
    worksHeader.innerText = `${composer.name}'s works worth checking out:`
    
    const workItems = works.map((work) => createWorkItem(work))
    const ul = document.createElement('ul')
    ul.append(...workItems)

    worksContainer.append(worksHeader, ul)
    
    document.getElementById('composer-details').append(composerDetailed, worksContainer)
}


/// manages the fetching state when fetching the works of a composer
export async function manageDetailsFetchingState(composer) {
    // resize screen
    revealDetails()

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