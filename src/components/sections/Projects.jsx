import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { asset } from '../../utils/asset'
import { useLang } from '../../contexts/LangContext'

const statuses = ['done', 'done', 'done', 'done', 'done', 'done']

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const statusStyles = {
  done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  wip:  'bg-amber-500/10  text-amber-400  border-amber-500/20',
}

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <motion.article
      ref={ref}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-700 transition-all duration-500"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-zinc-900">
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${project.accent}55, transparent 60%)` }}
        />
        <img
          src={asset(project.image)}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          onError={(e) => {
            e.target.parentElement.style.background = `linear-gradient(135deg, ${project.accent}18, #141414)`
            e.target.remove()
          }}
        />
        {/* Status badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border ${statusStyles[project.status] ?? statusStyles.done}`}>
          {project._statusLabel}
        </span>
        {/* Number */}
        <span
          className="absolute top-4 right-4 text-5xl font-black opacity-15 group-hover:opacity-25 transition-opacity select-none"
          style={{ color: project.accent }}
        >
          {project.num}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-indigo-300 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((t) => (
            <span key={t} className="px-2.5 py-0.5 text-xs rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors duration-200"
            >
              <GitHubIcon />
              {project._github}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              {project._demo} →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { t } = useLang()
  const projects = t.projects.items.map((p, i) => ({
    ...p,
    status: statuses[i] ?? 'done',
    _statusLabel: t.projects[`status_${statuses[i] ?? 'done'}`],
    _github: t.projects.github,
    _demo: t.projects.demo,
  }))

  return (
    <section id="projects" className="py-28 md:py-36 px-6 md:px-12 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="04" title={t.projects.title} titleAccent={t.projects.titleAccent} subtitle={t.projects.subtitle} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
