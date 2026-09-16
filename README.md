# Portfolio — Jérémy Rouillard

Personal portfolio website of Jérémy Rouillard, Développeur Full Stack basé à Rouen.

A bilingual (FR / EN), single-page React application with light/dark theme, smooth scroll animations, and SEO meta tags. Built with Vite and Tailwind CSS, deployed to GitHub Pages.

🔗 **Live:** https://jrmi27.github.io/portfolio/

## Tech stack

- **React 18** — UI components
- **Vite 5** — build tooling and dev server
- **Tailwind CSS 3** — styling
- **Framer Motion** — animations
- **react-helmet-async** — document head / SEO
- **react-intersection-observer** — scroll-triggered reveals

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Build for production (outputs to docs/)
npm run build

# Preview the production build locally
npm run preview
```

## Project structure

```
portfolio/
├── public/             # Static assets (images, pdf) copied as-is
├── src/
│   ├── components/
│   │   ├── sections/   # Hero, About, Skills, Experience, Projects, Parcours, Veille, Contact
│   │   ├── ui/         # Shared UI (SectionHeader)
│   │   ├── Navbar.jsx, Footer.jsx, Head.jsx, Cursor.jsx, ErrorBoundary.jsx
│   ├── contexts/       # LangContext (FR/EN), ThemeContext (light/dark)
│   ├── i18n/           # Translation strings (fr.js, en.js)
│   ├── utils/          # asset.js helper
│   ├── App.jsx         # Page composition
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind directives + global styles
├── docs/               # Production build — committed for GitHub Pages
├── index.html
├── vite.config.js      # base: "/portfolio/", outDir: "docs"
└── tailwind.config.js
```

## Deployment

The site is served from the `docs/` folder via GitHub Pages. Because `vite.config.js` sets `outDir: "docs"`, running `npm run build` regenerates this folder. The `base` is set to `/portfolio/` to match the repository path.

To deploy after changes:

```bash
npm run build
git add docs && git commit -m "build: update site" && git push
```

## Internationalization

The site supports French and English. Strings live in `src/i18n/fr.js` and `src/i18n/en.js`, and the active language is managed by `LangContext`. To edit content, update the matching keys in both files.

## License

Personal project — © Jérémy Rouillard.
