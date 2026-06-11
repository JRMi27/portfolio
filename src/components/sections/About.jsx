import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { asset } from '../../utils/asset'

const EASE = [0.22, 1, 0.36, 1]

const paragraphs = [
  "Passionné par le développement web et les nouvelles technologies, je suis actuellement en Licence Informatique après avoir obtenu mon BTS SIO option SLAM au Lycée Gustave Flaubert de Rouen.",
  "Mon parcours m'a permis de développer des compétences solides en développement full stack, avec une appétence particulière pour la création d'interfaces modernes et performantes.",
  "En dehors du code, je suis passionné par la musique, les voyages, les films en VO et l'apprentissage du japonais depuis 2022.",
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader number="01" title="À Propos" subtitle="Qui suis-je" />

      <div ref={ref} className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text */}
        <div className="space-y-6 order-2 md:order-1">
          {paragraphs.map((text, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className="text-zinc-400 text-base md:text-lg leading-relaxed"
                initial={{ y: 36, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
              >
                {text}
              </motion.p>
            </div>
          ))}

          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
          >
            <a
              href={asset('pdf/CV_Rouillard_Jérémy.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-300"
            >
              Télécharger CV
              <span className="group-hover:translate-y-0.5 transition-transform duration-200">↓</span>
            </a>
            <a
              href="mailto:jeremy.rouillard27@gmail.com"
              className="px-6 py-3 rounded-full border border-zinc-700 hover:border-indigo-500/50 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-300"
            >
              Me contacter
            </a>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          className="relative order-1 md:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <div className="relative w-72 md:w-80 mx-auto">
            {/* Glow */}
            <div className="absolute inset-0 bg-indigo-600/20 rounded-2xl blur-3xl scale-90" />
            {/* Frame */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/8 bg-zinc-900">
              <img
                src={asset('/images/photo_pp.jpg')}
                alt="Jérémy Rouillard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Corner decorations */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-indigo-500/60 rounded-br-xl pointer-events-none" />
            <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-indigo-500/60 rounded-tl-xl pointer-events-none" />
          </div>

          {/* Floating info badge */}
          <motion.div
            className="absolute -bottom-5 right-0 md:-right-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
          >
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-white text-xs font-semibold leading-tight">Licence Informatique</p>
              <p className="text-zinc-500 text-[11px]">2025 — Présent</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
