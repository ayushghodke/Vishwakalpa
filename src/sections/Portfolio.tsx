import { Link } from 'react-router';
import { ArrowRight, MapPin } from 'lucide-react';
import './Portfolio.css';
import { projectsByOrder, clientLabel } from '../data/projects';

// ============================================
// PORTFOLIO
//
// Rewritten. The previous version resolved each card's photo by substring
// matching the project NAME through ~55 lines of if/else, while content.json
// carried an `image` field that was ignored entirely — so renaming a project
// silently swapped its photo for a fallback. It also called getProjectImages(),
// which returned 2–5 images per project, then used only images[0]: roughly 13
// of 20 portfolio images were downloaded and never displayed. Every card was
// also stamped width="1400" height="933" regardless of its real aspect ratio,
// so the CLS protection was wrong for most of them.
//
// Categories removed with the industrial repositioning:
//   residential    — answer A5 rules it out entirely, and showing it invites
//                    exactly the enquiries the firm does not want
//   commercial     — contained only a "Website is in progress" placeholder
//   institutional  — same
//   urban planning — municipal work, not industrial (answers A5, A7)
//
// What remains is the two detailed case studies, which also suits the
// "2–4 projects a year" positioning: depth, not a wall of thumbnails.
// ============================================

const Portfolio = () => {
    return (
        <section id="portfolio" className="section-lg">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">
                        Selected <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-gray mb-8">
                        Two facilities in detail — the engineering decisions, and why they
                        were made.
                    </p>
                </div>

                <div className="case-study-grid">
                    {projectsByOrder.map((project) => (
                        <article key={project.slug} className="case-study-card glass-card-gold">
                            <div className="case-study-media">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={`${project.title}, ${project.city}`}
                                        loading="lazy"
                                        decoding="async"
                                        width="800"
                                        height="533"
                                    />
                                ) : (
                                    // Same placeholder convention as sectors.ts and
                                    // team.ts — a branded panel until a photograph or
                                    // render is supplied.
                                    <div className="case-study-placeholder">
                                        <span className="case-study-placeholder-label">
                                            {project.industry.split('—')[0]?.trim()}
                                        </span>
                                    </div>
                                )}
                                <span className="case-study-status">{project.status}</span>
                            </div>

                            <div className="case-study-body">
                                <p className="case-study-location">
                                    <MapPin size={14} aria-hidden="true" />
                                    {project.city}, {project.region}
                                </p>

                                <h3>{project.title}</h3>

                                <p className="case-study-client">For {clientLabel(project)}</p>

                                <dl className="case-study-stats">
                                    {project.stats.map((stat) => (
                                        <div key={stat.label} className="case-study-stat">
                                            <dt>{stat.label}</dt>
                                            <dd>{stat.value}</dd>
                                        </div>
                                    ))}
                                </dl>

                                <Link to={`/projects/${project.slug}`} className="case-study-link">
                                    Read the case study
                                    <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
