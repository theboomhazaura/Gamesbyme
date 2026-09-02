(function () {
  const shelf = document.getElementById('shelf');
  const colors = ['clay', 'moss', 'teal'];
  const games = typeof GAMES !== 'undefined' ? GAMES : [];

  games.forEach((game, i) => {
    const color = game.color || colors[i % colors.length];

    const card = document.createElement('a');
    card.className = `cartridge cartridge--${color}`;
    const href = game.embedUrl
  ? `play.html?src=${encodeURIComponent(game.embedUrl)}`
  : `games/${game.slug}/index.html`;

card.href = href;

    card.innerHTML = `
    <div class="cartridge-notch"></div>
    <div class="cartridge-label">
    ${game.image ? `<img src="${game.image}" alt="${escapeHtml(game.title)}" class="cartridge-image">` : ''}
    <h2 class="cartridge-title">${escapeHtml(game.title)}</h2>
    <p class="cartridge-desc">${escapeHtml(game.description || '')}</p>
  </div>
  <span class="cartridge-play">Play &rarr;</span>
`;
    shelf.appendChild(card);
  });

// Dynamic Game Shelf Renderer
function renderShelf(categoryFilter = "all") {
  const shelfContainer = document.getElementById("shelf-container");
  if (!shelfContainer) return;

  shelfContainer.innerHTML = "";

  const filteredGames = GAMES.filter(game => {
    if (categoryFilter === "all") return true;
    return game.category === categoryFilter;
  });

  filteredGames.forEach(game => {
    const gameLink = game.embedUrl || `games/${game.slug}/index.html`;
    const cardColor = game.color || "teal";

    const card = document.createElement("a");
    card.href = gameLink;
    card.className = `game-card ${cardColor}`;

    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}" />
      <h3>${game.title}</h3>
      <p>${game.description}</p>
    `;

    shelfContainer.appendChild(card);
  });
}

// Tab Click Handler (Brr Brr Patipim speed)
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

// 🚨 PANIC BUTTON (Instant Cloak to Google Docs)
window.addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' || e.key === '~') {
    window.location.href = 'https://docs.google.com';
  }
});

// Load games automatically when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  renderShelf("all");
});
  
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
