import Head from './components/Head'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Parcours from './components/sections/Parcours'
import Veille from './components/sections/Veille'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-background min-h-screen">
      <Head />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <div className="section-bg-wrapper relative overflow-hidden">
          {/* Background decoration */}
          <div className="section-bg-deco absolute inset-0 pointer-events-none" aria-hidden="true">

            {/* ── Line grid ── */}
            <div className="absolute inset-0" style={{
              backgroundImage:
                'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),' +
                'linear-gradient(to right, rgba(99,102,241,0.07) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }} />

            {/* ── Top separator with glow ── */}
            <div className="absolute top-0 inset-x-0 h-px" style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.9) 25%, rgba(192,132,252,0.7) 50%, rgba(99,102,241,0.9) 75%, transparent 100%)',
              boxShadow: '0 0 32px 6px rgba(99,102,241,0.3)',
            }} />

            {/* ── Animated orbs ── */}
            {/* Indigo — top right */}
            <div className="absolute rounded-full orb-a" style={{
              top: '1%', right: '-12%', width: 1000, height: 1000,
              background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 60%)',
            }} />
            {/* Violet — mid left */}
            <div className="absolute rounded-full orb-b" style={{
              top: '28%', left: '-16%', width: 850, height: 850,
              background: 'radial-gradient(circle, rgba(124,58,237,0.11) 0%, transparent 60%)',
            }} />
            {/* Purple — center */}
            <div className="absolute rounded-full orb-c" style={{
              top: '55%', left: '10%', width: 650, height: 650,
              background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 60%)',
            }} />
            {/* Indigo lighter — bottom right */}
            <div className="absolute rounded-full orb-b" style={{
              bottom: '10%', right: '2%', width: 720, height: 720,
              background: 'radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 60%)',
            }} />
            {/* Cyan accent — bottom left corner */}
            <div className="absolute rounded-full orb-a" style={{
              bottom: '5%', left: '-8%', width: 500, height: 500,
              background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 60%)',
            }} />

            {/* ── Vignette (edges dark) ── */}
            <div className="absolute inset-0" style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 55%, rgba(4,4,10,0.55) 100%)',
            }} />

          </div>

          <About />
          <Skills />
          <Experience />
          <Projects />
          <Parcours />
          <Veille />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  )
}
