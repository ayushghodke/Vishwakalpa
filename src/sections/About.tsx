import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import './About.css';
import { company } from '../data/company';
import { combinedYearsExperience, leadership } from '../data/team';

// ============================================
// ABOUT
//
// Two claims were removed from the stats block here:
//
// "8+ Years of Excellence" — the company was incorporated in 2025 (answer B1).
//   Replaced with combined team experience, derived from team.ts rather than
//   hardcoded so it stays true. This is both accurate and a stronger claim: the
//   owner's own note says to lead with team experience over company age.
//
// "10,00,000+ Sq.ft Built-up Area" — not corroborated anywhere in the owner
//   answers. B6 confirms only "850+ acres designed", and the two case studies
//   together account for roughly 6.5 lakh sq ft. Held out pending confirmation
//   (SEO-QUESTIONS-OUTSTANDING.md → B4).
//
// The decorative world map with "3 Continents" was replaced by the cities where
// there is a real delivered project. Real place names carry local search weight;
// an unfalsifiable continent count carries none.
// ============================================

const About = () => {
    // 103 across the ten profiles. Floored to the nearest ten so the headline
    // claim stays comfortably true as people join or leave.
    const yearsFloor = Math.floor(combinedYearsExperience / 10) * 10;

    return (
        <section id="about" className="section-lg about-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">
                        Why <span className="text-primary">Vishwakalpa</span>
                    </h2>
                </div>

                <div className="mission-statement glass-card-gold">
                    <h3 className="mission-title">A boutique industrial practice</h3>
                    <p className="mission-text">
                        We design manufacturing facilities around the process they have to
                        house — not the other way round. Every project is modelled in BIM
                        before construction, so clashes between structure, services and
                        process equipment are resolved in the model rather than on site.
                        That is where our 10–15% construction cost saving comes from.
                        We take on {company.engagement.projectsPerYear} large projects a
                        year, deliberately, so senior people stay on every one of them.
                    </p>
                </div>

                <div className="highlights-grid">
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">850+ Acres</div>
                        <p className="highlight-label">Designed Area</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">{yearsFloor}+ Years</div>
                        <p className="highlight-label">Combined team experience</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">
                            {company.employeeCount}
                        </div>
                        <p className="highlight-label">Architects, Engineers and PMC</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">
                            {company.engagement.sweetSpot}
                        </div>
                        <p className="highlight-label">Typical project value</p>
                    </div>
                </div>

                {/* Leadership — credentials are a genuine ranking signal, and the
                    old site named nobody at all. */}
                <div className="leadership-wrapper">
                    <div className="section-header text-center mb-12">
                        <h2 className="mb-4">
                            Led by <span className="text-primary">Specialists</span>
                        </h2>
                        <p className="text-gray">
                            Not generalists who also take industrial work.
                        </p>
                    </div>

                    <div className="leadership-grid">
                        {leadership.map((member) => (
                            <div key={member.id} className="leadership-card glass-panel">
                                <h3 className="leadership-name">{member.name}</h3>
                                <p className="leadership-role">{member.role}</p>
                                <p className="leadership-credential">{member.credential}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/team" className="btn btn-primary">
                            Meet the full team
                        </Link>
                    </div>
                </div>

                {/* Where we work — real cities with real projects. */}
                <div className="locations-wrapper">
                    <div className="section-header text-center mb-12">
                        <h2 className="mb-4">
                            Where We <span className="text-primary">Work</span>
                        </h2>
                        <p className="text-gray">
                            Based in Pune, delivering across India. Projects completed or in
                            progress in:
                        </p>
                    </div>

                    <ul className="locations-list">
                        {company.projectCities.map((location) => (
                            <li key={location.city} className="location-chip">
                                <MapPin size={16} className="text-accent" aria-hidden="true" />
                                <span>
                                    <strong>{location.city}</strong>, {location.region}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="locations-note text-center text-gray">
                        Actively pursuing work across {company.areaServed.slice(0, -1).join(', ')} and{' '}
                        {company.areaServed.at(-1)}. We also support projects in Africa and
                        the USA.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
