import './Services.css';
import contentData from '../assets/content.json';
import { Building2, Map, ClipboardList, Cuboid, Zap } from 'lucide-react';

const Services = () => {
    const services = contentData.services;

    const serviceIcons: Record<string, React.ReactNode> = {
        'architecture-design': <Building2 size={64} className="text-accent" />,
        'planning-master-planning': <Map size={64} className="text-accent" />,
        'project-management': <ClipboardList size={64} className="text-accent" />,
        'bim-3d-modeling': <Cuboid size={64} className="text-accent" />,
        'structural-mep': <Zap size={64} className="text-accent" />
    };

    return (
        <section id="services" className="section-lg services-section">
            <div className="services-bg">
                <img src="/images/services/service-card.jpg" alt="Services Background" />
                <div className="services-overlay"></div>
            </div>

            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">Our <span className="accent-gradient-text">Services</span></h2>
                    <p className="text-gray mb-8">
                        End-to-End Planning, Design & Project Management for All-Scale Developments.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card glass-card-gold">
                            <div className="service-icon">
                                {serviceIcons[service.id]}
                            </div>
                            <h3>{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            {service.details && (
                                <p className="service-details">{service.details}</p>
                            )}
                            {(service as any).subServices && (
                                <ul className="service-sub-list">
                                    {(service as any).subServices.slice(0, 3).map((sub: string, index: number) => (
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
