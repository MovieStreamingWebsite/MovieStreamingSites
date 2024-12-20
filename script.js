// Function to fetch the JSON data and search for movies
async function searchMovie() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  // Clear previous results
  resultsContainer.innerHTML = "";

  if (query) {
    try {
      // Fetch the JSON data from the server
      const response = await fetch('https://celopati123.github.io/MovieStreamingSites/db.json');
      const data = await response.json();

      const filteredMovies = data.movies.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );

      if (filteredMovies.length > 0) {
        filteredMovies.forEach(movie => {
          const movieElement = document.createElement("div");
          movieElement.classList.add("result-item");

          movieElement.innerHTML = `
            <img src="${movie.posterUrl}" alt="${movie.title}">
            <h3><a href="${movie.url || '#'}" target="_blank">${movie.title} (${movie.year})</a></h3>
            <p>${movie.plot}</p>
          `;

          resultsContainer.appendChild(movieElement);
        });
      } else {
        resultsContainer.innerHTML = "<p>No results found.</p>";
      }
    } catch (error) {
      resultsContainer.innerHTML = "<p>Error fetching movie data. Please try again later.</p>";
    }
  } else {
    resultsContainer.innerHTML = "<p>Please enter a movie name to search.</p>";
  }
}
