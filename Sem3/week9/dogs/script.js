async function dogPromise() {
    const url = "https://dog.ceo/api/breeds/image/random"

    const dogImg = fetch(url)
        .then(res => res.json())
        .then(dogObj => dogObj.message)
        .catch(error => console.error(error))

    return dogImg
}

async function GetDogs(n) {
    const requests = Array(n).fill().map(() => dogPromise())
    
    const results = await Promise.all(requests)

    return results
}


function displayDogs(dogImgs) {
    const h1 = document.createElement('h1')
    h1.innerText = "dogs received, loading now"
    document.body.append(h1)

    const dogImgElems = dogImgs.map(dogImg => {
        const img = document.createElement('img')
        img.src = dogImg
        img.alt = "a dog"
        img.height = '150'

        return img
    })
    
    document.body.append(...dogImgElems)
}

displayDogs(await GetDogs(15))