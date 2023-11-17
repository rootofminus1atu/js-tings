
const url = "https://restcountries.com/v3.1/all"

function processCurrencies(currencies) {
    if (!currencies) {
        return null
    }

    const currencySymbols = Object.entries(currencies)

    if (!currencySymbols) {
        return null
    }

    const [code, details] = currencySymbols[0]

    if (!details) {
        return null
    }

    return { 
        ...details,
        code
    }
}

async function getCountryData() {
    try {
        const res = await fetch(url)
        const data = await res.json()

        const info = data.map((country) => {
            const currency = processCurrencies(country.currencies)

            return {
                name: country.name.official,
                flag: country.flags.png,
                flagAlt: country.flags.alt,
                currency: currency,  // could be null
                landlocked: country.landlocked,
                region: country.region,
                subRegion: country.subregion
            }
        })

        return info

    } catch(error) {
        console.error(error)
    }
}

function createSpecialPara(title, value) {
    const p = document.createElement('p')
    p.innerHTML = `<b>${title}</b>: ${value}`
    return p
}

function displayCountryData(data) {
    const allCardsContainer = document.getElementById('cards-container')
    
    data.map((country) => {
        // all elements that will be in the card
        const title = document.createElement('h1')
        title.innerText = country.name

        const currencyP = createSpecialPara("Currency", country.currency ? country.currency.name : "NO DATA")
        const landlockedP = createSpecialPara("Landlocked", country.landlocked)
        const regionP = createSpecialPara("Region", country.region)
        const subRegionP = createSpecialPara("Sub-Region", country.subRegion)

        const flag = document.createElement('img')
        flag.src = country.flag
        flag.alt = country.alt


        // card header
        const cardHeader = document.createElement('div')
        cardHeader.classList.add("card-header")
        cardHeader.append(flag, title)


        // the card itself
        const card = document.createElement('div')
        card.classList.add("card")
        card.append(cardHeader, currencyP, landlockedP, regionP, subRegionP)

        allCardsContainer.append(card)
    })
}

displayCountryData(await getCountryData())
