// The Shelf — game registry
//
// Add a game by adding one object to this array. Each game lives in its own
// folder under /games/<slug>/ with its own index.html (and any css/js it needs).
//
// color options: "clay" | "moss" | "teal"  (cycles automatically if omitted)

const GAMES = [
  {
    title: "flight simulator",
    slug: "flightsim",
    description: "fly a plane in an infinite world",
    color: "teal",
    image: "images/IMG_2490.jpeg",
    category: "GAMESBYME"
  },
  {
    title: "Cyberscapes",
    slug: "Cyberscapes",
    description: "you are a in a glass tunnel overlooking duskwater.",
    color: "moss",
    image: "images/IMG_2491.jpeg",
    category: "GAMESBYME"
  },
  {
    title: "isotown",
    slug: "citybuilder",
    description: "build a city and watch it rise",
    color: "teal",
    image: "images/IMG_2492.jpeg",
    category: "GAMESBYME"
  },
  {
    title: "rosswood coffee shop",
    slug: "rosswoodcoffee",
    description: "run a coffee shop for 10 days and become a millionare (or not)",
    color: "clay",
    image: "images/IMG_2496.jpeg",
    category: "GAMESBYME"
  },
  { 
    title: "Run 3",
    slug: "run3",
    description: "jump through a long tunnel",
    color: "moss",
    image: "images/IMG_2502.jpeg",
    category: "Platformer"
  },
  { 
    title: "five nights at freddys 1",
    slug: "fnaf1",
    description: "survive 5 nights at freddys",
    color: "clay",
    image: "images/IMG_2498.jpeg",
    category: "Horror"
  },
  { 
    title: "geometry dash lite",
    slug: "geometrydashlite",
    description: "rithem based platformer",
    color: "moss",
    image: "images/IMG_2500.jpeg",
    category: "Platformer"
  },
  { 
    title: "Drive mad",
    slug: "drivemad",
    description: "drive a car on crazy obsticles",
    color: "moss",
    image: "images/IMG_2503.jpeg",
    category: "Driving"
  },
  {
    title: "challenge rush",
    slug: "challengerush",
    description: "a game about jumping (not mine)",
    color: "teal",
    image: "images/IMG_2497.jpeg",
    embedUrl: "https://challengerush.com/",
    category: "Platformer"
  }
];

// FORCE SHELF TO LOAD ON INITIAL PAGE LOAD (OUTSIDE THE ARRAY)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderShelf === "function") {
    renderShelf("all");
  } else if (typeof displayGames === "function") {
    displayGames();
  }
});
