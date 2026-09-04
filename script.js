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

// AUTO-APPLY SAVED CLOAK ON ANY PAGE LOAD
(function applySavedCloak() {
  const savedCloak = localStorage.getItem('unblocktorium_cloak');
  if (savedCloak && CLOAK_PROFILES[savedCloak]) {
    const profile = CLOAK_PROFILES[savedCloak];
    document.title = profile.title;
    
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = profile.icon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
})();


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

// Toggle Sidebar Open/Close & Adjust Main Content Width
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
  document.body.classList.toggle("sidebar-active");
}

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

// APPLY TAB CLOAK PROFILE
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

// RESET BACK TO ORIGINAL BRANDING
function resetTabCloak() {
  document.title = "Unblocktorium | Unblocked Games";
  
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = 'images/Favicon.png';
  document.getElementsByTagName('head')[0].appendChild(link);

  localStorage.removeItem('unblocktorium_cloak');
}

// RESTORE SAVED CLOAK PREFERENCE ON LOAD
document.addEventListener("DOMContentLoaded", () => {
  const savedCloak = localStorage.getItem('unblocktorium_cloak');
  if (savedCloak && CLOAK_PROFILES[savedCloak]) {
    setTabCloak(savedCloak);
  }
});

// Switch Sidebar Layers
function switchLayer(layerId) {
  const layers = document.querySelectorAll(".sidebar-layer");
  layers.forEach(layer => layer.classList.remove("active"));

  const targetLayer = document.getElementById(layerId);
  if (targetLayer) {
    targetLayer.classList.add("active");
  }
}

let currentCategory = "all";
let searchQuery = "";

// REAL-TIME SEARCH INPUT HANDLER
function handleSearch(event) {
  searchQuery = event.target.value.toLowerCase().trim();
  renderShelf(currentCategory);
}

// UPDATED RENDERER WITH DUAL-FILTERING
function renderShelf(categoryFilter = "all") {
  currentCategory = categoryFilter;
  const shelfContainer = document.getElementById("shelf-container");
  if (!shelfContainer) return;

  shelfContainer.innerHTML = "";
  const gamesList = typeof GAMES !== 'undefined' ? GAMES : [];

  // FILTER BY CATEGORY AND SEARCH QUERY
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
    const music = document.getElementById("gd-music");
    if (music) music.pause();
    window.location.href = 'https://docs.google.com';
  }
});

// Global Tab Click Handler
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

// HTML escaping helper
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// TOGGLE DARK / LIGHT THEME WITH DYNAMIC LOGO
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("theme-btn");
  const logoDark = document.getElementById("logo-dark");
  const logoLight = document.getElementById("logo-light");

  body.classList.toggle("light-theme");
  const isLight = body.classList.contains("light-theme");

  // Save preference
  localStorage.setItem("unblocktorium_theme", isLight ? "light" : "dark");

  // Toggle Logos
  if (logoDark && logoLight) {
    logoDark.classList.toggle("hidden", isLight);
    logoLight.classList.toggle("hidden", !isLight);
  }

  // Update button text
  if (themeBtn) {
    themeBtn.innerHTML = isLight ? "☀️ Theme: Light Mode" : "🌙 Theme: Dark Mode";
  }
}

// RESTORE SAVED THEME AND LOGO ON LOAD
document.addEventListener("DOMContentLoaded", () => {
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
});

// Render initial view when DOM loads
window.addEventListener("DOMContentLoaded", () => {
  renderShelf("all");
});
