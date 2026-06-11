import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { useLang } from '../../contexts/LangContext'

const EASE = [0.22, 1, 0.36, 1]

const contacts = [
  {
    key: 'email',
    value: 'jeremy.rouillard27@gmail.com',
    href: 'mailto:jeremy.rouillard27@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    key: 'phone',
    value: '06 15 65 18 65',
    href: 'tel:+33615651865',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/JRMi27',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/j%C3%A9r%C3%A9my-rouillard-5734892a6/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { t } = useLang()

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <SectionHeader number="07" title={t.contact.title} subtitle={t.contact.subtitle} />

        <div ref={ref} className="space-y-12">
          <div className="overflow-hidden">
            <motion.p
              className="text-zinc-400 text-base md:text-lg leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            >
              {t.contact.intro}
            </motion.p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          >
            {contacts.map((c) => (
              <a
                key={c.key}
                href={c.href}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 hover:border-indigo-500/40 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <span className="text-zinc-500 group-hover:text-indigo-400 transition-colors duration-300">
                  {c.icon}
                </span>
                <div>
                  <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-0.5">{t.contact[c.key]}</p>
                  <p className="text-zinc-200 text-sm group-hover:text-indigo-300 transition-colors duration-300">{c.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:border-indigo-500/50 hover:text-indigo-300 text-sm transition-all duration-300"
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
