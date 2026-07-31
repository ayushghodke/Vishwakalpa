import { useState, type KeyboardEvent } from 'react';
import './Sectors.css';
import { sectors, type Sector } from '../data/sectors';

const SectorCard = ({
    sector,
    isOpen,
    onToggle
}: {
    sector: Sector;
    isOpen: boolean;
    onToggle: () => void;
}) => {
    const Icon = sector.icon;
    const hasImage = Boolean(sector.image);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <div
            className={`sector-card ${hasImage ? '' : 'sector-card--placeholder'} ${isOpen ? 'is-open' : ''}`}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label={`${sector.title} — sector details`}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
        >
            <div className="sector-media">
                {hasImage ? (
                    <img
                        src={sector.image!}
                        alt={sector.title}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="600"
                    />
                ) : (
                    <>
                        <span className="sector-number-ghost" aria-hidden="true">{sector.number}</span>
                        <div className="sector-placeholder-icon">
                            <Icon size={44} strokeWidth={1.5} />
                        </div>
                    </>
                )}
            </div>

            <div className="sector-overlay">
                <div className="sector-header">
                    <span className="sector-number">{sector.number}</span>
                    <h3>{sector.title}</h3>
                </div>

                <div className="sector-expanded">
                    <p className="sector-tagline">{sector.tagline}</p>
                    <ul className="sector-services">
                        {sector.services.map((service, i) => (
                            <li key={i}>{service}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Sectors = () => {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <section id="industries" className="section-lg">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">Industries We <span className="text-accent">Serve</span></h2>
                    <p className="text-gray mb-8">
                        Purpose-built industrial facilities engineered across 12 specialized sectors
                    </p>
                </div>

                <div className="sectors-grid">
                    {sectors.map((sector) => (
                        <SectorCard
                            key={sector.id}
                            sector={sector}
                            isOpen={openId === sector.id}
                            onToggle={() =>
                                setOpenId((prev) => (prev === sector.id ? null : sector.id))
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sectors;
