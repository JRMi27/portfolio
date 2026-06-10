import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'

const education = [
  {
    period: '2025 — 2026',
    degree: 'Licence Informatique',
    school: 'Campus La Chataigneraie',
    location: 'Mesnil-Esnard (76)',
    description: 'Licence informatique générale — algorithmique avancée, développement logiciel, gestion de projets et bases de données.',
    icon: '🎓',
  },
  {
    period: '2023 — 2025',
    degree: 'BTS SIO — SLAM',
    school: 'Lycée Gustave Flaubert',
    location: 'Rouen (76)',
    description: 'Services Informatiques aux Organisations, option Solutions Logicielles et Applications Métiers.',
    icon: '💻',
  },
  {
    period: '2020 — 2023',
    degree: 'Baccalauréat Général',
    school: 'Lycée Georges Dumezil',
    location: 'Vernon (27)',
    description: 'Options : Mathématiques, NSI (Numérique et Sciences Informatiques), Mathématiques Expertes. Mention Assez Bien.',
    icon: '📚',
  },
  {
    period: '2017 — 2020',
    degree: 'Collège',
    school: 'Collège Marc Chagall',
    location: 'Gasny (27)',
    description: 'Diplôme National du Brevet.',
    icon: '🏫',
  },
]

const interests = [
  { icon: '✈️', title: 'Voyages', desc: 'Explorer de nouvelles cultures élargit mes horizons.' },
  { icon: '🎵', title: 'Musique', desc: 'Écoute quotidienne — indie, électro, japonaise.' },
  { icon: '🎬', title: 'Films & Séries', desc: 'En VO depuis 2015 pour perfectionner mes langues.' },
  { icon: '🇯🇵', title: 'Japonais', desc: 'Apprentissage depuis 2022 — Hiragana, Katakana, Kanji.' },
]

function EduCard({ edu, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      className="relative p-5 md:p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-indigo-500/25 hover:bg-zinc-900/60 transition-all duration-400 group"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl shrink-0">{edu.icon}</span>
        <div className="min-w-0">
          <p className="text-indigo-400/80 text-xs font-mono mb-1">{edu.period}</p>
          <h3 className="text-white font-bold text-base group-hover:text-indigo-300 transition-colors duration-200 leading-tight">
            {edu.degree}
          </h3>
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
      className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700 transition-all duration-300 group"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-xl shrink-0">{item.icon}</span>
      <div>
        <p className="text-zinc-300 text-sm font-semibold">{item.title}</p>
        <p className="text-zinc-600 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const { ref: titleRef, inView: titleIn } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section id="education" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="05" title="Formation" subtitle="Parcours académique" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education timeline */}
          <div>
            <motion.p
              ref={titleRef}
              className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6"
              initial={{ opacity: 0 }}
              animate={titleIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              Cursus scolaire
            </motion.p>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <EduCard key={edu.degree} edu={edu} index={i} />
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <motion.p
              className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6"
              initial={{ opacity: 0 }}
              animate={titleIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Centres d'intérêt
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interests.map((item, i) => (
                <InterestCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
