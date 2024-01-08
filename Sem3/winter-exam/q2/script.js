/// gets all the people
async function getPeople() {
    const peopleUrl = 'https://ghibliapi.vercel.app/people'

    try {
        const res = await fetch(peopleUrl)
        const json = await res.json()

        return json

    } catch(error) {
        console.error(error)
    }
}

/// gets a film from the provided url
async function getFilm(url) {
    try {
        const res = await fetch(url)
        const json = await res.json()

        return json

    } catch(error) {
        console.error(error)
    }
    return
}

/// gets all films for a provided list of people, in the same order
async function getAllFilmsForPeople(people) {
    const filmUrls = people.map(p => p.films)
    const filmReqs = filmUrls.map(arr => arr.map(url => getFilm(url)))

    const results = await Promise.all(filmReqs.map(async arr => await Promise.all(arr)))

    return results
}

/// processes the people we get from the 1st request
async function processPeoplesFilms(people) {
    const filmsForPeople = await getAllFilmsForPeople(people)

    const newPeople = people.map((person, i) => (
        {
            name: person.name,
            age: person.age,
            gender: person.gender,
            films: filmsForPeople[i]
        }
    ))

    return newPeople
}

/// helper paragraph function
function pWithText(text) {
    const p = document.createElement('p')
    p.innerText = text
    return p
}

/// renders provided people into the main body
async function renderPeople(people) {
    console.log(people)

    const cards = people.map(p => {

        const div = document.createElement('div')
        div.setAttribute('class', 'card')

        const h1 = document.createElement('h1')
        h1.innerText = `${p.name}`

        const p1 = pWithText(`Age: ${p.age}`)
        const p2 = pWithText(`Gender: ${p.gender}`)

        const filmDivs = p.films.map(f => {
            const innerDiv = document.createElement('div')

            const p = pWithText(`Movie: ${f.title}`)
            const img = document.createElement('img')
            img.src = f.image
            img.classList.add('film-img')

            innerDiv.append(p, img)

            return innerDiv
        })

        div.append(h1, p1, p2, ...filmDivs)

        return div
    })

    document.body.append(...cards)
}

renderPeople(await processPeoplesFilms(await getPeople()))