import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { useLang } from '../../contexts/LangContext'

const EASE = [0.22, 1, 0.36, 1]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { t } = useLang()
  const [visibleLines, setVisibleLines] = useState(0)

  const lines = [
    { type: 'cmd',    text: 'whoami' },
    { type: 'out',    text: `Jérémy Rouillard — ${t.footer.role}` },
    { type: 'blank' },
    { type: 'cmd',    text: 'cat contact.txt' },
    { type: 'kv',     key: 'email',             value: 'jeremy.rouillard27@gmail.com', href: 'mailto:jeremy.rouillard27@gmail.com' },
    { type: 'kv',     key: t.contact.phone,      value: '06 15 65 18 65',              href: 'tel:+33615651865' },
    { type: 'kv',     key: t.contact.location,   value: t.contact.locationVal },
    { type: 'blank' },
    { type: 'cmd',    text: 'open ./links' },
    { type: 'links' },
    { type: 'blank' },
    { type: 'cursor' },
  ]

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    let i = 0
    const tick = () => {
      if (cancelled || i >= lines.length) return
      setVisibleLines(++i)
      setTimeout(tick, 110)
    }
    setTimeout(tick, 400)
    return () => { cancelled = true }
  }, [inView])

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <SectionHeader number="07" title={t.contact.title} subtitle={t.contact.subtitle} />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50"
          style={{ background: '#0d0d0d' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/80" style={{ background: '#161616' }}>
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="flex-1 text-center text-zinc-500 text-xs font-mono" style={{ marginLeft: '-3.5rem' }}>
              ~/portfolio — zsh
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 md:p-8 font-mono text-sm leading-relaxed min-h-[260px]">
            {lines.slice(0, visibleLines).map((line, i) => {
              if (line.type === 'blank') return <div key={i} className="h-3" />

              if (line.type === 'cmd') return (
                <div key={i} className="flex items-center gap-2 mb-1">
                  <span className="text-indigo-400 text-xs select-none">jeremy@portfolio</span>
                  <span className="text-zinc-600 select-none">~%</span>
                  <span className="text-zinc-100">{line.text}</span>
                </div>
              )

              if (line.type === 'out') return (
                <p key={i} className="text-zinc-400 mb-1 pl-0">{line.text}</p>
              )

              if (line.type === 'kv') return (
                <div key={i} className="flex gap-4 mb-0.5">
                  <span className="text-indigo-400/50 w-24 shrink-0 text-xs">{line.key}</span>
                  {line.href
                    ? <a href={line.href} className="text-zinc-300 hover:text-indigo-300 transition-colors duration-200">{line.value}</a>
                    : <span className="text-zinc-300">{line.value}</span>
                  }
                </div>
              )

              if (line.type === 'links') return (
                <div key={i} className="flex flex-wrap gap-2 mt-1">
                  <a
                    href="https://github.com/JRMi27"
                    target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 hover:border-indigo-500/60 hover:text-indigo-300 transition-all duration-200 text-xs"
                  >
                    github.com/JRMi27
                  </a>
                  <a
                    href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-rouillard-5734892a6/"
                    target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 hover:border-indigo-500/60 hover:text-indigo-300 transition-all duration-200 text-xs"
                  >
                    linkedin/jérémy-rouillard
                  </a>
                </div>
              )

              if (line.type === 'cursor') return (
                <div key={i} className="flex items-center gap-2 mt-1">
                  <span className="text-indigo-400 text-xs select-none">jeremy@portfolio</span>
                  <span className="text-zinc-600 select-none">~%</span>
                  <span className="inline-block w-[7px] h-[14px] bg-indigo-400/80 cursor-blink" />
                </div>
              )

              return null
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
