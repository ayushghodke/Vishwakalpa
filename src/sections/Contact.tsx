import './Contact.css';
import contentData from '../assets/content.json';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    const { company } = contentData;

    return (
        <section id="contact" className="section-lg contact-section">

            <div className="container">
                {/* Contact Information */}
                <div className="contact-wrapper">
                    <div className="section-header text-center mb-12">
                        <h2 className="mb-4">
                            Let's <span className="text-primary">Connect</span>
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
                                <div className="contact-icon"><MapPin className="text-accent" size={24} /></div>
                                <div>
                                    <p className="contact-label">Address</p>
                                    <p className="contact-value">{company.contact.address}</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon"><Phone className="text-accent" size={24} /></div>
                                <div>
                                    <p className="contact-label">Phone</p>
                                    <a href={`tel:${company.contact.phone}`} className="contact-value">
                                        {company.contact.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon"><Mail className="text-accent" size={24} /></div>
                                <div>
                                    <p className="contact-label">Email</p>
                                    <a href={`mailto:${company.contact.email}`} className="contact-value">
                                        {company.contact.email}
                                    </a>
                                </div>
                            </div>


                        </div>

                        {/* CTA Card */}
                        <div className="cta-card glass-panel">
                            <h3>Ready to Build?</h3>
                            <p className="cta-description">
                                Let's transform your vision into a landmark that stands the test of time.
                            </p>
                            <form className="contact-section-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Name" required />
                                <input type="email" placeholder="Email" required />
                                <input type="tel" placeholder="Phone Number" required />
                                <textarea placeholder="Message" rows={4} required></textarea>
                                <button type="submit" className="btn btn-primary btn-lg w-full">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
