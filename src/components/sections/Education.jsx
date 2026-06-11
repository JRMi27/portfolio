import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { useLang } from '../../contexts/LangContext'


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
  const { t } = useLang()

  return (
    <section id="education" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="05" title={t.education.title} subtitle={t.education.subtitle} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <motion.p
              ref={titleRef}
              className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6"
              initial={{ opacity: 0 }}
              animate={titleIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              {t.education.subtitle}
            </motion.p>
            <div className="space-y-4">
              {t.education.items.map((edu, i) => (
                <EduCard key={edu.degree} edu={edu} index={i} />
              ))}
            </div>
          </div>

          <div>
            <motion.p
              className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6"
              initial={{ opacity: 0 }}
              animate={titleIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {t.education.interestsTitle}
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.education.interests.map((item, i) => (
                <InterestCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
