import { clients } from '../data/clients';
import './Clients.css';

// ============================================
// CLIENTS CAROUSEL
//
// Smooth, hardware-accelerated horizontal marquee featuring
// the 12 industrial enterprises and manufacturing leaders
// Vishwakalpa has partnered with.
//
// Uses dual tracks with CSS transform translation for an
// uninterrupted, zero-gap infinite scroll loop that pauses on hover.
// ============================================

const Clients = () => {
    // Duplicate array within each track to ensure full coverage on ultrawide monitors
    const trackClients = [...clients, ...clients];

    return (
        <section id="clients" className="clients-section" aria-label="Trusted Clients">
            <div className="container">
                <div className="clients-header text-center">
                    <span className="clients-eyebrow">Trusted by Industry Leaders</span>
                    <h2 className="clients-title">
                        Engineering Facilities for India&apos;s Foremost Enterprises
                    </h2>
                    <p className="clients-subtitle">
                        From high-chrome foundries and precision machining plants to large-scale recycling and vaccine campuses.
                    </p>
                </div>
            </div>

            <div className="clients-carousel-wrapper">
                <div className="clients-marquee" tabIndex={0} aria-label="Client logos carousel, pauses on focus or hover">
                    {/* Track 1 */}
                    <div className="clients-track">
                        {trackClients.map((client, index) => (
                            <div
                                key={`track1-${client.shortName}-${index}`}
                                className="client-card"
                                title={`${client.name} — ${client.industry}`}
                            >
                                <img
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    className="client-logo"
                                    loading="lazy"
                                    decoding="async"
                                    width="160"
                                    height="48"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Track 2 (Cloned for seamless infinite loop) */}
                    <div className="clients-track" aria-hidden="true">
                        {trackClients.map((client, index) => (
                            <div
                                key={`track2-${client.shortName}-${index}`}
                                className="client-card"
                                title={`${client.name} — ${client.industry}`}
                            >
                                <img
                                    src={client.logo}
                                    alt=""
                                    className="client-logo"
                                    loading="lazy"
                                    decoding="async"
                                    width="160"
                                    height="48"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
