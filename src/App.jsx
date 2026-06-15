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
            {/* Top separator */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 30%, rgba(148,163,184,0.4) 50%, rgba(99,102,241,0.6) 70%, transparent 100%)' }}
            />
            {/* Glow orbs */}
            <div className="absolute rounded-full" style={{ top: '2%',  right: '-12%', width: 900, height: 900, background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 62%)' }} />
            <div className="absolute rounded-full" style={{ top: '34%', left: '-14%', width: 780, height: 780, background: 'radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 62%)' }} />
            <div className="absolute rounded-full" style={{ bottom: '14%', right: '4%',  width: 680, height: 680, background: 'radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 62%)' }} />
            <div className="absolute rounded-full" style={{ top: '60%', left: '8%',   width: 560, height: 560, background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 62%)' }} />
            {/* Dot grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.3) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
                opacity: 0.18,
              }}
            />
            {/* Left accent rail */}
            <div
              className="absolute left-5 md:left-12 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(99,102,241,0.18) 6%, rgba(99,102,241,0.12) 86%, transparent 100%)' }}
            />
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
