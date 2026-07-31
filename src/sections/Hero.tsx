import { Link } from 'react-router';
import './Hero.css';
import { company, whatsappUrl } from '../data/company';

// ============================================
// HERO
//
// Replaces "Let's Build Lasting Spaces Together", which read as general
// architecture — the positioning the owner said actively misrepresents the
// company (answer A6). The headline below uses the language actual callers use
// (answer F3: "I need someone to design my factory", "I have land and need a
// manufacturing plant designed") rather than architectural abstraction.
//
// Two alternative headlines are drafted in SEO-QUESTIONS-OUTSTANDING.md → D1
// for the owner to choose from. Swapping is a one-line change.
// ============================================

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-bg">
                <img
                    src="/images/hero/mmlp-new.webp"
                    alt="Industrial facility designed by Vishwakalpa"
                    width="1920"
                    height="1080"
                    fetchPriority="high"
                    decoding="async"
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <div className="container">
                    {/* The only h1 on the homepage. Leads with the nouns a factory
                        owner actually searches for. */}
                    <h1 className="hero-title animate-fade-in-up">
                        Factories, Foundries and <span>Industrial Plants</span> — Designed to Run
                    </h1>
                    <p className="hero-subtitle">
                        Master planning, architecture, structural design and project management
                        for manufacturing facilities across India.
                    </p>

                    <div className="hero-actions">
                        <Link to="/services/foundry-design" className="btn btn-primary btn-lg">
                            Foundry &amp; Plant Design
                        </Link>
                        <a
                            href={whatsappUrl}
                            className="btn btn-secondary btn-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Discuss Your Project
                        </a>
                    </div>

                    {/* Qualifying signal (answers G2 and H1). Reads as confidence
                        rather than limitation, and lets the enquiries the firm
                        does not want — residential, interiors, retail — filter
                        themselves out before they reach the team. */}
                    <p className="hero-qualifier">
                        Industrial projects from {company.engagement.minProjectValue} ·{' '}
                        {company.engagement.projectsPerYear} engagements a year · Pune
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
