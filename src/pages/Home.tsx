import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import Footer from '../components/Footer'
import '../index.css'

const Portfolio = lazy(() => import('../sections/Portfolio'))
const Services = lazy(() => import('../sections/Services'))
const About = lazy(() => import('../sections/About'))
const Contact = lazy(() => import('../sections/Contact'))

function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Suspense fallback={null}>
                    <Portfolio />
                    <Services />
                    <About />
                    <Contact />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}

export default Home
