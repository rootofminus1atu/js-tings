
const url = "https://restcountries.com/v3.1/all"


function processCurrencies(currencies) {
    if (!currencies) {
        return []
    }

    const currenciesList = Object.entries(currencies)

    const currenciesProcessed = currenciesList.map((c) => {
        const [code, details] = c

        return {
            name: details.name,
            symbol: details.symbol,
            code
        }
    })

    return currenciesProcessed
}

async function getCountriesData() {
    try {
        const res = await fetch(url)
        const json = await res.json()

        const data = json.map((country) => {
            const currencies = processCurrencies(country.currencies)

            return {
                name: country.name.official,
                flag: country.flags.png,
                flagAlt: country.flags.alt,
                currencies: currencies,  // is a list
                landlocked: country.landlocked,
                region: country.region,
                subRegion: country.subregion
            }
        })

        return data

    } catch(error) {
        console.error(error)
    }
}

function createTitledPara(title, value) {
    const p = document.createElement('p')
    p.innerHTML = `<b>${title}</b>: ${value}`
    return p
}

function displayCountryData(data) {
    const cards = data.map((country) => {
        // all elements that will be in the card
        const title = document.createElement('h1')
        title.innerText = country.name

        const currenciesStr = country.currencies.map(curr => curr.name).join(', ')

        const currencyP = createTitledPara("Currencies", currenciesStr)
        const landlockedP = createTitledPara("Landlocked", country.landlocked)
        const regionP = createTitledPara("Region", country.region)
        const subRegionP = createTitledPara("Sub-Region", country.subRegion)

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

        return card
    })

    const allCardsContainer = document.getElementById('cards-container')
    allCardsContainer.append(...cards)
}

displayCountryData(await getCountriesData())
