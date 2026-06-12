import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { useLang } from '../../contexts/LangContext'

const EASE = [0.22, 1, 0.36, 1]

/* ─────────────── SVG ILLUSTRATIONS ─────────────── */

function RadarIllustration() {
  const blips = [
    { cx: 200, cy: 110, delay: 0.3, r: 3 },
    { cx: 270, cy: 155, delay: 1.1, r: 2.5 },
    { cx: 145, cy: 175, delay: 0.7, r: 3.5 },
    { cx: 240, cy: 210, delay: 1.8, r: 2 },
    { cx: 160, cy: 130, delay: 2.2, r: 2.5 },
    { cx: 290, cy: 195, delay: 0.9, r: 2 },
  ]
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <mask id="radarMask">
          <circle cx="200" cy="160" r="110" fill="white" />
        </mask>
        <style>{`
          @keyframes radarSweep {
            from { transform: rotate(0deg); transform-origin: 200px 160px; }
            to   { transform: rotate(360deg); transform-origin: 200px 160px; }
          }
          @keyframes blip {
            0%,100% { opacity:0; r:2; }
            50%     { opacity:1; r:5; }
          }
          .sweep { animation: radarSweep 3s linear infinite; }
          .blip0 { animation: blip 2s 0.3s ease-in-out infinite; }
          .blip1 { animation: blip 2s 1.1s ease-in-out infinite; }
          .blip2 { animation: blip 2s 0.7s ease-in-out infinite; }
          .blip3 { animation: blip 2s 1.8s ease-in-out infinite; }
          .blip4 { animation: blip 2s 2.2s ease-in-out infinite; }
          .blip5 { animation: blip 2s 0.9s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* Background glow */}
      <circle cx="200" cy="160" r="110" fill="url(#radarGlow)" />

      {/* Rings */}
      {[35, 65, 95, 110].map((r, i) => (
        <circle
          key={r}
          cx="200" cy="160" r={r}
          fill="none"
          stroke="#6366f1"
          strokeOpacity={0.12 + i * 0.04}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Cross hairs */}
      <line x1="200" y1="50" x2="200" y2="270" stroke="#6366f1" strokeOpacity="0.1" strokeWidth="1" />
      <line x1="90" y1="160" x2="310" y2="160" stroke="#6366f1" strokeOpacity="0.1" strokeWidth="1" />

      {/* Sweep */}
      <g className="sweep" mask="url(#radarMask)">
        <path
          d={`M 200 160 L 200 50 A 110 110 0 0 1 ${200 + 110 * Math.sin(Math.PI / 3)} ${160 - 110 * Math.cos(Math.PI / 3)} Z`}
          fill="url(#sweepGrad)"
          opacity="0.7"
        />
        <line x1="200" y1="160" x2="200" y2="50" stroke="#6366f1" strokeOpacity="0.8" strokeWidth="1.5" />
      </g>

      {/* Blips */}
      {blips.map((b, i) => (
        <circle
          key={i}
          cx={b.cx} cy={b.cy} r={b.r}
          fill="#818cf8"
          className={`blip${i}`}
        />
      ))}

      {/* Center dot */}
      <circle cx="200" cy="160" r="4" fill="#6366f1" />
      <circle cx="200" cy="160" r="8" fill="none" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1" />

      {/* Labels */}
      {[
        { x: 310, y: 80, t: 'React' },
        { x: 88, y: 100, t: 'Next.js' },
        { x: 315, y: 240, t: 'Node.js' },
        { x: 95, y: 245, t: 'Docker' },
      ].map((l) => (
        <text key={l.t} x={l.x} y={l.y} fill="#6366f1" fillOpacity="0.35" fontSize="10" fontFamily="monospace">
          {l.t}
        </text>
      ))}
    </svg>
  )
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="shieldGlow" cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <style>{`
          @keyframes pulse {
            0%,100% { opacity:0.4; transform:scale(1);   transform-origin:200px 148px; }
            50%      { opacity:0.8; transform:scale(1.04); transform-origin:200px 148px; }
          }
          @keyframes threatFly {
            0%   { opacity:1; }
            100% { opacity:0; transform:scale(0); }
          }
          @keyframes circuitFlow {
            0%   { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          .shieldPulse { animation: pulse 2.5s ease-in-out infinite; }
          .threat { animation: threatFly 2s ease-in infinite; }
          .circuit { stroke-dasharray: 6 3; animation: circuitFlow 4s linear infinite; }
        `}</style>
      </defs>

      <ellipse cx="200" cy="155" rx="100" ry="90" fill="url(#shieldGlow)" />

      {/* Shield outer glow */}
      <path
        className="shieldPulse"
        d="M200 60 L275 90 L275 160 C275 200 200 235 200 235 C200 235 125 200 125 160 L125 90 Z"
        fill="none" stroke="#6366f1" strokeOpacity="0.2" strokeWidth="14" strokeLinejoin="round"
      />
      {/* Shield */}
      <path
        d="M200 68 L268 96 L268 162 C268 198 200 228 200 228 C200 228 132 198 132 162 L132 96 Z"
        fill="#0a0a0a" stroke="#6366f1" strokeOpacity="0.7" strokeWidth="1.5" strokeLinejoin="round"
        filter="url(#glow)"
      />
      {/* Shield inner */}
      <path
        d="M200 84 L254 107 L254 160 C254 188 200 212 200 212 C200 212 146 188 146 160 L146 107 Z"
        fill="#6366f1" fillOpacity="0.06"
        stroke="#6366f1" strokeOpacity="0.2" strokeWidth="1" strokeLinejoin="round"
      />

      {/* Lock body */}
      <rect x="182" y="148" width="36" height="28" rx="4" fill="#6366f1" fillOpacity="0.8" />
      {/* Lock shackle */}
      <path d="M190 148 L190 138 A10 10 0 0 1 210 138 L210 148" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
      {/* Keyhole */}
      <circle cx="200" cy="160" r="4" fill="#0a0a0a" />
      <rect x="198" y="160" width="4" height="7" rx="1" fill="#0a0a0a" />

      {/* Circuit lines */}
      <path d="M132 130 L95 130 L95 105 L75 105" className="circuit" fill="none" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1" />
      <path d="M268 130 L305 130 L305 105 L325 105" className="circuit" fill="none" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1" />
      <path d="M200 68 L200 45 L230 45" className="circuit" fill="none" stroke="#6366f1" strokeOpacity="0.3" strokeWidth="1" />

      {/* Threat particles (X marks) */}
      {[
        { x: 80, y: 100 }, { x: 320, y: 95 }, { x: 75, y: 185 }, { x: 325, y: 175 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          <circle r="8" fill="#ef4444" fillOpacity="0.15" />
          <line x1="-4" y1="-4" x2="4" y2="4" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="4" y1="-4" x2="-4" y2="4" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>
      ))}

      {/* Check marks on shield */}
      <path d="M188 172 L196 180 L213 163" stroke="#818cf8" strokeOpacity="0" strokeWidth="0" />
    </svg>
  )
}

function DataIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes flowDrop {
            0%   { transform: translateY(0);   opacity:1; }
            100% { transform: translateY(30px); opacity:0; }
          }
          @keyframes barGrow0 { 0%,100%{height:40px;y:220px} 50%{height:55px;y:205px} }
          @keyframes barGrow1 { 0%,100%{height:65px;y:195px} 50%{height:80px;y:180px} }
          @keyframes barGrow2 { 0%,100%{height:50px;y:210px} 50%{height:60px;y:200px} }
          @keyframes barGrow3 { 0%,100%{height:75px;y:185px} 50%{height:85px;y:175px} }
          @keyframes barGrow4 { 0%,100%{height:45px;y:215px} 50%{height:55px;y:205px} }
          .bar0{animation:barGrow0 3s 0.0s ease-in-out infinite}
          .bar1{animation:barGrow1 3s 0.3s ease-in-out infinite}
          .bar2{animation:barGrow2 3s 0.6s ease-in-out infinite}
          .bar3{animation:barGrow3 3s 0.9s ease-in-out infinite}
          .bar4{animation:barGrow4 3s 1.2s ease-in-out infinite}
          @keyframes ping {
            0%   { r:6;  opacity:0.8; }
            100% { r:16; opacity:0; }
          }
          .ping { animation: ping 2s ease-out infinite; }
        `}</style>
        <radialGradient id="dataGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="155" rx="120" ry="100" fill="url(#dataGlow)" />

      {/* Source icons at top */}
      {[
        { x: 75,  label: 'Alerts', icon: '🔔' },
        { x: 155, label: 'RSS',    icon: '📡' },
        { x: 245, label: 'GitHub', icon: '🐙' },
        { x: 325, label: 'Sheets', icon: '📊' },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 22} y="35" width="44" height="38" rx="8"
            fill="#1a1a1a" stroke="#27272a" strokeWidth="1" />
          <text x={s.x} y="58" textAnchor="middle" fontSize="16">{s.icon}</text>
          <text x={s.x} y="88" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace">{s.label}</text>
          {/* Flow line */}
          <line x1={s.x} y1="73" x2={s.x} y2="105" stroke="#6366f1" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}

      {/* Funnel */}
      <path d="M60 108 L340 108 L270 148 L270 168 L130 168 L130 148 Z"
        fill="#6366f1" fillOpacity="0.08" stroke="#6366f1" strokeOpacity="0.35" strokeWidth="1.5" />
      <text x="200" y="143" textAnchor="middle" fill="#6366f1" fillOpacity="0.5" fontSize="9" fontFamily="monospace">FILTER</text>

      {/* Bars chart */}
      {[
        { x: 140, cls: 'bar0', c: '#6366f1' },
        { x: 163, cls: 'bar1', c: '#818cf8' },
        { x: 186, cls: 'bar2', c: '#6366f1' },
        { x: 209, cls: 'bar3', c: '#818cf8' },
        { x: 232, cls: 'bar4', c: '#6366f1' },
      ].map((b) => (
        <rect key={b.x} x={b.x} y="185" width="16" height="75" rx="3"
          fill={b.c} fillOpacity="0.6" className={b.cls} />
      ))}

      {/* Baseline */}
      <line x1="130" y1="260" x2="260" y2="260" stroke="#27272a" strokeWidth="1" />

      {/* Ping on one bar */}
      <circle cx="198" cy="185" r="6" fill="none" stroke="#818cf8" strokeOpacity="0.4" className="ping" />
    </svg>
  )
}

function NetworkIllustration() {
  const nodes = [
    { id: 'c', x: 200, y: 150, r: 18, main: true },
    { id: 'n1', x: 110, y: 90,  r: 10 },
    { id: 'n2', x: 295, y: 85,  r: 10 },
    { id: 'n3', x: 80,  y: 175, r: 8  },
    { id: 'n4', x: 320, y: 175, r: 8  },
    { id: 'n5', x: 130, y: 240, r: 9  },
    { id: 'n6', x: 270, y: 240, r: 9  },
    { id: 'n7', x: 200, y: 265, r: 7  },
  ]
  const edges = [
    ['c','n1'],['c','n2'],['c','n3'],['c','n4'],['c','n5'],['c','n6'],['c','n7'],
    ['n1','n2'],['n3','n5'],['n4','n6'],
  ]
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <style>{`
          @keyframes edgePulse {
            0%,100% { stroke-opacity: 0.15; }
            50%      { stroke-opacity: 0.5;  }
          }
          @keyframes nodePing {
            0%   { r: 10; opacity:0.5; }
            100% { r: 22; opacity:0; }
          }
          .edge { animation: edgePulse 2.5s ease-in-out infinite; }
          .edge:nth-child(odd)  { animation-delay: 0.4s; }
          .edge:nth-child(even) { animation-delay: 1.2s; }
          .nodePing { animation: nodePing 2s ease-out infinite; }
        `}</style>
      </defs>

      <circle cx="200" cy="150" r="120" fill="url(#netGlow)" />

      {/* Edges */}
      {edges.map(([a, b]) => {
        const na = nodeMap[a], nb = nodeMap[b]
        return (
          <line key={`${a}-${b}`}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="#6366f1" strokeWidth="1" className="edge"
          />
        )
      })}

      {/* Node pings */}
      {nodes.filter(n => !n.main).map(n => (
        <circle key={`ping-${n.id}`} cx={n.x} cy={n.y} r={n.r}
          fill="none" stroke="#818cf8" strokeOpacity="0.3" className="nodePing"
          style={{ animationDelay: `${Math.random() * 2}s` }}
        />
      ))}

      {/* Nodes */}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={n.r + 4}
            fill="#6366f1" fillOpacity={n.main ? 0.12 : 0.06} />
          <circle cx={n.x} cy={n.y} r={n.r}
            fill={n.main ? '#6366f1' : '#1a1a1a'}
            stroke="#6366f1"
            strokeOpacity={n.main ? 0.9 : 0.4}
            strokeWidth={n.main ? 2 : 1.5}
          />
        </g>
      ))}

      {/* GitHub mark on center node */}
      <path
        d="M200 143 C196.7 143 194 145.7 194 149 C194 151.6 195.7 153.8 198 154.6 C198.3 154.6 198.4 154.5 198.4 154.3 L198.4 153.1 C196.8 153.5 196.4 152.4 196.4 152.4 C196.1 151.6 195.6 151.4 195.6 151.4 C194.9 150.9 195.6 150.9 195.6 150.9 C196.3 151 196.7 151.7 196.7 151.7 C197.4 152.9 198.6 152.5 199 152.3 C199.1 151.8 199.3 151.4 199.5 151.2 C198 151 196.4 150.4 196.4 147.9 C196.4 147.1 196.7 146.5 197.1 146 C197 145.8 196.7 145.1 197.2 144.1 C197.2 144.1 197.9 143.9 199.4 144.9 C199.9 144.8 200.5 144.7 201 144.7 C201.5 144.7 202 144.8 202.6 144.9 C204.1 143.9 204.8 144.1 204.8 144.1 C205.3 145.1 205 145.8 204.9 146 C205.3 146.5 205.6 147.1 205.6 147.9 C205.6 150.4 204 151 202.5 151.2 C202.8 151.5 203 152 203 152.7 L203 154.3 C203 154.5 203.1 154.7 203.5 154.6 C205.8 153.8 207.5 151.6 207.5 149 C207.5 145.7 204.8 143 201.5 143 Z"
        fill="white" fillOpacity="0.85"
      />

      {/* Branch labels */}
      {[
        { x: 102, y: 78,  t: 'main' },
        { x: 290, y: 74,  t: 'dev' },
        { x: 60,  y: 165, t: 'feat' },
        { x: 127, y: 252, t: 'fix' },
      ].map(l => (
        <text key={l.t} x={l.x} y={l.y} fill="#6366f1" fillOpacity="0.35"
          fontSize="8" fontFamily="monospace">{l.t}</text>
      ))}
    </svg>
  )
}

/* ─────────────── DATA ─────────────── */

const illustrations = [RadarIllustration, ShieldIllustration, DataIllustration, NetworkIllustration]

/* ─────────────── CARD ─────────────── */

function TopicCard({ topic, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.04, ease: EASE }}
    >
      {/* Illustration */}
      <div className={`relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="absolute inset-0 bg-indigo-600/8 rounded-2xl blur-3xl scale-90" />
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex items-center justify-center p-4">
          <topic.Illustration />
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5 shrink-0">{topic.icon}</span>
          <div>
            {topic.subtitle && (
              <p className="text-indigo-400/60 text-xs font-mono uppercase tracking-widest mb-1">
                {topic.subtitle}
              </p>
            )}
            <h3 className="text-white font-bold text-xl leading-tight">{topic.title}</h3>
          </div>
        </div>

        {topic.content && (
          <p className="text-zinc-500 text-sm leading-relaxed">{topic.content}</p>
        )}

        {topic.items && (
          <ul className="space-y-3">
            {topic.items.map((item) => (
              <li key={item.name} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 font-semibold text-sm hover:text-indigo-200 transition-colors"
                >
                  {item.name} ↗
                </a>
                <p className="text-zinc-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                {item.cta && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium hover:bg-indigo-600/25 transition-colors"
                  >
                    {item.cta}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}

        {topic.link && (
          <a
            href={topic.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            {topic.linkLabel}
          </a>
        )}
      </div>
    </motion.div>
  )
}

/* ─────────────── SECTION ─────────────── */

export default function Veille() {
  const { t } = useLang()
  const topics = t.veille.topics.map((topic, i) => ({ ...topic, Illustration: illustrations[i] }))

  return (
    <section id="veille" className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="06" title={t.veille.title} subtitle={t.veille.subtitle} />
        <div className="space-y-20 md:space-y-28">
          {topics.map((topic, i) => (
            <TopicCard key={topic.num} topic={topic} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
