import './Services.css';
import contentData from '../assets/content.json';

const Services = () => {
    const services = contentData.services;

    const serviceIcons: Record<string, string> = {
        'architecture-design': '🏗️',
        'planning-master-planning': '📐',
        'project-management': '📊',
        'bim-3d-modeling': '🖥️',
        'structural-mep': '⚡'
    };

    return (
        <section id="services" className="section-lg services-section">
            <div className="services-bg">
                <img src="/images/services/service-card.jpg" alt="Services Background" />
                <div className="services-overlay"></div>
            </div>

            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">Our <span className="gold-gradient">Services</span></h2>
                    <p className="text-gray mb-8">
                        End-to-End Planning, Design & Project Management for All-Scale Developments.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card glass-card-gold">
                            <div className="service-icon">
                                {serviceIcons[service.id as keyof typeof serviceIcons]}
                            </div>
                            <h3>{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            {service.details && (
                                <p className="service-details">{service.details}</p>
                            )}
                            {service.subServices && (
                                <ul className="service-sub-list">
                                    {service.subServices.slice(0, 3).map((sub, index) => (
                                        <li key={index}>{sub}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
