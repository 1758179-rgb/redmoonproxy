const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (!query) return;

  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  searchInput.blur();
});

const initialQuery = 'duckduckgo';
searchInput.value = initialQuery;
searchInput.setAttribute('placeholder', 'Search for anything...');
