import { useState } from 'react';
import './Contact.css';
import contentData from '../assets/content.json';
import { MapPin, Phone, Mail, CheckCircle2, X } from 'lucide-react';

const Contact = () => {
    const { company } = contentData;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<'idle' | 'success' | 'error'>('idle');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setSubmitResult('success');
                event.currentTarget.reset();
            } else {
                setSubmitResult('error');
            }
        } catch (error) {
            setSubmitResult('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <form className="contact-section-form" onSubmit={onSubmit}>
                                <input type="hidden" name="access_key" value="87403c7e-d81c-4e3e-8e68-4b68f6232ab6" />
                                <input type="hidden" name="subject" value="New Inquiry from Vishwakalpa Website - Contact Flow" />

                                <input type="text" name="name" placeholder="Name" required />
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="tel" name="phone" placeholder="Phone Number" required />
                                <textarea name="message" placeholder="Message" rows={4} required></textarea>

                                <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thank You Popup */}
            {submitResult !== 'idle' && (
                <div className="form-popup-overlay" onClick={() => setSubmitResult('idle')}>
                    <div className="form-popup-card glass-panel animate-fade-in" onClick={e => e.stopPropagation()}>
                        <button className="form-popup-close" onClick={() => setSubmitResult('idle')} aria-label="Close popup">
                            <X size={24} />
                        </button>
                        {submitResult === 'success' ? (
                            <div className="form-popup-content">
                                <CheckCircle2 className="text-accent form-popup-icon mb-4" size={64} />
                                <h3>Thank You!</h3>
                                <p>Your message has been sent. Our experts will reach out to you shortly.</p>
                            </div>
                        ) : (
                            <div className="form-popup-content">
                                <h3>Oops!</h3>
                                <p>Something went wrong. Please try again later.</p>
                            </div>
                        )}
                        <button className="btn btn-primary form-popup-btn w-full mt-6" onClick={() => setSubmitResult('idle')}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;
