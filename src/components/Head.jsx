import { Helmet } from 'react-helmet-async'
import { asset } from '../utils/asset'

export default function Head() {
  return (
    <Helmet>
      <title>Jérémy Rouillard — Développeur Full Stack</title>
      <meta name="description" content="Portfolio de Jérémy Rouillard, développeur Full Stack basé à Rouen. React, Node.js, PHP, Java et plus." />
      <meta name="author" content="Jérémy Rouillard" />
      <meta property="og:title" content="Jérémy Rouillard — Développeur Full Stack" />
      <meta property="og:description" content="Portfolio de Jérémy Rouillard, développeur Full Stack basé à Rouen." />
      <meta property="og:type" content="website" />
      <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
      <link rel="icon" type="image/png" href={asset('/images/logo_site.png')} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
    </Helmet>
  )
}
