import { Link } from 'react-router';
import { ArrowRight, Clock, BookOpen, Tag } from 'lucide-react';
import { getAllBlogs } from '../data/blogs';
import './BlogsSection.css';

const BlogsSection = () => {
    const blogs = getAllBlogs();

    return (
        <section id="insights" className="section-lg blogs-section">
            <div className="container">
                <div className="section-header text-center">
                    <div className="blogs-badge">
                        <BookOpen size={16} aria-hidden="true" />
                        <span>KNOWLEDGE BASE &amp; ENGINEERING GUIDES</span>
                    </div>
                    <h2 className="mb-4">
                        Technical <span className="text-accent">Insights &amp; Factory Guides</span>
                    </h2>
                    <p className="text-gray mb-8">
                        Process-driven frameworks, machine layout strategies, and spatial calculations from our
                        industrial engineering practice.
                    </p>
                </div>

                <div className="blogs-grid">
                    {blogs.map((blog) => (
                        <article key={blog.slug} className="blog-card glass-card-gold">
                            <Link to={`/blogs/${blog.slug}`} className="blog-card-media-link" tabIndex={-1}>
                                <div className="blog-card-media">
                                    <img
                                        src={blog.image}
                                        alt={blog.imageAlt}
                                        width="600"
                                        height="400"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="blog-card-category">{blog.category}</span>
                                </div>
                            </Link>

                            <div className="blog-card-body">
                                <div className="blog-card-meta">
                                    <span className="blog-read-time">
                                        <Clock size={14} aria-hidden="true" /> {blog.readTime}
                                    </span>
                                    <div className="blog-kw-tag">
                                        <Tag size={12} aria-hidden="true" />
                                        <span>{blog.primaryKeyword}</span>
                                    </div>
                                </div>

                                <h3 className="blog-card-title">
                                    <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                                </h3>

                                <p className="blog-card-summary">{blog.summary[0]}</p>

                                <div className="blog-card-footer">
                                    <Link to={`/blogs/${blog.slug}`} className="blog-card-btn">
                                        Read Guide <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="blogs-view-all text-center mt-12">
                    <Link to="/blogs" className="btn btn-secondary btn-lg">
                        View All Technical Guides <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogsSection;
