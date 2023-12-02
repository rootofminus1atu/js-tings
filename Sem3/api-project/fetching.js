const BASE = "https://api.openopus.org"

function url(endpoint) {
    return `${BASE}${endpoint}`
}

export async function getComposers() {
    const endpoint = url("/composer/list/pop.json")

    try {
        const res = await fetch(endpoint)

        if (!res.ok) {
            throw new Error(`Failed to fetch composers: ${res.status}`)
        }

        const json = await res.json();
        return json.composers;

    } catch(error) {
        console.error(`Error fetching composers: ${error}`)
        return []
    }
}

export async function getComposersByPeriod(period) {
    if (!period) {
        return await getComposers()
    }

    const endpoint = url(`/composer/list/epoch/${period}.json`)

    try {
        const res = await fetch(endpoint)

        if (!res.ok) {
            throw new Error(`Failed to fetch composers for period ${period}: ${res.status}`)
        }

        const json = await res.json()

        return json.composers
    } catch(error) {
        console.error(`Error fetching composers for period ${period}: ${error}`)
        return []
    }
}

export async function getWorks(composerId) {
    const endpoint = url(`/work/list/composer/${composerId}/genre/Popular.json`)
    
    try {
        const res = await fetch(endpoint)
        const json = await res.json()

        return json.works
    } catch(error) {
        console.error(error)
        return []
    }
}