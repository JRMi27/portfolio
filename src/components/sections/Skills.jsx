import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { asset } from '../../utils/asset'

const categories = [
  {
    name: 'Langages',
    icon: '{ }',
    skills: [
      { name: 'HTML', img: '/images/HTML5_logo.png' },
      { name: 'CSS', img: '/images/CSS3_logo.png' },
      { name: 'JavaScript', img: '/images/JS_logo.png' },
      { name: 'TypeScript', img: '/images/Typescript_logo.png' },
      { name: 'PHP', img: '/images/PHP_logo.png' },
      { name: 'Java', img: '/images/java_logo.png' },
      { name: 'Python', img: '/images/Python_logo.png' },
      { name: 'SQL', img: '/images/SQL_logo.png' },
      { name: 'Bash', img: '/images/bash_logo.png' },
      { name: 'PowerShell', img: '/images/PowerShell_logo.png' },
      { name: 'Lua', img: '/images/Lua_Logo.png' },
    ],
  },
  {
    name: 'Frameworks & Libs',
    icon: '⚡',
    skills: [
      { name: 'React', img: '/images/React_logo.png' },
      { name: 'Next.js', img: '/images/nextjs_logo.png' },
      { name: 'Node.js', img: '/images/Node.js_logo.png' },
      { name: 'Tailwind CSS', img: '/images/tailwind_logo.png' },
      { name: 'Symfony', img: '/images/symfony_logo.png' },
    ],
  },
  {
    name: 'Outils',
    icon: '🔧',
    skills: [
      { name: 'Git', img: '/images/git-bash_logo.png' },
      { name: 'GitHub', img: '/images/Github_logo.png' },
      { name: 'Docker', img: '/images/docker_logo.png' },
      { name: 'VS Code', img: '/images/visual-studio-code_logo.png' },
      { name: 'Figma', img: '/images/Figma_logo.png' },
      { name: 'Linux', img: '/images/Linux_logo.png' },
      { name: 'Firebase', img: '/images/FIrebase_logo.png' },
      { name: 'VirtualBox', img: '/images/Virtualbox_logo.png' },
      { name: 'Canva', img: '/images/canva_logo.png' },
      { name: 'Notion', img: '/images/notion_logo.png' },
    ],
  },
]

function SkillBadge({ skill, delay, inView }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-indigo-500/40 hover:bg-indigo-500/8 group transition-all duration-300"
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      data-hover
    >
      <img
        src={asset(skill.img)}
        alt={skill.name}
        className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <span className="text-zinc-400 group-hover:text-zinc-200 text-sm font-medium transition-colors">
        {skill.name}
      </span>
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
          <SkillBadge
            key={s.name + i}
            skill={s}
            delay={baseDelay + i * 0.035}
            inView={inView}
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-12 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="02" title="Compétences" subtitle="Technologies maîtrisées" />
        <div className="space-y-14">
          {categories.map((cat, i) => (
            <CategoryBlock key={cat.name} cat={cat} baseDelay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}
