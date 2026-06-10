import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <footer ref={ref} className="border-t border-zinc-900 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.p
          className="text-zinc-600 text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          © 2025 Jérémy Rouillard — Développeur Full Stack
        </motion.p>
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a
            href="https://github.com/JRMi27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white text-sm transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jérémy-rouillard-5734892a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white text-sm transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="#home"
            className="text-zinc-600 hover:text-indigo-400 text-sm transition-colors duration-200"
          >
            ↑ Haut
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
