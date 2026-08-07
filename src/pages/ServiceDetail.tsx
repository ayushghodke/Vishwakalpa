import { useParams, Link } from 'react-router';
import type { MetaDescriptor } from 'react-router';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormPopup from '../components/FormPopup';
import NotFound from './NotFound';
import { getService } from '../data/services';
import { getProject, clientLabel } from '../data/projects';
import { WEB3FORMS_ACCESS_KEY } from '../constants/config';
import { company, getWhatsAppUrl } from '../data/company';
import { useWeb3Form } from '../hooks/useWeb3Form';
import { buildMeta } from '../utils/seo';
import { serviceSchema, faqSchema, breadcrumbSchema } from '../utils/schema';
import './ServiceDetail.css';

export function meta({ params }: { params: { slug?: string } }): MetaDescriptor[] {
    const service = params.slug ? getService(params.slug) : undefined;

    if (!service) {
        return buildMeta({
            title: 'Vishwakalpa | Service Not Found',
            description: 'This page could not be found.',
            path: `/services/${params.slug ?? ''}`,
            noindex: true,
        });
    }

    // Self-referencing canonical, built from this page's own slug. The old site
    // hardcoded the homepage canonical into index.html, which every service page
    // then inherited — telling Google all five were duplicates of the homepage.
    return buildMeta({
        title: service.seoTitle,
        description: service.seoDescription,
        path: `/services/${service.slug}`,
    });
}

const ServiceDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const service = slug ? getService(slug) : undefined;
    const { onSubmit, isSubmitting, submitResult, resetResult } = useWeb3Form();

    if (!service) {
        return <NotFound />;
    }

    const relatedProject = service.relatedProject ? getProject(service.relatedProject) : undefined;

    return (
        <div className="service-detail-page">
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        serviceSchema(service),
                        faqSchema(service.faqs),
                        breadcrumbSchema([
                            { name: 'Home', path: '/' },
                            { name: service.shortTitle, path: `/services/${service.slug}` },
                        ]),
                    ]),
                }}
            />

            <section className="sd-hero">
                <div className="sd-hero-glow"></div>
                <div className="container sd-hero-container">
                    <Link to="/" className="sd-back-link">
                        <ArrowLeft size={18} /> BACK TO HOME
                    </Link>
                    <h1 className="sd-title">{service.title}</h1>
                    <p className="sd-subtitle">{service.heading}</p>
                </div>
            </section>

            <section className="sd-content-section section-lg">
                <div className="container">
                    <div className="sd-intro">
                        {service.intro.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    {service.sections.map((section) => (
                        <div key={section.heading} className="sd-block">
                            <h2 className="sd-section-title">{section.heading}</h2>
                            {section.body.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    ))}

                    <div className="sd-scope">
                        <h2 className="sd-section-title">What This Includes</h2>
                        <div className="sd-scope-grid">
                            {service.scope.map((item, index) => (
                                <div key={index} className="sd-scope-card">
                                    <CheckCircle2 className="sd-scope-icon text-accent" size={28} />
                                    <span className="sd-scope-text">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {relatedProject && (
                        <div className="sd-related">
                            <h2 className="sd-section-title">Where We Have Done This</h2>
                            <Link
                                to={`/projects/${relatedProject.slug}`}
                                className="sd-related-card"
                            >
                                <div>
                                    <p className="sd-related-label">Case study</p>
                                    <h3>{relatedProject.title}</h3>
                                    <p className="sd-related-meta">
                                        {clientLabel(relatedProject)} · {relatedProject.city},{' '}
                                        {relatedProject.region}
                                        {relatedProject.durationMonths
                                            ? ` · ${relatedProject.durationMonths} months`
                                            : ''}
                                    </p>
                                </div>
                                <ArrowRight size={22} aria-hidden="true" />
                            </Link>
                        </div>
                    )}

                    <div className="sd-faqs">
                        <h2 className="sd-section-title">Questions We Get Asked</h2>
                        {service.faqs.map((faq) => (
                            <details key={faq.question} className="sd-faq">
                                <summary>{faq.question}</summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sd-contact-section">
                <div className="container">
                    <div className="sd-contact-grid">
                        <div className="sd-contact-text">
                            <h2>
                                Planning a <span className="text-accent">{service.shortTitle}</span>{' '}
                                project?
                            </h2>
                            <p>
                                Tell us the plot and what you intend to manufacture. Industrial
                                projects from {company.engagement.minProjectValue} upward.
                            </p>
                            <a
                                href={getWhatsAppUrl(`Hello! I would like to discuss a ${service.shortTitle} project with Vishwakalpa.`)}
                                className="btn btn-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Or message us on WhatsApp
                            </a>
                        </div>
                        <div className="sd-contact-form-wrapper">
                            <form className="sd-form" onSubmit={onSubmit}>
                                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                                <input
                                    type="hidden"
                                    name="subject"
                                    value={`New Inquiry from Vishwakalpa Website - ${service.title}`}
                                />

                                <input type="text" name="name" placeholder="Your Name" required className="sd-input" />
                                <input type="email" name="email" placeholder="Your Email" required className="sd-input" />
                                <input type="tel" name="phone" placeholder="Phone Number" required className="sd-input" />
                                <textarea
                                    name="message"
                                    placeholder="Plot size, product and stage, if you know them."
                                    rows={4}
                                    required
                                    className="sd-input"
                                    style={{ resize: 'vertical' }}
                                ></textarea>

                                <button type="submit" className="sd-submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <FormPopup submitResult={submitResult} onClose={resetResult} />

            <Footer />
        </div>
    );
};

export default ServiceDetail;
