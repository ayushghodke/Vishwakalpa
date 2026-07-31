import { Link } from 'react-router';
import { Map, Building2, Cog, Zap, Cuboid, ClipboardList, Factory } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './Services.css';
import { servicesByOrder } from '../data/services';

// Icons live here rather than in services.ts so that the data module stays pure
// — it is imported by react-router.config.ts, which runs in Node and must not
// pull in React components.
const SERVICE_ICONS: Record<string, LucideIcon> = {
    'industrial-master-planning': Map,
    'architecture-design': Building2,
    'machine-layout-design': Cog,
    'structural-mep-design': Zap,
    'bim-3d-modeling': Cuboid,
    'industrial-pmc': ClipboardList,
};

const Services = () => {
    return (
        <section id="services" className="section-lg services-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">
                        What We <span className="text-accent">Do</span>
                    </h2>
                    <p className="text-gray mb-8">
                        Industrial facility design and delivery — from an empty plot to a
                        plant in production.
                    </p>
                </div>

                <div className="services-grid">
                    {servicesByOrder.map((service) => {
                        const Icon = SERVICE_ICONS[service.slug] ?? Factory;

                        return (
                            <Link
                                to={`/services/${service.slug}`}
                                key={service.slug}
                                className="service-card glass-card-gold block"
                            >
                                <div className="service-icon">
                                    <Icon size={64} className="text-accent" strokeWidth={1.5} />
                                </div>
                                <h3>{service.title}</h3>
                                <p className="service-description">{service.cardDescription}</p>
                                <span className="service-link-cue" aria-hidden="true">
                                    Read more →
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
