/*
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  // ... add more URLs as needed
];

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function makeMultipleRequests() {
  const promises = urls.map(url => fetchData(url));

  try {
    const results = await Promise.all(promises);
    console.log('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
}

makeMultipleRequests();
*/


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

    dogImgs.map(dogImg => {
        const img = document.createElement('img')
        img.src = dogImg
        img.alt = "a dog"
        img.height = '150'

        document.body.append(img)
    })
}

displayDogs(await GetDogs(15))