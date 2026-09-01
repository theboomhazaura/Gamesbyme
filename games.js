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
  color: "teal"   // optional — "clay" | "moss" | "teal"
  image: "IMG_2490.jpeg"
},

{
  title: "Cyberscapes",
  slug: "Cyberscapes",
  description: "you are a in a glass tunnel overlooking duskwater.",
  color: "moss"   // optional — "clay" | "moss" | "teal"
},
];
