# MyStash

MyStash is a mobile-first personal collection of small tools and features. Tic-Tac-Toe is the first available feature.

## Project structure

```text
MyStash/
├── assets/                     # App icons and static assets
├── css/
│   └── app.css                 # Shared app and feature styling
├── js/
│   ├── app.js                  # Application entry point
│   ├── core/                   # Shared app infrastructure
│   │   ├── haptics.js
│   │   ├── navigation.js
│   │   └── theme.js
│   └── features/               # Independent feature modules
│       └── tic-tac-toe/
│           └── index.js
├── index.html
├── manifest.json
├── theme.json                  # Central MyStash color palette
└── sw.js                       # Service worker placeholder
```

## Theme

Edit `theme.json` to change the MyStash color palette. The app loads its tokens into CSS custom properties at runtime. `css/app.css` also contains matching fallback values so the interface can render if the theme file is temporarily unavailable.

## Running locally

Serve the project from a local web server (ES modules and `fetch()` require HTTP(S) in normal browser use). For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
