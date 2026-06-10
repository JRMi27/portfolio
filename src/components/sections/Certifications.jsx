import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'

const categories = ['Tous', 'MOOC ANSSI', 'MOOC RGPD CNIL']

const certs = [
  {
    title: 'MOOC SecNumAcadémie',
    category: 'MOOC ANSSI',
    image: '/images/certification-anssi.png',
    year: '2024',
    org: 'ANSSI',
  },
  {
    title: 'RGPD — Module 1',
    category: 'MOOC RGPD CNIL',
    image: '/images/RGPD_MOD1.png',
    year: '2024',
    org: 'CNIL',
  },
  {
    title: 'RGPD — Module 2',
    category: 'MOOC RGPD CNIL',
    image: '/images/RGPD_MOD2.png',
    year: '2024',
    org: 'CNIL',
  },
  {
    title: 'RGPD — Module 3',
    category: 'MOOC RGPD CNIL',
    image: '/images/RGPD_MOD3.png',
    year: '2024',
    org: 'CNIL',
  },
  {
    title: 'RGPD — Module 4',
    category: 'MOOC RGPD CNIL',
    image: '/images/RGPD_MOD4.png',
    year: '2024',
    org: 'CNIL',
  },
  {
    title: 'RGPD — Module 5',
    category: 'MOOC RGPD CNIL',
    image: '/images/RGPD_MOD5.png',
    year: '2024',
    org: 'CNIL',
  },
]

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
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-indigo-400 text-[10px] font-mono uppercase tracking-widest">
              {cert.org}
            </span>
            <span className="text-zinc-600 text-[10px] font-mono">{cert.year}</span>
          </div>
          <p className="text-zinc-300 text-sm font-medium">{cert.title}</p>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
          >
            <motion.img
              src={cert.image}
              alt={cert.title}
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-lg transition-colors"
              onClick={() => setZoomed(false)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Certifications() {
  const [active, setActive] = useState('Tous')
  const filtered = active === 'Tous' ? certs : certs.filter((c) => c.category === active)

  return (
    <section id="certifications" className="py-28 md:py-36 px-6 md:px-12 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="06" title="Certifications" subtitle="Diplômes & MOOC" />

        {/* Filter */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? 'bg-indigo-600 text-white'
                  : 'border border-zinc-700 text-zinc-500 hover:border-indigo-500/50 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((cert, i) => (
              <CertCard key={cert.title} cert={cert} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
