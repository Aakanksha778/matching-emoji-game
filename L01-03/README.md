# Matching Emoji — Memory Match Game

- **Author:** Aakanksha Parekh
- **Date:** March 5, 2026

## Description

Matching Emoji (Memory Match) is a browser-based concentration game where players flip cards to find matching emoji pairs. The objective is to match all pairs using as few moves and as little time as possible. The project is implemented with plain HTML, CSS, and JavaScript and stores high scores in the browser's `localStorage`.

## Highlights

- **Pure front-end:** No build tools required — just open the HTML files or serve them.
- **Persistent high scores:** Top scores are saved locally in the browser.
- **Responsive layout:** Works on desktop and mobile browsers.
- **Two pages:** Gameplay (`memory_match.html`) and `high_scores.html`.

## Files of Interest

- `src/pages/memory_match.html` — main game page
- `src/pages/high_scores.html` — high scores page
- `src/js/memory_match.js` — game logic
- `src/js/high_scores.js` — high score handling
- `src/css/memory_match.css` — styles

## How to Run

Option 1 — Open directly in a browser
- Open the game page in your browser: [src/pages/memory_match.html](src/pages/memory_match.html)

Option 2 — Serve via a local HTTP server (recommended)

1. Open a terminal/PowerShell in the project root.
2. Start a simple Python server:

```powershell
python -m http.server 8000
```

3. Open the game in your browser:

```
http://localhost:8000/src/pages/memory_match.html
```

Serving via HTTP avoids browser restrictions and ensures consistent behavior. High scores saved via `localStorage` will be stored for the served origin (e.g., `http://localhost:8000`).

## Gameplay Overview

- Click or tap a card to flip it.
- Flip two cards at a time; matching pairs remain revealed.
- Non-matching pairs flip back after a short delay.
- The game ends when all pairs are matched; moves and time are recorded.

## Extending the Game

- Change the emoji set or number of pairs in `src/js/memory_match.js`.
- Tweak layout and visuals in `src/css/memory_match.css`.
- Add difficulty levels, animations, or online leaderboards by extending the JS files.

## License

Provided for learning and demonstration purposes.
