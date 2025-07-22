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

function saveToFavorites(button) {
  const card = button.closest('.card');
  const title = card.querySelector('h2').innerText;
  const desc = card.querySelector('p').innerText;

  const data = { title, desc };

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const alreadyExists = favorites.some(fav => fav.title === title && fav.desc === desc);
  if (!alreadyExists) {
    favorites.push(data);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert("Fakta disimpan ke favorit!");
  } else {
    alert("Fakta ini sudah ada di favorit.");
  }
}

function showFavorites() {
  const favoritesContainer = document.getElementById('favoritesContainer');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favoritesContainer.innerHTML = '<h2>Fakta Favorit</h2>';

  if (favorites.length === 0) {
    favoritesContainer.innerHTML += '<p>Belum ada fakta favorit.</p>';
    return;
  }

  favorites.forEach(fav => {
    const favCard = document.createElement('div');
    favCard.classList.add('card');
    favCard.innerHTML = `
      <div class="card-content">
        <h3>${fav.title}</h3>
        <p>${fav.desc}</p>
      </div>
    `;
    favoritesContainer.appendChild(favCard);
  });

  window.scrollTo({
    top: favoritesContainer.offsetTop,
    behavior: 'smooth'
  });
}

