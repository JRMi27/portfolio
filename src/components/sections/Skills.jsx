import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { asset } from '../../utils/asset'
import { useLang } from '../../contexts/LangContext'

const skillData = [
  {
    icon: '{ }',
    skills: [
      { name: 'HTML',        img: '/images/HTML5_logo.png',             level: 90 },
      { name: 'CSS',         img: '/images/CSS3_logo.png',              level: 85 },
      { name: 'JavaScript',  img: '/images/JS_logo.png',                level: 80 },
      { name: 'TypeScript',  img: '/images/Typescript_logo.png',        level: 65 },
      { name: 'PHP',         img: '/images/PHP_logo.png',               level: 75 },
      { name: 'Java',        img: '/images/java_logo.png',              level: 75 },
      { name: 'Python',      img: '/images/Python_logo.png',            level: 75 },
      { name: 'SQL',         img: '/images/SQL_logo.png',               level: 80 },
      { name: 'Bash',        img: '/images/bash_logo.png',              level: 65 },
    ],
  },
  {
    icon: '⚡',
    skills: [
      { name: 'React',       img: '/images/React_logo.png',             level: 80 },
      { name: 'Next.js',     img: '/images/nextjs_logo.png',            level: 65 },
      { name: 'Node.js',     img: '/images/Node.js_logo.png',           level: 70 },
      { name: 'Tailwind CSS',img: '/images/tailwind_logo.png',          level: 85 },
      { name: 'Symfony',     img: '/images/symfony_logo.png',           level: 70 },
      { name: 'Vite',        img: '/images/vite.png',                   level: 70 },
    ],
  },
  {
    icon: '🔧',
    skills: [
      { name: 'Git',         img: '/images/git-bash_logo.png',          level: 85 },
      { name: 'GitHub',      img: '/images/Github_logo.png',            level: 90 },
      { name: 'Docker',      img: '/images/docker_logo.png',            level: 65 },
      { name: 'VS Code',     img: '/images/visual-studio-code_logo.png',level: 90 },
      { name: 'Figma',       img: '/images/Figma_logo.png',             level: 70 },
      { name: 'Linux',       img: '/images/Linux_logo.png',             level: 75 },
      { name: 'Firebase',    img: '/images/FIrebase_logo.png',          level: 65 },
      { name: 'Canva',       img: '/images/canva_logo.png',             level: 75 },
      { name: 'Notion',      img: '/images/notion_logo.png',            level: 80 },
      { name: 'IntelliJ',    img: '/images/IntelliJ.png',               level: 70 },
    ],
  },
  {
    icon: '🗄️',
    skills: [
      { name: 'MySQL',           img: '/images/MySQL.png',   level: 75 },
      { name: 'Oracle Database', img: '/images/oracle.png',  level: 65 },
      { name: 'MongoDB',         img: '/images/mongodb.png', level: 65 },
    ],
  },
]

const levelColor = (l) =>
  l >= 85 ? 'bg-emerald-500' : l >= 70 ? 'bg-indigo-500' : 'bg-zinc-600'

function SkillBadge({ skill, delay, inView }) {
  return (
    <motion.div
      className="flex flex-col gap-1.5 px-4 pt-2.5 pb-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-indigo-500/40 hover:bg-indigo-500/8 group transition-all duration-300 min-w-[96px]"
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      data-hover
    >
      <div className="flex items-center gap-2">
        <img
          src={asset(skill.img)}
          alt={skill.name}
          className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <span className="text-zinc-400 group-hover:text-zinc-200 text-sm font-medium transition-colors whitespace-nowrap">
          {skill.name}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${levelColor(skill.level)}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.7, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

function CategoryBlock({ cat, baseDelay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref}>
      <motion.div
        className="flex items-center gap-3 mb-5"
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: baseDelay }}
      >
        <span className="text-zinc-600 font-mono text-sm">{cat.icon}</span>
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{cat.name}</span>
        <div className="flex-1 h-px bg-zinc-800" />
      </motion.div>
      <div className="flex flex-wrap gap-2.5">
        {cat.skills.map((s, i) => (
          <SkillBadge key={s.name + i} skill={s} delay={baseDelay + i * 0.035} inView={inView} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const categories = skillData.map((d, i) => ({ ...d, name: t.skills.categories[i] }))

  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-12 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="02" title={t.skills.title} titleAccent={t.skills.titleAccent} subtitle={t.skills.subtitle} />
        <div className="space-y-14">
          {categories.map((cat, i) => (
            <CategoryBlock key={cat.name} cat={cat} baseDelay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}
