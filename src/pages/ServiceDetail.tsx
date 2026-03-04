import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { serviceDetails } from '../data/serviceDetails';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import './ServiceDetail.css';

const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>();
    const service = id ? serviceDetails[id] : null;

    if (!service) {
        return (
            <div className="service-detail-page bg-primary-dark min-h-screen text-white flex flex-col items-center justify-center">
                <h2>Service Not Found</h2>
                <Link to="/" className="btn btn-primary mt-4">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="service-detail-page">
            <Navbar />

            {/* Premium Hero Section */}
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

            {/* Editorial Content Section */}
            <section className="sd-content-section section-lg">
                <div className="container">
                    <div className="sd-content-grid">
                        <div className="sd-description">
                            <h2 className="sd-section-title">Overview</h2>
                            <p>{service.description}</p>
                        </div>

                        <div className="sd-scope">
                            <h2 className="sd-section-title">Scope Includes</h2>
                            <div className="sd-scope-grid">
                                {service.scope.map((item, index) => (
                                    <div key={index} className="sd-scope-card">
                                        <CheckCircle2 className="sd-scope-icon text-accent" size={28} />
                                        <span className="sd-scope-text">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Contact     Section */}
            <section className="sd-contact-section">
                <div className="container">
                    <div className="sd-contact-grid">
                        <div className="sd-contact-text">
                            <h2>Ready to Discuss Your <span className="text-accent">{service.title}</span> Project?</h2>
                            <p>Kindly Fill out the form below and our experts will reach out to you shortly to map out your requirements.</p>
                        </div>
                        <div className="sd-contact-form-wrapper">
                            <form className="sd-form" action="https://api.web3forms.com/submit" method="POST">
                                <input type="hidden" name="access_key" value="87403c7e-d81c-4e3e-8e68-4b68f6232ab6" />
                                <input type="hidden" name="subject" value={`New Inquiry from Vishwakalpa Website - ${service.title}`} />
                                <input type="hidden" name="redirect" value={window.location.href} />

                                <input type="text" name="name" placeholder="Your Name" required className="sd-input" />
                                <input type="email" name="email" placeholder="Your Email" required className="sd-input" />
                                <input type="tel" name="phone" placeholder="Phone Number" required className="sd-input" />
                                <textarea name="message" placeholder="Message" rows={4} required className="sd-input" style={{ resize: 'vertical' }}></textarea>

                                <button type="submit" className="sd-submit-btn">
                                    Send Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServiceDetail;
