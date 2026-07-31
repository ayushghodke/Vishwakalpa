import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import './Contact.css';
import { useWeb3Form } from '../hooks/useWeb3Form';
import FormPopup from '../components/FormPopup';
import { WEB3FORMS_ACCESS_KEY } from '../constants/config';
import {
    company,
    formattedAddress,
    mailtoUrl,
    telUrl,
    whatsappUrl,
} from '../data/company';

const Contact = () => {
    const { onSubmit, isSubmitting, submitResult, resetResult } = useWeb3Form();

    return (
        <section id="contact" className="section-lg contact-section">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="section-header text-center mb-12">
                        <h2 className="mb-4">
                            Discuss Your <span className="text-primary">Project</span>
                        </h2>
                        <p className="text-gray mb-8">
                            Tell us the plot and what you intend to manufacture, and you will
                            get a specific answer rather than a brochure.
                        </p>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-info-card glass-card-gold">
                            <h3>Get in Touch</h3>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <MapPin className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="contact-label">Address</p>
                                    <p className="contact-value">{formattedAddress}</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Phone className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="contact-label">Phone</p>
                                    <a href={telUrl} className="contact-value">
                                        {company.phoneDisplay}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Mail className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="contact-label">Email</p>
                                    <a href={mailtoUrl} className="contact-value">
                                        {company.email}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Clock className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="contact-label">Office Hours</p>
                                    <p className="contact-value">{company.openingHours.display}</p>
                                </div>
                            </div>

                            {/* WhatsApp is one of the two conversion paths the owner
                                asked for (answer G1), alongside the form. */}
                            <a
                                href={whatsappUrl}
                                className="btn btn-primary whatsapp-cta"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle size={20} />
                                Message us on WhatsApp
                            </a>
                        </div>

                        <div className="cta-card glass-panel">
                            <h3>Send an Enquiry</h3>
                            <form className="contact-section-form" onSubmit={onSubmit}>
                                {/* Key comes from constants/config.ts rather than being
                                    re-hardcoded here, as it was before. */}
                                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                                <input
                                    type="hidden"
                                    name="subject"
                                    value="New Inquiry from Vishwakalpa Website - Contact Flow"
                                />

                                <input type="text" name="name" placeholder="Name" required />
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="tel" name="phone" placeholder="Phone Number" required />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Project location (city / MIDC)"
                                />
                                <textarea
                                    name="message"
                                    placeholder="What are you building? Plot size, product and stage if you know them."
                                    rows={4}
                                    required
                                ></textarea>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <FormPopup submitResult={submitResult} onClose={resetResult} />
        </section>
    );
};

export default Contact;
