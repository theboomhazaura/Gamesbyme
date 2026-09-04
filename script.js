// ==========================================
// 1. GLOBAL STATE & CONSTANTS
// ==========================================
let currentCategory = "all";
let searchQuery = "";

// PREDEFINED CLOAK PROFILES
const CLOAK_PROFILES = {
  drive: {
    title: "My Drive - Google Drive",
    icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
  },
  docs: {
    title: "Google Docs",
    icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
  },
  canvas: {
    title: "Dashboard",
    icon: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico"
  },
  desmos: {
    title: "Desmos | Graphing Calculator",
    icon: "https://www.desmos.com/favicon.ico"
  }
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==========================================
// 3. TAB CLOAKING SYSTEM
// ==========================================
function setTabCloak(profileKey) {
  const profile = CLOAK_PROFILES[profileKey];
  if (!profile) return;

  document.title = profile.title;
  
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = profile.icon;
  document.getElementsByTagName('head')[0].appendChild(link);

  localStorage.setItem('unblocktorium_cloak', profileKey);
}

function resetTabCloak() {
  document.title = "Unblocktorium | Unblocked Games";
  
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = 'images/Favicon.png';
  document.getElementsByTagName('head')[0].appendChild(link);

  localStorage.removeItem('unblocktorium_cloak');
}

// ==========================================
// 4. GAME SHELF RENDERER (DUAL-FILTERING)
// ==========================================
function handleSearch(event) {
  searchQuery = event.target.value.toLowerCase().trim();
  renderShelf(currentCategory);
}

function filterCategory(event, category) {
  const buttons = document.querySelectorAll('#layer-categories .sidebar-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (event && event.target) {
    event.target.classList.add('active');
  }

  renderShelf(category);

  if (window.innerWidth < 600) {
    toggleSidebar();
  }
}

function renderShelf(categoryFilter = "all") {
  currentCategory = categoryFilter;
  const shelfContainer = document.getElementById("shelf-container");
  if (!shelfContainer) return;

  shelfContainer.innerHTML = "";
  const gamesList = typeof GAMES !== 'undefined' ? GAMES : [];

  // Dual filtering by category and search term
  const filteredGames = gamesList.filter(game => {
    const matchesCategory = (categoryFilter === "all") || (game.category === categoryFilter);
    const matchesSearch = game.title.toLowerCase().includes(searchQuery) || 
                          (game.description && game.description.toLowerCase().includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const colors = ['clay', 'moss', 'teal'];

  if (filteredGames.length === 0) {
    shelfContainer.innerHTML = `<p style="color: var(--text-dim); text-align: center; grid-column: 1/-1;">No games found...</p>`;
    return;
  }

  filteredGames.forEach((game, i) => {
    const color = game.color || colors[i % colors.length];
    const href = game.embedUrl
      ? `play.html?src=${encodeURIComponent(game.embedUrl)}`
      : `games/${game.slug}/index.html`;

    const card = document.createElement('a');
    card.className = `cartridge cartridge--${color} game-card ${color}`;
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

    shelfContainer.appendChild(card);
  });
}

// ==========================================
// 5. UI CONTROLS & THEME TOGGLE
// ==========================================
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  
  if (sidebar) sidebar.classList.toggle("open");
  if (overlay) overlay.classList.toggle("active");
  document.body.classList.toggle("sidebar-active");
}

function switchLayer(layerId) {
  const layers = document.querySelectorAll(".sidebar-layer");
  layers.forEach(layer => layer.classList.remove("active"));

  const targetLayer = document.getElementById(layerId);
  if (targetLayer) {
    targetLayer.classList.add("active");
  }
}

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

function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("theme-btn");
  const logoDark = document.getElementById("logo-dark");
  const logoLight = document.getElementById("logo-light");

  body.classList.toggle("light-theme");
  const isLight = body.classList.contains("light-theme");

  localStorage.setItem("unblocktorium_theme", isLight ? "light" : "dark");

  if (logoDark && logoLight) {
    logoDark.classList.toggle("hidden", isLight);
    logoLight.classList.toggle("hidden", !isLight);
  }

  if (themeBtn) {
    themeBtn.innerHTML = isLight ? "☀️ Theme: Light Mode" : "🌙 Theme: Dark Mode";
  }
}

// Global Panic Key Switch
window.addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' || e.key === '~') {
    const music = document.getElementById("gd-music");
    if (music) music.pause();
    window.location.href = 'https://docs.google.com';
  }
});

// ==========================================
// 6. SINGLE INITIALIZATION ON LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Restore Cloak Profile
  const savedCloak = localStorage.getItem('unblocktorium_cloak');
  if (savedCloak && CLOAK_PROFILES[savedCloak]) {
    setTabCloak(savedCloak);
  }

  // Restore Theme
  const savedTheme = localStorage.getItem("unblocktorium_theme");
  const themeBtn = document.getElementById("theme-btn");
  const logoDark = document.getElementById("logo-dark");
  const logoLight = document.getElementById("logo-light");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeBtn) themeBtn.innerHTML = "☀️ Theme: Light Mode";
    if (logoDark && logoLight) {
      logoDark.classList.add("hidden");
      logoLight.classList.remove("hidden");
    }
  }

  // Initial Shelf Render
  renderShelf("all");
});
