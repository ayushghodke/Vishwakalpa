import { useParams, Link } from 'react-router';
import type { MetaDescriptor } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { getProject, clientLabel } from '../data/projects';
import { getService } from '../data/services';
import { getWhatsAppUrl } from '../data/company';
import { buildMeta } from '../utils/seo';
import { projectSchema, breadcrumbSchema } from '../utils/schema';
import './ProjectDetail.css';

// ============================================
// CASE STUDY PAGE
//
// Client identity is anonymised — clientLabel() returns the real name if
// projects.ts has one, and the descriptor otherwise. All technical substance is
// published in full: the crane duty cycles, the HT distribution, the floor load
// specification. That specificity is what ranks and what convinces a factory
// owner; the client name contributes almost nothing to search.
// ============================================

export function meta({ params }: { params: { slug?: string } }): MetaDescriptor[] {
    const project = params.slug ? getProject(params.slug) : undefined;

    if (!project) {
        return buildMeta({
            title: 'Vishwakalpa | Project Not Found',
            description: 'This page could not be found.',
            path: `/projects/${params.slug ?? ''}`,
            noindex: true,
        });
    }

    return buildMeta({
        title: project.seoTitle,
        description: project.seoDescription,
        path: `/projects/${project.slug}`,
        image: project.image ?? undefined,
        type: 'article',
    });
}

const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = slug ? getProject(slug) : undefined;

    if (!project) {
        return <NotFound />;
    }

    const relatedServices = project.relatedServices
        .map((s) => getService(s))
        .filter((s): s is NonNullable<typeof s> => Boolean(s));

    return (
        <div className="project-detail-page">
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        projectSchema(project),
                        breadcrumbSchema([
                            { name: 'Home', path: '/' },
                            { name: project.shortTitle, path: `/projects/${project.slug}` },
                        ]),
                    ]),
                }}
            />

            <section className="pd-hero">
                {project.image && (
                    <div className="pd-hero-media">
                        <img
                            src={project.image}
                            alt={`${project.title}, ${project.city}`}
                            width="1400"
                            height="700"
                            fetchPriority="high"
                            decoding="async"
                        />
                        <div className="pd-hero-media-overlay"></div>
                    </div>
                )}
                <div className="pd-hero-glow"></div>
                <div className="container pd-hero-container">
                    <Link to="/" className="pd-back-link">
                        <ArrowLeft size={18} /> BACK TO HOME
                    </Link>
                    <p className="pd-eyebrow">
                        {project.industry} · {project.city}, {project.region}
                    </p>
                    <h1 className="pd-title">{project.title}</h1>
                    <p className="pd-subtitle">
                        Delivered for {clientLabel(project)}
                        {project.durationMonths ? ` over ${project.durationMonths} months` : ''}.
                    </p>

                    <dl className="pd-stat-bar">
                        {project.stats.map((stat) => (
                            <div key={stat.label} className="pd-stat">
                                <dt>{stat.label}</dt>
                                <dd>{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">
                    <div className="pd-summary">
                        {project.summary.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="pd-facts">
                        <div className="pd-fact">
                            <span className="pd-fact-label">Plot area</span>
                            <span className="pd-fact-value">{project.plotArea}</span>
                        </div>
                        {project.builtUpArea && (
                            <div className="pd-fact">
                                <span className="pd-fact-label">Built-up area</span>
                                <span className="pd-fact-value">{project.builtUpArea}</span>
                            </div>
                        )}
                        <div className="pd-fact">
                            <span className="pd-fact-label">Status</span>
                            <span className="pd-fact-value">{project.status}</span>
                        </div>
                        <div className="pd-fact pd-fact--wide">
                            <span className="pd-fact-label">Our scope</span>
                            <span className="pd-fact-value">{project.scope.join(' · ')}</span>
                        </div>
                    </div>

                    {/* Problem → Solution → Outcome, one block per engineering
                        vertical. This is the structure the technical detail
                        arrived in and it is the right one — it shows reasoning,
                        not just a specification list. */}
                    {project.verticals.map((vertical) => (
                        <article key={vertical.number} className="pd-vertical">
                            <header className="pd-vertical-header">
                                <span className="pd-vertical-number">{vertical.number}</span>
                                <div>
                                    <p className="pd-vertical-discipline">{vertical.discipline}</p>
                                    <h2>{vertical.heading}</h2>
                                    <p className="pd-vertical-subheading">{vertical.subheading}</p>
                                </div>
                            </header>

                            <div className="pd-pso">
                                <div className="pd-pso-block">
                                    <h3>The problem</h3>
                                    <p>{vertical.problem}</p>
                                </div>
                                <div className="pd-pso-block">
                                    <h3>The solution</h3>
                                    <p>{vertical.solution}</p>
                                </div>
                                <div className="pd-pso-block pd-pso-block--outcome">
                                    <h3>The outcome</h3>
                                    <p>{vertical.outcome}</p>
                                </div>
                            </div>
                        </article>
                    ))}

                    {relatedServices.length > 0 && (
                        <div className="pd-related">
                            <h2 className="pd-related-title">Services used on this project</h2>
                            <div className="pd-related-grid">
                                {relatedServices.map((service) => (
                                    <Link
                                        key={service.slug}
                                        to={`/services/${service.slug}`}
                                        className="pd-related-card"
                                    >
                                        <span>{service.title}</span>
                                        <ArrowRight size={18} aria-hidden="true" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pd-cta">
                        <h2>Planning something similar?</h2>
                        <p>
                            Tell us the plot and the process, and you will get a specific
                            answer rather than a brochure.
                        </p>
                        <div className="pd-cta-actions">
                            <Link to="/#contact" className="btn btn-primary btn-lg">
                                Send an enquiry
                            </Link>
                            <a
                                href={getWhatsAppUrl(`Hello! I would like to discuss a project similar to ${project.title}.`)}
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

export default ProjectDetail;
