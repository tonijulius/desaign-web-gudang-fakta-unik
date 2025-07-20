let currentCategory = 'all';

function filterFacts(category) {
  currentCategory = category;
  applyFilters();
}

function searchFacts() {
  applyFilters();
}

function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const categoryMatch = currentCategory === 'all' || card.classList.contains(currentCategory);
    const text = card.innerText.toLowerCase();
    const searchMatch = text.includes(searchTerm);

    if (categoryMatch && searchMatch) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
