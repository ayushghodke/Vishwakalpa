import { Link } from 'react-router';
import type { MetaDescriptor } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { teamByOrder, combinedYearsExperience, initials } from '../data/team';
import { company, whatsappUrl } from '../data/company';
import { buildMeta } from '../utils/seo';
import { teamPageSchema, breadcrumbSchema } from '../utils/schema';
import './Team.css';

// ============================================
// TEAM PAGE
//
// The single highest-leverage page on this site for search. Google gives a
// substantial ranking advantage to sites that demonstrably have real, qualified
// experts behind them — a page signed by a licensed structural engineer with
// dual-state registration outranks an anonymous page saying the same words.
// The previous site named nobody and showed no credentials at all.
//
// PHOTOS: every member currently has `photo: null`, which renders the branded
// initials placeholder below. Drop an image into public/images/team/<id>.webp
// and set the path in team.ts — nothing here needs to change.
// ============================================

export function meta(): MetaDescriptor[] {
    return buildMeta({
        title: 'Vishwakalpa | Industrial Design & Engineering Team',
        description:
            'Licensed structural engineers, planning-trained architects and a principal consultant with 40+ years in industrial MEP. Meet the team behind Vishwakalpa.',
        path: '/team',
    });
}

const Team = () => {
    const yearsFloor = Math.floor(combinedYearsExperience / 10) * 10;

    return (
        <div className="team-page">
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        teamPageSchema(teamByOrder),
                        breadcrumbSchema([
                            { name: 'Home', path: '/' },
                            { name: 'Team', path: '/team' },
                        ]),
                    ]),
                }}
            />

            <section className="team-hero">
                <div className="team-hero-glow"></div>
                <div className="container team-hero-container">
                    <Link to="/" className="team-back-link">
                        <ArrowLeft size={18} /> BACK TO HOME
                    </Link>
                    <h1 className="team-title">The People Behind the Drawings</h1>
                    <p className="team-subtitle">
                        {company.employeeCount} architects, engineers and project managers,
                        with {yearsFloor}+ years of combined experience across foundry,
                        machining, pharmaceutical and heavy manufacturing facilities.
                    </p>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">
                    <div className="team-grid">
                        {teamByOrder.map((member) => (
                            <article key={member.id} className="team-card glass-card-gold">
                                <div className="team-photo">
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            loading="lazy"
                                            decoding="async"
                                            width="400"
                                            height="400"
                                        />
                                    ) : (
                                        <div
                                            className="team-photo-placeholder"
                                            role="img"
                                            aria-label={`Photograph of ${member.name} coming soon`}
                                        >
                                            <span className="team-initials">
                                                {initials(member.name)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="team-body">
                                    <h2 className="team-name">{member.name}</h2>
                                    <p className="team-role">{member.role}</p>
                                    <p className="team-credential">{member.credential}</p>

                                    {member.qualifications.length > 0 && (
                                        <ul className="team-quals">
                                            {member.qualifications.map((qual) => (
                                                <li key={qual}>{qual}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="team-bio">
                                        {member.bio.map((paragraph, i) => (
                                            <p key={i}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="team-cta">
                        <h2>Working with us</h2>
                        <p>
                            We take {company.engagement.projectsPerYear} large projects a year,
                            deliberately, so the people above stay on every one of them.
                        </p>
                        <div className="team-cta-actions">
                            <Link to="/#contact" className="btn btn-primary btn-lg">
                                Send an enquiry
                            </Link>
                            <a
                                href={whatsappUrl}
                                className="btn btn-secondary btn-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Message on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Team;
