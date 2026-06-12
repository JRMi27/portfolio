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
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Parcours />
        <Veille />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
