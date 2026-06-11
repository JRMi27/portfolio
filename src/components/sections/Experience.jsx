import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { asset } from '../../utils/asset'

const experiences = [
  {
    year: '2025',
    period: 'Janvier — Mars 2025',
    company: 'Wesur',
    role: 'Développeur Web',
    description:
      "Développement d'applications web en full stack. Conception et implémentation de nouvelles fonctionnalités, maintenance du code existant et participation aux revues de code.",
    tags: ['PHP', 'JavaScript', 'SQL', 'Full Stack'],
    pdf: 'pdf/Wesur STAGE.pdf',
    color: '#6366f1',
  },
  {
    year: '2024',
    period: 'Janvier — Mars 2024',
    company: 'OPMobility',
    role: 'Administrateur Réseau',
    description:
      "Administration et maintenance du réseau informatique de l'entreprise. Configuration des équipements réseau, supervision des systèmes et support technique aux utilisateurs.",
    tags: ['Réseau', 'Infrastructure', 'Administration', 'Linux'],
    pdf: 'pdf/OPMobility STAGE.pdf',
    color: '#8b5cf6',
  },
  {
    year: '2019',
    period: '2019',
    company: 'Holophane',
    role: 'Électricien — Stage d\'observation',
    description:
      "Stage d'observation dans le domaine de l'électricité industrielle. Découverte des métiers de l'industrie et des installations électriques en milieu professionnel.",
    tags: ['Électricité', 'Industrie', 'Observation'],
    pdf: null,
    color: '#7c3aed',
  },
]

function ExpCard({ exp, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 pb-14 last:pb-0"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 bg-background"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.2, type: 'spring' }}
      />
      <div
        className="absolute left-[6px] top-5 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), transparent)' }}
      />

      <p className="text-indigo-400 text-xs font-mono mb-1">{exp.period}</p>

      <div className="mt-3 p-5 md:p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-400 group">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors duration-200">
              {exp.company}
            </h3>
            <p className="text-zinc-500 text-sm">{exp.role}</p>
          </div>
          {exp.pdf && (
            <a
              href={asset(exp.pdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 px-3 py-1.5 rounded-lg transition-all duration-200 self-start"
            >
              Voir rapport →
            </a>
          )}
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4">{exp.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="03" title="Expériences" subtitle="Parcours professionnel" />
        <div className="max-w-2xl">
          {experiences.map((exp, i) => (
            <ExpCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
