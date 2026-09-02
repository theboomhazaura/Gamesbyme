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
  image: "images/IMG_2490.jpeg",
  catogory: "GAMESBYME"
},

{
  title: "Cyberscapes",
  slug: "Cyberscapes",
  description: "you are a in a glass tunnel overlooking duskwater.",
  color: "moss",   // optional — "clay" | "moss" | "teal"
  image: "images/IMG_2491.jpeg",
  catogory: "GAMESBYME"
},

{
  title: "isotown",
  slug: "citybuilder",
  description: "build a city and watch it rise",
  color: "teal",   // optional — "clay" | "moss" | "teal"
  image: "images/IMG_2492.jpeg",
  catogory "GAMESBYME"
},

{
  title: "rosswood coffee shop",
  slug: "rosswoodcoffee",
  description: "run a coffee shop for 10 days and become a millionare (or not)",
  color: "clay",   // optional — "clay" | "moss" | "teal"
  image: "images/IMG_2496.jpeg",
  catogory "GAMESBYME"
},

{ 
  title: "five nights at freddys 1",
  slug: "fnaf1",
  description: "survive 5 nights at freddys",
  color: "clay",
  image: "images/IMG_2498.jpeg", // optional — "clay" | "moss" | "teal"
  catogory "Horror"
},


{ 
  title: "geometry dash lite",
  slug: "geometrydashlite",
  description: "rithem based platformer",
  color: "moss",
  image: "images/IMG_2500.jpeg", // optional — "clay" | "moss" | "teal"
  catogory: "platformer"
},
  
{
  title: "challenge rush",
  slug: "challengerush",
  description: "a game about jumping (not mine)",
  color: "teal",
  image: "images/IMG_2497.jpeg",
  embedUrl: "https://challengerush.com/",
  catogory: "platformer"

},
  
];
