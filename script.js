// Dynamic Game Shelf Renderer (Global for HTML onclick access)
function renderShelf(categoryFilter = "all") {
  const shelfContainer = document.getElementById("shelf-container");
  if (!shelfContainer) return;

  // Clear current games displayed
  shelfContainer.innerHTML = "";

  const gamesList = typeof GAMES !== 'undefined' ? GAMES : [];

  // Filter games based on active tab category
  const filteredGames = gamesList.filter(game => {
    if (categoryFilter === "all") return true;
    return game.category === categoryFilter;
  });

  const colors = ['clay', 'moss', 'teal'];

  filteredGames.forEach((game, i) => {
    const color = game.color || colors[i % colors.length];
    const href = game.embedUrl
      ? `play.html?src=${encodeURIComponent(game.embedUrl)}`
      : `games/${game.slug}/index.html`;

    const card = document.createElement('a');
    card.className = `cartridge cartridge--${color} game-card ${color}`;
    card.href = href;

    // Retains your retro cartridge HTML layout with safety escaping
    card.innerHTML = `
      <div class="cartridge-notch"></div>
      <div class="cartridge-label">
        ${game.image ? `<img src="${game.image}" alt="${escapeHtml(game.title)}" class="cartridge-image">` : ''}
        <h2 class="cartridge-title">${escapeHtml(game.title)}</h2>
        <p class="cartridge-desc">${escapeHtml(game.description || '')}</p>
      </div>
      <span class="cartridge-play">Play &rarr;</span>
    `;

    shelfContainer.appendChild(card);
  });
}

// Global Tab Click Handler (Called by HTML buttons)
function filterCategory(evt, categoryName) {
  const buttons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }

  renderShelf(categoryName);
}

// Panic Key: Instant cloak to Google Docs on ~ or `
window.addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' || e.key === '~') {
    window.location.href = 'https://docs.google.com';
  }
});

// HTML escaping helper
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Render initial view when DOM loads
window.addEventListener("DOMContentLoaded", () => {
  renderShelf("all");
});
