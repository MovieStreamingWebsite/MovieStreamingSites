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
      const response = await fetch('https://moviestreamingwebsite.github.io/MovieStreamingSites/db.json');
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

      // Create the movie link with a unique URL for each movie
      const movieLink = `https://123moviehd.in/movie/${encodeURIComponent(movie.title.toLowerCase().replace(/\s+/g, '-'))}`;

      movieElement.innerHTML = `
        <img src="${movie.posterUrl}" alt="${movie.title}">
        <h3><a href="${movieLink}">${movie.title} (${movie.year})</a></h3>
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
      const response = await fetch('https://moviestreamingwebsite.github.io/MovieStreamingSites/db.json');
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

// Function to generate sitemap dynamically
async function generateSitemap() {
  const baseUrl = 'https://123moviehd.in';
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Fetch movies data
  try {
    const response = await fetch('https://moviestreamingwebsite.github.io/MovieStreamingSites/db.json');
    const data = await response.json();
    const movies = data.movies;

    // Add static pages
    sitemap += `  <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>\n`;

    // Add movie pages from db.json
    movies.forEach(movie => {
      const slug = movie.title.toLowerCase().replace(/\s+/g, '-');
      sitemap += `  <url>
      <loc>${baseUrl}/movie/${slug}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>\n`;
    });

    sitemap += '</urlset>';
    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return '<p>Error generating sitemap. Please try again later.</p>';
  }
}
