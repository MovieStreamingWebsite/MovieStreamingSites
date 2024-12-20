// Function to fetch data from db.json, search, and update the results
async function searchMovie() {
  const query = document.getElementById("search-bar").value.trim();

  if (query) {
    // Update the URL with the search query
    const searchUrl = new URL(window.location);
    searchUrl.searchParams.set('q', query);
    window.history.pushState({}, '', searchUrl);

    // Fetch the movies data
    try {
      const response = await fetch('https://celopati123.github.io/MovieStreamingSites/db.json');
      const data = await response.json();
      const filteredMovies = data.movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );

      // Display search results
      displayResults(filteredMovies);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      document.getElementById('search-results').innerHTML = "<p>Error fetching movie data. Please try again later.</p>";
    }
  }
}

// Function to display the search results
function displayResults(movies) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = ""; // Clear any previous results

  if (movies.length > 0) {
    movies.forEach(movie => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("result-item");

      // Create the movie link with a dynamic search query in the URL
      const movieLink = `https://123moviehd.in/search?q=${encodeURIComponent(movie.title)}`;

      movieElement.innerHTML = `
        <img src="${movie.posterUrl}" alt="${movie.title}">
        <h3><a href="${movieLink}" target="_blank">${movie.title} (${movie.year})</a></h3>
        <p>${movie.plot}</p>
      `;

      resultsContainer.appendChild(movieElement);
    });
  } else {
    resultsContainer.innerHTML = "<p>No results found for your search.</p>";
  }
}

// Function to get the search query from the URL (for when the page is loaded with a query)
window.onload = async function() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');

  if (query) {
    document.getElementById("search-bar").value = query;

    try {
      const response = await fetch('https://123moviehd.in/db.json');
      const data = await response.json();
      const filteredMovies = data.movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );

      // Display search results
      displayResults(filteredMovies);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      document.getElementById('search-results').innerHTML = "<p>Error fetching movie data. Please try again later.</p>";
    }
  }
};
