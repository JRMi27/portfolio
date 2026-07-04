import { Helmet } from 'react-helmet-async'
import { asset } from '../utils/asset'
import { useLang } from '../contexts/LangContext'

export default function Head() {
  const { lang } = useLang()
  const isFr = lang === 'fr'
  const title = isFr
    ? 'Jérémy Rouillard — Développeur Full Stack'
    : 'Jérémy Rouillard — Full Stack Developer'
  const description = isFr
    ? 'Portfolio de Jérémy Rouillard, développeur Full Stack basé à Rouen. React, Node.js, PHP, Java et plus.'
    : 'Portfolio of Jérémy Rouillard, Full Stack developer based in Rouen, France. React, Node.js, PHP, Java and more.'

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Jérémy Rouillard" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
      <link rel="icon" type="image/png" href={asset('/images/logo_site.png')} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
    </Helmet>
  )
}
