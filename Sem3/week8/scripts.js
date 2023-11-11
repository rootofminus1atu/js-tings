const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

// Use fetch to get data from the API
fetch('https://ghibliapi.vercel.app/films')
  // using .then to wait until we get a response, so that we could then use response.json() on it, which turns the response into a json with which we can work
  .then(response => response.json())
  // again waiting until the response gets turned into json, so that we could do something with it (the json is named data below)
  .then(data => {
    // Begin accessing JSON data here, for each movie we will...
    data.forEach(movie => {
      // create a div
      const card = document.createElement('div');
      // set its class attribute to 'card'
      card.setAttribute('class', 'card');

      // create an h1
      const h1 = document.createElement('h1');
      // set its inner text to the movie title
      h1.textContent = movie.title;

      // create a p
      const p = document.createElement('p');
      // take only the first 300 chars of the movie description
      movie.description = movie.description.substring(0, 300);
      // set the p's inner text to the description with '...' attached at the end
      p.textContent = `${movie.description}...`;

      
      // append the card that we just created to the main container div
      container.appendChild(card);
      // append the h1 to the card
      card.appendChild(h1);
      // apend p to the card
      card.appendChild(p);
    });
  })
  // in case an error occurs somewhere in the code above (e. g. no response from an api, cannot convert to json, other errors) we run this code below
  // for the error we caught...
  .catch(error => {
    // Handle any errors from the fetch operation

    // we create a marquee element
    const errorMessage = document.createElement('marquee');
    // we set its inner text to the string below, with the error message attached
    errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
    // we append the marquee to our app
    app.appendChild(errorMessage);
  });
