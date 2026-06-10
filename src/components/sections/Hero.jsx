import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
            top: -200,
            left: -200,
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)',
            bottom: -100,
            right: '5%',
          }}
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
            top: '40%',
            right: '25%',
          }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ y, opacity }}>
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-sm mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Disponible pour de nouvelles opportunités
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="text-[clamp(3.5rem,12vw,9rem)] font-black text-white leading-none tracking-tight"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          >
            Jérémy
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-none tracking-tight text-zinc-500"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
          >
            Rouillard
          </motion.h1>
        </div>

        {/* Role */}
        <div className="overflow-hidden mt-6 mb-12">
          <motion.p
            className="text-lg md:text-xl text-zinc-500 tracking-widest uppercase font-light"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            Développeur{' '}
            <span className="text-indigo-400 font-medium">Full Stack</span>
            {' '}— Rouen, France
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
        >
          <a
            href="#projects"
            className="group px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5"
          >
            Voir mes projets
            <motion.span
              className="inline-block"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              →
            </motion.span>
          </a>
          <a
            href="/pdf/CV_Rouillard_Jérémy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full border border-zinc-700 hover:border-indigo-500/60 text-zinc-300 hover:text-white font-semibold text-sm tracking-wide transition-all duration-300"
          >
            Télécharger CV
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <span className="text-zinc-700 text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <div className="w-px h-10 overflow-hidden relative">
          <motion.div
            className="w-full bg-gradient-to-b from-indigo-400 to-transparent absolute top-0"
            style={{ height: '100%' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          />
        </div>
      </motion.div>
    </section>
  )
}
