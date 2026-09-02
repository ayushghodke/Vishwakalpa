import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { MetaDescriptor } from 'react-router';
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    Calendar,
    User,
    Tag,
    CheckCircle2,
    AlertTriangle,
    Info,
    Layers,
    ListChecks,
    HelpCircle,
    Building2,
    ShieldAlert,
    ChevronDown,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormPopup from '../components/FormPopup';
import NotFound from './NotFound';
import { getBlog, getRelatedBlogs } from '../data/blogs';
import { getService } from '../data/services';
import { getProject } from '../data/projects';
import { getWhatsAppUrl } from '../data/company';
import { WEB3FORMS_ACCESS_KEY } from '../constants/config';
import { useWeb3Form } from '../hooks/useWeb3Form';
import { buildMeta } from '../utils/seo';
import { blogPostingSchema, faqSchema, breadcrumbSchema } from '../utils/schema';
import './BlogDetail.css';

export function meta({ params }: { params: { slug?: string } }): MetaDescriptor[] {
    const blog = params.slug ? getBlog(params.slug) : undefined;

    if (!blog) {
        return buildMeta({
            title: 'Vishwakalpa | Guide Not Found',
            description: 'This technical guide could not be found.',
            path: `/blogs/${params.slug ?? ''}`,
            noindex: true,
        });
    }

    return buildMeta({
        title: blog.seoTitle,
        description: blog.seoDescription,
        path: `/blogs/${blog.slug}`,
        image: blog.image,
        type: 'article',
    });
}

const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const blog = slug ? getBlog(slug) : undefined;
    const { onSubmit, isSubmitting, submitResult, resetResult } = useWeb3Form();
    const [activeSection, setActiveSection] = useState<string>('');

    if (!blog) {
        return <NotFound />;
    }

    const relatedBlogs = getRelatedBlogs(blog.slug);
    const relatedServices = blog.relatedServices
        .map((s) => getService(s))
        .filter((s): s is NonNullable<typeof s> => Boolean(s));
    const relatedProjects = blog.relatedProjects
        .map((p) => getProject(p))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));

    // ScrollSpy for Table of Contents
    useEffect(() => {
        const handleScroll = () => {
            const sections = blog.tableOfContents.map((item) => document.getElementById(item.id));
            const scrollPos = window.scrollY + 180;

            for (let i = sections.length - 1; i >= 0; i--) {
                const sec = sections[i];
                if (sec && sec.offsetTop <= scrollPos) {
                    setActiveSection(blog.tableOfContents[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [blog]);

    return (
        <div className="blog-detail-page">
            <Navbar />

            {/* Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        blogPostingSchema(blog),
                        faqSchema(blog.faqs),
                        breadcrumbSchema([
                            { name: 'Home', path: '/' },
                            { name: 'Insights', path: '/blogs' },
                            { name: blog.shortTitle, path: `/blogs/${blog.slug}` },
                        ]),
                    ]),
                }}
            />

            {/* Hero Header */}
            <header className="bd-hero">
                <div className="bd-hero-glow"></div>
                <div className="container bd-hero-container">
                    <div className="bd-nav-row">
                        <Link to="/blogs" className="bd-back-link">
                            <ArrowLeft size={16} aria-hidden="true" /> BACK TO ALL GUIDES
                        </Link>
                        <span className="bd-category-badge">{blog.category}</span>
                    </div>

                    <h1 className="bd-title">{blog.title}</h1>

                    <div className="bd-meta-bar">
                        <div className="bd-meta-item">
                            <User size={15} className="text-accent" aria-hidden="true" />
                            <span>{blog.author.name}</span>
                        </div>
                        <div className="bd-meta-item">
                            <Calendar size={15} className="text-accent" aria-hidden="true" />
                            <span>{blog.publishedDate}</span>
                        </div>
                        <div className="bd-meta-item">
                            <Clock size={15} className="text-accent" aria-hidden="true" />
                            <span>{blog.readTime}</span>
                        </div>
                        <div className="bd-meta-keyword">
                            <Tag size={13} aria-hidden="true" />
                            <span>{blog.primaryKeyword}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Banner Image */}
            <div className="container bd-banner-container">
                <figure className="bd-media-figure">
                    <img
                        src={blog.image}
                        alt={blog.imageAlt}
                        width="1400"
                        height="800"
                        fetchPriority="high"
                        decoding="async"
                        className="bd-banner-img"
                    />
                    {blog.imageCaption && (
                        <figcaption className="bd-media-caption">
                            {blog.imageCaption}
                        </figcaption>
                    )}
                </figure>
            </div>

            {/* Main Article Body with Sticky Table of Contents */}
            <div className="container bd-main-layout">
                {/* Sticky Table of Contents Sidebar */}
                <aside className="bd-sidebar">
                    <div className="bd-toc-card glass-card-gold">
                        <h2 className="bd-toc-heading">
                            <Layers size={18} className="text-accent" aria-hidden="true" /> Table of Contents
                        </h2>
                        <nav className="bd-toc-nav" aria-label="Table of contents">
                            <ul>
                                {blog.tableOfContents.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            className={`bd-toc-link ${activeSection === item.id ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Quick Consultation Widget */}
                    <div className="bd-quick-cta">
                        <h3>Need Expert Plant Planning?</h3>
                        <p>
                            Speak with Vishwakalpa's industrial engineering team for layout design, master planning,
                            and PMC.
                        </p>
                        <a
                            href={getWhatsAppUrl(`Hello! I am reading "${blog.shortTitle}" and would like to discuss a project.`)}
                            className="btn btn-primary btn-block"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </aside>

                {/* Article Content Stream */}
                <main className="bd-article-body">
                    {/* Key Takeaways Box */}
                    <div className="bd-takeaways-card">
                        <div className="bd-takeaways-header">
                            <ListChecks size={20} className="text-accent" aria-hidden="true" />
                            <h3>Executive Key Takeaways</h3>
                        </div>
                        <ul className="bd-takeaways-list">
                            {blog.keyTakeaways.map((item, idx) => (
                                <li key={idx}>
                                    <CheckCircle2 size={18} className="text-accent flex-shrink-0" aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Summary Intro Paragraphs */}
                    <div className="bd-intro-prose">
                        {blog.summary.map((paragraph, i) => (
                            <p key={i} className="bd-lead-p">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Numbered Sections */}
                    {blog.sections.map((section) => (
                        <section key={section.id} id={section.id} className="bd-section">
                            <header className="bd-section-header">
                                {section.number && <span className="bd-sec-num">{section.number}</span>}
                                <div>
                                    <h2 className="bd-sec-heading">{section.heading}</h2>
                                    {section.subheading && <p className="bd-sec-subheading">{section.subheading}</p>}
                                </div>
                            </header>

                            {section.paragraphs.map((p, pIdx) => (
                                <p key={pIdx}>{p}</p>
                            ))}

                            {/* Section Bullet List */}
                            {section.listItems && section.listItems.length > 0 && (
                                <ul className="bd-bullet-list">
                                    {section.listItems.map((li, liIdx) => (
                                        <li key={liIdx}>
                                            <span className="bd-bullet-dot"></span>
                                            <span>{li}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Callout Alert Box */}
                            {section.callout && (
                                <div className={`bd-callout bd-callout--${section.callout.type ?? 'info'}`}>
                                    <div className="bd-callout-icon">
                                        {section.callout.type === 'warning' ? (
                                            <AlertTriangle size={22} />
                                        ) : (
                                            <Info size={22} />
                                        )}
                                    </div>
                                    <div className="bd-callout-content">
                                        <h4>{section.callout.title}</h4>
                                        <p>{section.callout.text}</p>
                                    </div>
                                </div>
                            )}

                            {/* Responsive Glassmorphic Data Table */}
                            {section.table && (
                                <div className="bd-table-wrapper">
                                    <table className="bd-table">
                                        <thead>
                                            <tr>
                                                {section.table.headers.map((th, thIdx) => (
                                                    <th key={thIdx}>{th}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.table.rows.map((row, rIdx) => (
                                                <tr key={rIdx}>
                                                    {row.map((cell, cIdx) => (
                                                        <td key={cIdx}>
                                                            {cIdx === 0 ? <strong>{cell}</strong> : cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Process Steps Diagram */}
                            {section.processSteps && section.processSteps.length > 0 && (
                                <div className="bd-process-flow">
                                    {section.processSteps.map((step) => (
                                        <div key={step.step} className="bd-process-step">
                                            <div className="bd-step-indicator">
                                                <span className="bd-step-circle">{step.step}</span>
                                                <div className="bd-step-line"></div>
                                            </div>
                                            <div className="bd-step-card glass-card-gold">
                                                <h4>{step.title}</h4>
                                                {step.description && <p>{step.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}

                    {/* Conceptual Facility Flow (if present) */}
                    {blog.facilityFlow && (
                        <section id="conceptual-facility-zones" className="bd-section bd-facility-zones">
                            <div className="bd-section-header">
                                <Building2 size={24} className="text-accent" aria-hidden="true" />
                                <h2 className="bd-sec-heading">A Typical Precision Machining Facility Organization</h2>
                            </div>
                            <p>
                                A well-orchestrated manufacturing plant integrates receiving, production, metrology,
                                utilities, and dispatch into a continuous, unidirectional sequence:
                            </p>

                            <div className="bd-zones-grid">
                                {blog.facilityFlow.map((zone) => (
                                    <div key={zone.step} className="bd-zone-card">
                                        <span className="bd-zone-step">{zone.step}</span>
                                        <span className="bd-zone-title">{zone.title}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Architect Information Checklist (if present) */}
                    {blog.checklists && blog.checklists.length > 0 && (
                        <section id="architect-checklist" className="bd-section bd-checklists-section">
                            <div className="bd-section-header">
                                <ListChecks size={24} className="text-accent" aria-hidden="true" />
                                <h2 className="bd-sec-heading">Information Required Before Designing a Machining Facility</h2>
                            </div>
                            <p>
                                To eliminate assumptions and avoid costly redesigns, the engineering and architectural
                                team should obtain the following data prior to final masterplan layout freezing:
                            </p>

                            <div className="bd-checklists-grid">
                                {blog.checklists.map((chk) => (
                                    <div key={chk.category} className="bd-checklist-card glass-card-gold">
                                        <h3>{chk.category}</h3>
                                        <ul>
                                            {chk.items.map((item, iIdx) => (
                                                <li key={iIdx}>
                                                    <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Common Mistakes to Avoid */}
                    {blog.commonMistakes && blog.commonMistakes.length > 0 && (
                        <section id="common-mistakes" className="bd-section bd-mistakes-section">
                            <div className="bd-section-header">
                                <ShieldAlert size={24} className="text-accent" aria-hidden="true" />
                                <h2 className="bd-sec-heading">Critical Mistakes to Avoid in Facility Planning</h2>
                            </div>
                            <div className="bd-mistakes-grid">
                                {blog.commonMistakes.map((mistake, mIdx) => (
                                    <div key={mIdx} className="bd-mistake-card">
                                        <h4>{mistake.title}</h4>
                                        <p>{mistake.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* The Bottom Line / Conclusion */}
                    {blog.bottomLine && (
                        <section className="bd-section bd-bottom-line-card">
                            <h2>{blog.bottomLine.headline}</h2>
                            {blog.bottomLine.paragraphs.map((p, bIdx) => (
                                <p key={bIdx}>{p}</p>
                            ))}

                            {blog.bottomLine.flowSequence && (
                                <div className="bd-sequence-pills">
                                    {blog.bottomLine.flowSequence.map((item, sIdx) => (
                                        <span key={item} className="bd-seq-pill">
                                            {item}
                                            {sIdx < blog.bottomLine.flowSequence!.length - 1 && (
                                                <span className="bd-seq-arrow">→</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* FAQs Accordion */}
                    {blog.faqs && blog.faqs.length > 0 && (
                        <section id="faqs" className="bd-section bd-faqs-section">
                            <div className="bd-section-header">
                                <HelpCircle size={24} className="text-accent" aria-hidden="true" />
                                <h2 className="bd-sec-heading">Frequently Asked Questions</h2>
                            </div>
                            <div className="bd-faqs-list">
                                {blog.faqs.map((faq, fIdx) => (
                                    <details key={fIdx} className="bd-faq-item" open={fIdx === 0}>
                                        <summary className="bd-faq-summary">
                                            <span>{faq.question}</span>
                                            <ChevronDown size={18} className="bd-faq-arrow" aria-hidden="true" />
                                        </summary>
                                        <div className="bd-faq-body">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SEO Keyword Cloud Tag Matrix */}
                    <div className="bd-keywords-box">
                        <div className="bd-kw-header">
                            <Tag size={16} className="text-accent" aria-hidden="true" />
                            <span>Target Topics &amp; Engineering Disciplines</span>
                        </div>
                        <div className="bd-kw-tags">
                            <span className="bd-kw-primary">Primary: {blog.primaryKeyword}</span>
                            {blog.secondaryKeywords.map((kw) => (
                                <span key={kw} className="bd-kw-secondary">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Author Bio Card */}
                    <div className="bd-author-card glass-card-gold">
                        <div className="bd-author-avatar">
                            <img
                                src="/images/Logo.webp"
                                alt="Vishwakalpa Design Planning and Management"
                                width="80"
                                height="80"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="bd-author-info">
                            <p className="bd-author-label">Published By</p>
                            <h3>{blog.author.name}</h3>
                            <p className="bd-author-role">{blog.author.role}</p>
                            <p className="bd-author-bio">{blog.author.bio}</p>
                        </div>
                    </div>

                    {/* Related Services & Case Studies */}
                    {(relatedServices.length > 0 || relatedProjects.length > 0) && (
                        <div className="bd-related-block">
                            <h2 className="bd-related-title">Related Services &amp; Case Studies</h2>
                            <div className="bd-related-cards">
                                {relatedServices.map((svc) => (
                                    <Link key={svc.slug} to={`/services/${svc.slug}`} className="bd-rel-card">
                                        <div>
                                            <span className="bd-rel-type">Service</span>
                                            <h4>{svc.title}</h4>
                                            <p>{svc.heading}</p>
                                        </div>
                                        <ArrowRight size={20} className="text-accent" aria-hidden="true" />
                                    </Link>
                                ))}
                                {relatedProjects.map((prj) => (
                                    <Link key={prj.slug} to={`/projects/${prj.slug}`} className="bd-rel-card">
                                        <div>
                                            <span className="bd-rel-type">Case Study</span>
                                            <h4>{prj.title}</h4>
                                            <p>{prj.city}, {prj.region} — {prj.industry}</p>
                                        </div>
                                        <ArrowRight size={20} className="text-accent" aria-hidden="true" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Blogs in Library */}
                    {relatedBlogs.length > 0 && (
                        <div className="bd-related-blogs">
                            <h2 className="bd-related-title">Explore More Technical Guides</h2>
                            <div className="bd-rel-blog-grid">
                                {relatedBlogs.map((relBlog) => (
                                    <Link key={relBlog.slug} to={`/blogs/${relBlog.slug}`} className="bd-rel-blog-card">
                                        <div className="bd-rel-blog-img">
                                            <img
                                                src={relBlog.image}
                                                alt={relBlog.imageAlt}
                                                width="400"
                                                height="250"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="bd-rel-blog-body">
                                            <span className="bd-rel-blog-cat">{relBlog.category}</span>
                                            <h4>{relBlog.shortTitle}</h4>
                                            <span className="bd-rel-blog-time">
                                                <Clock size={13} /> {relBlog.readTime}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Bottom Contact Section */}
            <section className="bd-contact-section">
                <div className="container">
                    <div className="bd-contact-grid">
                        <div className="bd-contact-text">
                            <h2>
                                Planning a Precision Machining Facility or Machine Shop?
                            </h2>
                            <p>
                                Connect with Vishwakalpa's industrial facility design specialists. We evaluate your
                                product routing, machinery schedule, and spatial footprint to engineer a world-class
                                manufacturing facility.
                            </p>
                            <a
                                href={getWhatsAppUrl(`Hello! I would like to discuss industrial facility planning for a machining unit.`)}
                                className="btn btn-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Message on WhatsApp
                            </a>
                        </div>
                        <div className="bd-contact-form-wrapper">
                            <form className="bd-form" onSubmit={onSubmit}>
                                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                                <input
                                    type="hidden"
                                    name="subject"
                                    value={`New Inquiry from Blog - ${blog.title}`}
                                />

                                <input type="text" name="name" placeholder="Your Name" required className="bd-input" />
                                <input type="email" name="email" placeholder="Your Email" required className="bd-input" />
                                <input type="tel" name="phone" placeholder="Phone Number" required className="bd-input" />
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your machine count, product, and plot size."
                                    rows={4}
                                    required
                                    className="bd-input"
                                    style={{ resize: 'vertical' }}
                                ></textarea>

                                <button type="submit" className="bd-submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Request Facility Planning Consultation'}
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

export default BlogDetail;
