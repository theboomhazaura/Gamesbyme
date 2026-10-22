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

// INPUT TAG DICTIONARY WITH AURA BADGES
const INPUT_TAGS = {
  "keyboard-required": { label: "⌨️ Keyboard Required", badgeClass: "tag-kbd-req" },
  "better-on-keyboard": { label: "⌨️ Better on Keyboard", badgeClass: "tag-kbd-opt" },
  "mobile-optimized": { label: "📱 Mobile Optimized", badgeClass: "tag-mobile" }
};

function getInputTagLabel(tagKey) {
  return INPUT_TAGS[tagKey] ? INPUT_TAGS[tagKey].label : "";
}

// ==========================================
// 2. HELPER FUNCTIONS & NAVIGATION
// ==========================================
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// BACK TO SHELF FUNCTION (Tung Tung Tung Sahur Efficiency)
function goToShelf() {
  if (document.referrer && document.referrer.includes(window.location.host)) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

// ==========================================
// 3. TAB CLOAKING SYSTEM (STRICT ICON OVERRIDE)
// ==========================================
function setTabCloak(profileKey) {
  const profile = CLOAK_PROFILES[profileKey];
  if (!profile) return;

  document.title = profile.title;

  const existingIcons = document.querySelectorAll("link[rel*='icon']");
  existingIcons.forEach(icon => icon.remove());

  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = profile.icon;
  document.getElementsByTagName('head')[0].appendChild(link);

  localStorage.setItem('unblocktorium_cloak', profileKey);
}

function resetTabCloak() {
  document.title = "Unblocktorium | Unblocked Games";

  const existingIcons = document.querySelectorAll("link[rel*='icon']");
  existingIcons.forEach(icon => icon.remove());

  const link = document.createElement('link');
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = 'images/Favicon.png';
  document.getElementsByTagName('head')[0].appendChild(link);

  localStorage.removeItem('unblocktorium_cloak');
}

// ==========================================
// 4. GAME SHELF RENDERER
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

  const gamesList = (typeof GAMES !== 'undefined' && Array.isArray(GAMES)) ? GAMES : [];

  const filteredGames = gamesList.filter(game => {
    if (!game) return false;

    const title = (game.title || "").toLowerCase();
    const description = (game.description || "").toLowerCase();
    const category = game.category || "Uncategorized";

    const matchesCategory = (categoryFilter === "all") || (category.toLowerCase() === categoryFilter.toLowerCase());
    const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  const colors = ['clay', 'moss', 'teal'];

  if (filteredGames.length === 0) {
    shelfContainer.innerHTML = `<p style="color: var(--text-dim, #8a819b); text-align: center; grid-column: 1/-1;">No games found...</p>`;
    return;
  }

  filteredGames.forEach((game, i) => {
    const title = game.title || "Untitled Game";
    const desc = game.description || "";
    const color = game.color || colors[i % colors.length];

    let href = "#";
    if (game.embedUrl) {
      href = `play.html?src=${encodeURIComponent(game.embedUrl)}`;
    } else if (game.slug) {
      href = `games/${game.slug}/index.html`;
    }

    const card = document.createElement('a');
    card.className = `cartridge cartridge--${color} game-card ${color}`;
    card.href = href;

    const imgElement = game.image 
      ? `<img src="${game.image}" alt="${escapeHtml(title)} cartridge thumbnail" class="cartridge-image" onerror="this.style.display='none'">` 
      : '';

    // Render Tag Badge if exists
    const tagData = INPUT_TAGS[game.inputTag];
    const tagBadge = tagData 
      ? `<span class="cartridge-tag ${tagData.badgeClass}">${tagData.label}</span>` 
      : '';

    card.innerHTML = `
      <div class="cartridge-notch"></div>
      <div class="cartridge-label">
        ${imgElement}
        ${tagBadge}
        <h2 class="cartridge-title">${escapeHtml(title)}</h2>
        <p class="cartridge-desc">${escapeHtml(desc)}</p>
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

// Global Panic Key Switch (Backquote / Tilde)
window.addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' || e.key === '~') {
    const music = document.getElementById("gd-music");
    if (music) music.pause();
    window.location.href = 'https://docs.google.com';
  }
});

function toggleFullScreen() {
  const btn = document.getElementById('sidebar-btn') || (typeof event !== 'undefined' ? event.target : null);
  
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      if (btn) btn.innerHTML = "🖥️ Toggle Fullscreen: ON";
    }).catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        if (btn) btn.innerHTML = "🖥️ Toggle Fullscreen: OFF";
      });
    }
  }
}

// Sync button text if user exits fullscreen via ESC key
document.addEventListener('fullscreenchange', () => {
  const btn = document.querySelector("button[onclick='toggleFullScreen()']");
  if (btn) {
    btn.innerHTML = document.fullscreenElement ? "🖥️ Toggle Fullscreen: ON" : "🖥️ Toggle Fullscreen: OFF";
  }
});

// Shared dynamic iframe loader
function loadGameFrame(targetUrl) {
  const launcherContainer = document.getElementById('launcher-container');
  if (launcherContainer) {
    launcherContainer.style.display = 'none';
  }

  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }

  let frame = document.getElementById('gameFrame');
  if (!frame) {
    frame = document.createElement('iframe');
    frame.id = 'gameFrame';
    frame.style.cssText = "width: 100vw; height: 100vh; border: none; position: absolute; top: 0; left: 0;";
    document.body.appendChild(frame);
  }

  frame.src = targetUrl;
  frame.style.display = 'block';

  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.style.display = 'block';
  }

  frame.onload = () => {
    frame.contentWindow.focus();
  };
}

// ==========================================
// 6. INITIALIZATION ON LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const savedCloak = localStorage.getItem('unblocktorium_cloak');
  if (savedCloak && CLOAK_PROFILES[savedCloak]) {
    setTabCloak(savedCloak);
  }

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

  const savedColor = localStorage.getItem("unblocktorium-theme");
  if (savedColor) {
    document.documentElement.style.setProperty('--main-accent', savedColor);
    document.documentElement.style.setProperty('--bg-accent', savedColor);
  }

  const swatches = document.querySelectorAll('.hex-swatch');
  swatches.forEach(swatch => {
    swatch.style.pointerEvents = 'auto';

    swatch.addEventListener('click', (e) => {
      const selectedColor = e.target.getAttribute('data-color') || e.target.getAttribute('fill');
      
      if (selectedColor) {
        document.documentElement.style.setProperty('--main-accent', selectedColor);
        document.documentElement.style.setProperty('--bg-accent', selectedColor);
        localStorage.setItem('unblocktorium-theme', selectedColor);

        e.target.style.transform = 'scale(1.3)';
        setTimeout(() => {
          e.target.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  renderShelf("all");
});
