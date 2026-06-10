import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionHeader({ number, title, subtitle }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  return (
    <div ref={ref} className="mb-16 md:mb-20">
      <motion.p
        className="text-indigo-400/70 text-xs font-mono uppercase tracking-[0.25em] mb-3"
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {number} — {subtitle}
      </motion.p>
      <div className="overflow-hidden">
        <motion.h2
          className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight"
          initial={{ y: '110%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  )
}
