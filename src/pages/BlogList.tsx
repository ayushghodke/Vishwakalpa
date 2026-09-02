import { useState } from 'react';
import { Link } from 'react-router';
import type { MetaDescriptor } from 'react-router';
import { ArrowRight, BookOpen, Clock, Calendar, Search, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllBlogs } from '../data/blogs';
import { getWhatsAppUrl } from '../data/company';
import { buildMeta } from '../utils/seo';
import { blogListSchema, breadcrumbSchema } from '../utils/schema';
import './BlogList.css';

export function meta(): MetaDescriptor[] {
    return buildMeta({
        title: 'Insights & Technical Guides | Vishwakalpa Factory Design',
        description:
            'In-depth industrial engineering guides, CNC plant layout strategies, and space calculation methodologies for manufacturing facilities across India.',
        path: '/blogs',
    });
}

const BlogList = () => {
    const allBlogs = getAllBlogs();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(allBlogs.map((b) => b.category)))];

    const filteredBlogs = allBlogs.filter((blog) => {
        const matchesCat = selectedCategory === 'All' || blog.category === selectedCategory;
        const matchesSearch =
            !searchQuery ||
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.summary.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
            blog.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.secondaryKeywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesSearch;
    });

    const featuredBlog = allBlogs[0];

    return (
        <div className="blog-list-page">
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        blogListSchema(allBlogs),
                        breadcrumbSchema([
                            { name: 'Home', path: '/' },
                            { name: 'Insights & Technical Guides', path: '/blogs' },
                        ]),
                    ]),
                }}
            />

            {/* Hero Section */}
            <section className="bl-hero">
                <div className="bl-hero-glow"></div>
                <div className="container bl-hero-container">
                    <div className="bl-badge">
                        <BookOpen size={16} aria-hidden="true" />
                        <span>KNOWLEDGE BASE &amp; ENGINEERING GUIDES</span>
                    </div>
                    <h1 className="bl-title">
                        Industrial Facility <span className="text-accent">Insights</span> &amp; Layout Guides
                    </h1>
                    <p className="bl-subtitle">
                        Rigorous, process-driven frameworks for factory layout planning, CNC machine shop architecture,
                        spatial sizing calculations, and statutory NBC compliance.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bl-controls">
                        <div className="bl-search-wrapper">
                            <Search size={18} className="bl-search-icon" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search guides by keyword, topic, or machine..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bl-search-input"
                                aria-label="Search articles"
                            />
                        </div>

                        <div className="bl-categories">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`bl-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="section-lg bl-content-section">
                <div className="container">
                    {/* Featured Article Banner (when not filtered) */}
                    {selectedCategory === 'All' && !searchQuery && featuredBlog && (
                        <div className="bl-featured mb-12">
                            <div className="bl-featured-card glass-card-gold">
                                <div className="bl-featured-media">
                                    <img
                                        src={featuredBlog.image}
                                        alt={featuredBlog.imageAlt}
                                        width="700"
                                        height="450"
                                        loading="eager"
                                        decoding="async"
                                    />
                                    <span className="bl-featured-badge">Featured Guide</span>
                                </div>
                                <div className="bl-featured-body">
                                    <div className="bl-meta-row">
                                        <span className="bl-category-tag">{featuredBlog.category}</span>
                                        <span className="bl-meta-item">
                                            <Clock size={14} aria-hidden="true" /> {featuredBlog.readTime}
                                        </span>
                                        <span className="bl-meta-item">
                                            <Calendar size={14} aria-hidden="true" /> {featuredBlog.publishedDate}
                                        </span>
                                    </div>

                                    <h2>
                                        <Link to={`/blogs/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                                    </h2>

                                    <p className="bl-excerpt">{featuredBlog.summary[0]}</p>

                                    <div className="bl-keywords-preview">
                                        <Tag size={14} aria-hidden="true" />
                                        <span>{featuredBlog.primaryKeyword}</span>
                                        {featuredBlog.secondaryKeywords.slice(0, 2).map((kw) => (
                                            <span key={kw} className="bl-subtag">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>

                                    <Link to={`/blogs/${featuredBlog.slug}`} className="btn btn-primary bl-read-btn">
                                        Read Complete Guide <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Grid */}
                    <div className="bl-grid-header mb-8">
                        <h2>
                            All Technical Guides{' '}
                            <span className="bl-count">({filteredBlogs.length})</span>
                        </h2>
                    </div>

                    {filteredBlogs.length === 0 ? (
                        <div className="bl-no-results glass-card-gold text-center">
                            <h3>No guides found matching your search.</h3>
                            <p>Try searching for "CNC", "Layout", "Space", "Precision", or reset filters.</p>
                            <button
                                className="btn btn-secondary mt-4"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="bl-grid">
                            {filteredBlogs.map((blog) => (
                                <article key={blog.slug} className="bl-card glass-card-gold">
                                    <Link to={`/blogs/${blog.slug}`} className="bl-card-media-link" tabIndex={-1}>
                                        <div className="bl-card-media">
                                            <img
                                                src={blog.image}
                                                alt={blog.imageAlt}
                                                width="600"
                                                height="400"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <span className="bl-card-category">{blog.category}</span>
                                        </div>
                                    </Link>

                                    <div className="bl-card-body">
                                        <div className="bl-meta-row">
                                            <span className="bl-meta-item">
                                                <Clock size={14} aria-hidden="true" /> {blog.readTime}
                                            </span>
                                            <span className="bl-meta-item">
                                                <Calendar size={14} aria-hidden="true" /> {blog.publishedDate}
                                            </span>
                                        </div>

                                        <h3 className="bl-card-title">
                                            <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                                        </h3>

                                        <p className="bl-card-excerpt">{blog.summary[0]}</p>

                                        <div className="bl-card-footer">
                                            <div className="bl-keyword-pill">
                                                <Tag size={12} aria-hidden="true" />
                                                <span>{blog.primaryKeyword}</span>
                                            </div>

                                            <Link to={`/blogs/${blog.slug}`} className="bl-card-link">
                                                Read Article <ArrowRight size={16} aria-hidden="true" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Bottom CTA Block */}
                    <div className="bl-cta-card mt-12 text-center">
                        <h2>Planning a Precision Machining Facility or Factory Expansion?</h2>
                        <p>
                            Get in touch with Vishwakalpa's industrial planning team. We translate your manufacturing
                            process into an optimized masterplan, precision layout, and turnkey project delivery.
                        </p>
                        <div className="bl-cta-actions">
                            <Link to="/#contact" className="btn btn-primary btn-lg">
                                Request Facility Consultation
                            </Link>
                            <a
                                href={getWhatsAppUrl('Hello! I would like to consult Vishwakalpa for industrial plant planning.')}
                                className="btn btn-secondary btn-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogList;
