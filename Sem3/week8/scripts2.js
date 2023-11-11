const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

// Use fetch to get data from the API
fetch('https://ghibliapi.vercel.app/films')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Begin accessing JSON data here
    data.forEach(function(movie) {
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
    });
  })
  .catch(function(error) {
    // Handle any errors from the fetch operation
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
    app.appendChild(errorMessage);
  });
