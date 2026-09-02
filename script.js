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

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
