import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { asset } from '../../utils/asset'
import { useLang } from '../../contexts/LangContext'

const EASE = [0.22, 1, 0.36, 1]

const certs = [
  { title: 'MOOC SecNumAcadémie', category: 'MOOC ANSSI',      image: '/images/certification-anssi.png', year: '2024', org: 'ANSSI' },
  { title: 'RGPD — Module 1',    category: 'MOOC RGPD CNIL',   image: '/images/RGPD_MOD1.png',           year: '2024', org: 'CNIL'  },
  { title: 'RGPD — Module 2',    category: 'MOOC RGPD CNIL',   image: '/images/RGPD_MOD2.png',           year: '2024', org: 'CNIL'  },
  { title: 'RGPD — Module 3',    category: 'MOOC RGPD CNIL',   image: '/images/RGPD_MOD3.png',           year: '2024', org: 'CNIL'  },
  { title: 'RGPD — Module 4',    category: 'MOOC RGPD CNIL',   image: '/images/RGPD_MOD4.png',           year: '2024', org: 'CNIL'  },
  { title: 'RGPD — Module 5',    category: 'MOOC RGPD CNIL',   image: '/images/RGPD_MOD5.png',           year: '2024', org: 'CNIL'  },
]

/* ── Formation ── */

function EduCard({ edu, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.div
      ref={ref}
      className="relative p-5 md:p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-indigo-500/25 hover:bg-zinc-900/60 transition-all duration-400 group"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl shrink-0">{edu.icon}</span>
        <div className="min-w-0">
          <p className="text-indigo-400/80 text-xs font-mono mb-1">{edu.period}</p>
          <h3 className="text-white font-bold text-base group-hover:text-indigo-300 transition-colors duration-200 leading-tight">{edu.degree}</h3>
          <p className="text-zinc-500 text-sm mt-0.5">{edu.school}</p>
          <p className="text-zinc-600 text-xs mt-0.5">{edu.location}</p>
          <p className="text-zinc-600 text-sm leading-relaxed mt-3">{edu.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function InterestCard({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700 transition-all duration-300"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
    >
      <span className="text-xl shrink-0">{item.icon}</span>
      <div>
        <p className="text-zinc-300 text-sm font-semibold">{item.title}</p>
        <p className="text-zinc-600 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

/* ── Certifications ── */

function CertCard({ cert, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [zoomed, setZoomed] = useState(false)
  return (
    <>
      <motion.div
        ref={ref}
        className="group rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-600 transition-all duration-300 cursor-zoom-in"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        whileHover={{ y: -3 }}
        onClick={() => setZoomed(true)}
        data-hover
      >
        <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
          <img src={asset(cert.image)} alt={cert.title}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-indigo-400 text-[10px] font-mono uppercase tracking-widest">{cert.org}</span>
            <span className="text-zinc-600 text-[10px] font-mono">{cert.year}</span>
          </div>
          <p className="text-zinc-300 text-sm font-medium">{cert.title}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
          >
            <motion.img src={asset(cert.image)} alt={cert.title}
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ ease: EASE }}
              onClick={(e) => e.stopPropagation()} />
            <button
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-lg transition-colors"
              onClick={() => setZoomed(false)}
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Section ── */

export default function Parcours() {
  const { t } = useLang()
  const [tab, setTab] = useState('formation')
  const certCategories = [t.certifications.all, 'MOOC ANSSI', 'MOOC RGPD CNIL']
  const [activeCert, setActiveCert] = useState(certCategories[0])
  const filtered = activeCert === certCategories[0] ? certs : certs.filter((c) => c.category === activeCert)

  return (
    <section id="parcours" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="05" title={t.parcours.title} titleAccent={t.parcours.titleAccent} subtitle={t.parcours.subtitle} />

        {/* Main tabs */}
        <div className="flex gap-2.5 mb-12">
          {[
            { key: 'formation',       label: t.parcours.tabFormation },
            { key: 'certifications',  label: t.parcours.tabCertifications },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                tab === key
                  ? 'bg-indigo-600 text-white'
                  : 'border border-zinc-700 text-zinc-500 hover:border-indigo-500/50 hover:text-zinc-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'formation' && (
            <motion.div
              key="formation"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                <div>
                  <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6">{t.education.subtitle}</p>
                  <div className="space-y-4">
                    {t.education.items.map((edu, i) => <EduCard key={edu.degree} edu={edu} index={i} />)}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6">{t.education.interestsTitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {t.education.interests.map((item, i) => <InterestCard key={item.title} item={item} index={i} />)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="flex flex-wrap gap-2.5 mb-10">
                {certCategories.map((cat) => (
                  <button key={cat} onClick={() => setActiveCert(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCert === cat
                        ? 'bg-indigo-600 text-white'
                        : 'border border-zinc-700 text-zinc-500 hover:border-indigo-500/50 hover:text-zinc-200'
                    }`}
                  >{cat}</button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                >
                  {filtered.map((cert, i) => <CertCard key={cert.title} cert={cert} index={i} />)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
