import './Contact.css';
import contentData from '../assets/content.json';

const Contact = () => {
    const { company, globalPresence } = contentData;

    return (
        <section id="contact" className="section-lg contact-section">
            <div className="container">
                {/* Global Presence */}
                <div className="global-presence-wrapper">
                    <div className="section-header text-center mb-16">
                        <h2 className="mb-4">
                            Our <span className="gold-gradient">Global Presence</span>
                        </h2>
                        <p className="text-gray">{globalPresence.description}</p>
                    </div>

                    <div className="regions-grid">
                        {globalPresence.regions.map((region, index) => (
                            <div key={index} className="region-card glass-card">
                                <div className="region-icon">🌍</div>
                                <p className="region-name">{region}</p>
                            </div>
                        ))}
                    </div>

                    <div className="presence-highlights">
                        {globalPresence.highlights.slice(0, 3).map((highlight, index) => (
                            <div key={index} className="highlight-item">
                                <span className="highlight-bullet">•</span>
                                <p>{highlight}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="contact-wrapper">
                    <div className="section-header text-center mb-12">
                        <h2 className="mb-4">
                            Let's <span className="gold-gradient">Connect</span>
                        </h2>
                        <p className="text-gray mb-8">
                            Ready to build something extraordinary together?
                        </p>
                    </div>

                    <div className="contact-grid">
                        {/* Contact Card */}
                        <div className="contact-info-card glass-card-gold">
                            <h3>Get in Touch</h3>

                            <div className="contact-item">
                                <div className="contact-icon">📞</div>
                                <div>
                                    <p className="contact-label">Phone</p>
                                    <a href={`tel:${company.contact.phone}`} className="contact-value">
                                        {company.contact.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">📧</div>
                                <div>
                                    <p className="contact-label">Email</p>
                                    <a href="mailto:info@vishwakalpa.com" className="contact-value">
                                        info@vishwakalpa.com
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">🌐</div>
                                <div>
                                    <p className="contact-label">Social Media</p>
                                    <p className="contact-value">{company.contact.socialMedia}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="cta-card glass-panel">
                            <h3>Ready to Build?</h3>
                            <p className="cta-description">
                                Let's transform your vision into a landmark that stands the test of time.
                            </p>
                            <button className="btn btn-primary btn-lg">
                                Start Your Project
                            </button>
                            <div className="cta-taglines">
                                <p className="text-sm text-gray">
                                    From Vision to Delivery • Technology-led Practice
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
