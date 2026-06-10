// Préfixe le BASE_URL de Vite pour que les assets du dossier public/
// fonctionnent autant en local qu'en production (GitHub Pages /portfolio/).
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
