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

// Toggle Sidebar Open/Close
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

// Switch Sidebar Layers
function switchLayer(layerId) {
  // Hide all layers
  const layers = document.querySelectorAll(".sidebar-layer");
  layers.forEach(layer => layer.classList.remove("active"));

  // Show selected layer
  const targetLayer = document.getElementById(layerId);
  if (targetLayer) {
    targetLayer.classList.add("active");
  }
}

// Geometry Dash Menu Music Control
function toggleGDMusic() {
  const music = document.getElementById("gd-music");
  const btn = document.getElementById("music-btn");

  if (!music) return;

  if (music.paused) {
    music.play();
    btn.innerHTML = "🟢 GD Menu Music: ON";
    btn.classList.add("active");
  } else {
    music.pause();
    btn.innerHTML = "🟡 GD Menu Music: OFF";
    btn.classList.remove("active");
  }
}

// Update Panic Key to cut audio immediately on cloak
window.addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' || e.key === '~') {
    const music = document.getElementById("gd-menu");
    if (music) music.pause();
    window.location.href = 'https://docs.google.com';
  }
});

// Global Tab Click Handler (Called by HTML buttons)
function filterCategory(event, category) {
  // Update active state on sidebar buttons
  const buttons = document.querySelectorAll('#layer-categories .sidebar-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (event && event.target) {
    event.target.classList.add('active');
  }

  // Render the shelf with the selected tag
  renderShelf(category);

  // Auto-close sidebar on smaller screens after choosing a category
  if (window.innerWidth < 600) {
    toggleSidebar();
  }
}

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
