const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

// Named function to handle JSON response
function handleResponse(response) {
  return response.json();
}

// Named function to handle the data
function handleData(data) {
  data.forEach(createMovieCard);
}

// Named function to handle errors from fetch
function handleError(error) {
  const errorMessage = document.createElement('marquee');
  errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
  app.appendChild(errorMessage);
}

// Named function to create movie card
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const h1 = document.createElement('h1');
  h1.textContent = movie.title;

  const p = document.createElement('p');
  movie.description = movie.description.substring(0, 300);
  p.textContent = `${movie.description}...`;

  container.appendChild(card);
  card.appendChild(h1);
  card.appendChild(p);
}

// Use fetch to get data from the API
fetch('https://ghibliapi.vercel.app/films')
  .then(handleResponse)
  .then(handleData)
  .catch(handleError);
