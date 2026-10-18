# Unblocktorium

made for the gamers
a highly advanced unblocked games site with games such as minecraft and gta vice city. has advanced clocking features and state of the art customisation and unriveled performance on chromebooks and iPads.

## Adding a game

1. Make a folder under `games/`, named with a URL-friendly slug, e.g. `games/rocket-dodge/`.
2. Put that game's `index.html` (and any css/js it needs) inside that folder. It can be entirely self-contained.
3. Open `games.js` and add one entry:

   ```js
   {
     title: "Rocket Dodge",
     slug: "rocket-dodge",
     description: "Dodge asteroids, don't blow up.",
     color: "clay"   // optional — "clay" | "moss" | "teal"
   },
   ```

4. Refresh `index.html` — a new cartridge card appears automatically, linking to `games/rocket-dodge/index.html`.


## Deploying to GitHub Pages

1. Create a new repo on GitHub and push this folder's contents to it:

   ```bash
   git init
   git add .
   git commit -m "Set up The Shelf"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save. GitHub will give you a URL like `https://<your-username>.github.io/<your-repo>/` — that's your live site.
5. Every time you push new games or edits to `main`, the site redeploys automatically (usually within a minute).

## Notes

- Everything is static, so any game you build with just HTML/CSS/JS will work.
- Keep each game folder self-contained (its own assets, no shared globals) to avoid games clashing with each other. wasm works and you can link an iframe as well. has unblocktorium launcher which allows multiple versions of a game and combining multiple parts to bypass 25mb upload limit on GitHub.


made by me :)
