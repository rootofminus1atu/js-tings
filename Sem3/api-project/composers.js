import { manageDetailsFetchingState } from "./details.js"
import { getComposersByPeriod } from "./fetching.js"
import { hideDetails } from "./details.js"



/// creates a simple summary card for a composer
/// those cards have an interactive anchor element that opens the details section corresponding to a given composer
function createComposerCard(composer) {
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

        await manageDetailsFetchingState(composer)
    })

    div.append(img, h2, a)

    return div
}


/// clears the composers sidebar section in preparation for a render
function eraseComposers() {
    const container = document.getElementById('composers-container')
    container.innerHTML = ''
}


/// renders a loading spinner
function composersRenderLoading() {
    eraseComposers()

    const spinner = document.createElement('div')
    spinner.classList.add('loading-spinner')

    document.getElementById('composers-container').append(spinner)
}


/// renders an error message, in case composers aren't found
function composersRenderError(_error) {
    eraseComposers()

    const div = document.createElement('div')
    div.classList.add('error-container')

    const msg = document.createElement('p')
    msg.innerText = "Couldn't fetch composers :("

    div.append(msg)

    document.getElementById('composers-container').append(div)
}


/// renders the data (composers) into the composer list sidebar section
export function renderComposers(comps) {
    const cards = comps.map(comp => createComposerCard(comp))

    const container = document.getElementById('composers-container')
    container.innerHTML = ''
    container.addEventListener('click', async (e) => {
        /// so that clicking on the interactive anchor link wouldn't immediately close the details section
        const isLinkClick = e.target.tagName === 'A' && e.target.classList.contains('composer-link')

        if (!isLinkClick) {
            hideDetails()
        }
    })
    
    container.append(...cards)
}


/// manages the fetching state of the composers sidebar section
export async function manageCompoersFetchingState(period) {
    composersRenderLoading()

    try {
        const comps = await getComposersByPeriod(period)
        renderComposers(comps)
    } catch(error) {
        composersRenderError(error)
    }
}