// The Shelf — game registry
//
// Add a game by adding one object to this array. Each game lives in its own
// folder under /games/<slug>/ with its own index.html (and any css/js it needs).
//
// color options: "clay" | "moss" | "teal"  (cycles automatically if omitted)

const GAMES = [
  // Delete or replace this once you've added your first real game:
{
  title: "flight simulator",
  slug: "flightsim",
  description: "fly a plane in an infinite world",
  color: "teal",   // optional — "clay" | "moss" | "teal"
  image: "images/IMG_2490.jpeg"
},

{
  title: "Cyberscapes",
  slug: "Cyberscapes",
  description: "you are a in a glass tunnel overlooking duskwater.",
  color: "moss",   // optional — "clay" | "moss" | "teal"
  image: "images/IMG_2491.jpeg"
},

{
  title: "isotown",
  slug: "citybuilder",
  description: "build a city and watch it rise",
  color: "teal",   // optional — "clay" | "moss" | "teal"
  image: "images/IMG_2492.jpeg"
},

{
  title: "rosswood coffee shop",
  slug: "rosswoodcoffee",
  description: "run a coffee shop for 10 days and become a millionare (or not)",
  color: "clay",   // optional — "clay" | "moss" | "teal"
  image: "images/IMG_2496.jpeg"
},

{
  title: "challenge rush",
  slug: "challengerush",
  description: "a game about jumping (not mine)",
  color: "teal",
  image: "images/IMG_2497.jpeg",
  embedUrl: "https://challengerush.com/"
},
  
];
