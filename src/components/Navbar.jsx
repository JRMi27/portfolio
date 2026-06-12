import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useLang } from '../contexts/LangContext'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang, t } = useLang()

  const links = [
    { label: t.nav.about,      href: '#about' },
    { label: t.nav.skills,     href: '#skills' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects,   href: '#projects' },
    { label: t.nav.education,  href: '#parcours' },
    { label: t.nav.veille,     href: '#veille' },
    { label: t.nav.contact,    href: '#contact' },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl bg-black/40 border-b border-white/[0.04] py-4' : ''
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#home" className="text-white font-black text-xl tracking-tight select-none">
          JR<span className="text-indigo-400">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="relative text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>
          ))}
        </nav>

        <motion.div
          className="hidden md:flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:border-indigo-500/50 hover:text-indigo-300 text-xs font-mono font-bold transition-all duration-200"
            title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:border-indigo-500/50 hover:text-indigo-300 transition-all duration-200"
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </motion.div>

        <motion.button
          className="md:hidden relative flex flex-col gap-[6px] w-7 py-1"
          onClick={() => setOpen(!open)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          aria-label="Menu"
        >
          <motion.span className="block h-px bg-white w-full origin-center"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span className="block h-px bg-white w-full"
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span className="block h-px bg-white w-full origin-center"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="text-4xl font-black text-white hover:text-indigo-400 transition-colors"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={toggleLang}
                className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm font-mono font-bold"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
