
# Black & White Portfolio

A responsive React portfolio with a black-and-white palette, a scroll-scrubbed animated background, and separate routes.

## Pages
- `/` — Home
- `/about` — About and draft skills
- `/projects` — Project cards
- `/contact` — Contact details

## Run locally
1. Install Node.js if it is not already installed.
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL shown in the terminal.


The background animation is the image sequence in `public/frames/` (001.webp to 238.webp). It plays as you scroll the whole site. To change it, replace the frames and update `FRAME_COUNT` in `src/main.jsx`.
Social links on the Contact page are plain text; add URLs when ready.