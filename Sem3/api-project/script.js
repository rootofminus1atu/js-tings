import { getComposers } from "./fetching.js";
import { manageCompoersFetchingState, renderComposers } from "./composers.js";



// the initial load and setup happens here

const dropdown = document.getElementById('dropdown')
dropdown.addEventListener('change', async (e) => {
    const period = e.currentTarget.value

    manageCompoersFetchingState(period)
})

// reseting the dropdown state to the Any category
dropdown.value = ""

// initial render
renderComposers(await getComposers())
