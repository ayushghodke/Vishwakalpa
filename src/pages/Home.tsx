import { useEffect } from 'react'
import { useLocation } from 'react-router'
import type { MetaDescriptor } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import Sectors from '../sections/Sectors'
import Services from '../sections/Services'
import Portfolio from '../sections/Portfolio'
import About from '../sections/About'
import BlogsSection from '../sections/BlogsSection'
import Contact from '../sections/Contact'
import { buildMeta } from '../utils/seo'

// ============================================
// HOMEPAGE
//
// Every section is imported statically. They were previously wrapped in
// lazy() + <Suspense fallback={null}>, which under prerendering would have
// emitted a page containing the hero and nothing else — React renders the
// fallback when a lazy component suspends, and `null` is a blank page.
//
// That would have defeated the entire point of prerendering: Google, AI
// crawlers and social scrapers would all have received a homepage with no
// services, no projects, no industries and no contact details. The bundle-size
// saving from lazy loading five sections is small; the SEO cost was total.
// ============================================

export function meta(): MetaDescriptor[] {
    return buildMeta({
        title: 'Vishwakalpa | Factory Design Consultants India',
        description:
            'Industrial design consultancy for foundries, factories and manufacturing plants. Master planning, architecture, structural design and PMC across India.',
        path: '/',
    })
}

function Home() {
    const { hash } = useLocation()

    // The navbar links to /#services from other routes. On arrival the hash is
    // present but the browser has already given up trying to scroll, because
    // the target did not exist during the initial paint.
    useEffect(() => {
        if (!hash) return
        const id = hash.slice(1)
        // rAF so the sections have committed before we measure.
        const raf = requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        })
        return () => cancelAnimationFrame(raf)
    }, [hash])

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Services />
                <Sectors />
                <Portfolio />
                <BlogsSection />
                <About />
                <Contact />
            </main>
            <Footer />
        </>
    )
}


export default Home
