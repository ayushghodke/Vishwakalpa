import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Portfolio from './sections/Portfolio'
import Services from './sections/Services'
import About from './sections/About'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
