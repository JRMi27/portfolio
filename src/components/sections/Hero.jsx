import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { asset } from '../../utils/asset'
import { useLang } from '../../contexts/LangContext'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const { t } = useLang()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  /* Mouse tracking */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springCfg = { damping: 28, stiffness: 70, mass: 0.8 }
  const mx = useSpring(rawX, springCfg)
  const my = useSpring(rawY, springCfg)

  /* Each orb moves at a different speed → depth illusion */
  const o1x = useTransform(mx, v => v * 70)
  const o1y = useTransform(my, v => v * 50)
  const o2x = useTransform(mx, v => v * -45)
  const o2y = useTransform(my, v => v * -35)
  const o3x = useTransform(mx, v => v * 30)
  const o3y = useTransform(my, v => v * -25)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width  / 2) / rect.width)
    rawY.set((e.clientY - rect.top  - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
            top: -200, left: -200,
            x: o1x, y: o1y,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)',
            bottom: -100, right: '5%',
            x: o2x, y: o2y,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
            top: '40%', right: '25%',
            x: o3x, y: o3y,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ y, opacity }}>
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-sm mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          {t.hero.badge}
        </motion.div>

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

        <div className="overflow-hidden mt-6 mb-12">
          <motion.p
            className="text-lg md:text-xl text-zinc-500 tracking-widest uppercase font-light"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            {t.hero.role}{' '}
            <span className="text-indigo-400 font-medium">{t.hero.roleEm}</span>
            {' '}— Rouen, France
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white tabular-nums">{stat.value}<span className="text-indigo-400">+</span></span>
              <span className="text-zinc-600 text-xs uppercase tracking-widest mt-0.5">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
        >
          <a
            href="#projects"
            className="group relative overflow-hidden px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-300"
          >
            <motion.span className="relative z-10 flex items-center gap-2">
              {t.hero.cta}
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.span>
          </a>
          <a
            href={asset('pdf/CV_Rouillard_Jérémy.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full border border-zinc-700 hover:border-indigo-500/50 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-300"
          >
            {t.hero.cv}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-zinc-600 to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}