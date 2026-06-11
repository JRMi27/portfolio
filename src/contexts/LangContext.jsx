import { createContext, useContext, useState } from 'react'
import fr from '../i18n/fr'
import en from '../i18n/en'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'fr')

  const toggle = () => {
    const next = lang === 'fr' ? 'en' : 'fr'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = lang === 'fr' ? fr : en

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
