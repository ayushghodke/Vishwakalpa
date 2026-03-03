import './About.css';
import contentData from '../assets/content.json';
import { MapPin } from 'lucide-react';

const About = () => {
    const { company, globalPresence } = contentData;

    return (
        <section id="about" className="section-lg about-section">

            <div className="container">
                {/* Section Header */}
                <div className="section-header text-center">
                    <h2 className="mb-4">
                        What We <span className="text-primary">Stand For</span>
                    </h2>

                </div>

                {/* Mission Statement */}
                <div className="mission-statement glass-card-gold">
                    <h3 className="mission-title">Our Mission</h3>
                    <p className="mission-text">{company.mission}</p>
                </div>



                {/* Statistics or Highlights */}
                <div className="highlights-grid">
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">10,00,000+ Sq.ft</div>
                        <p className="highlight-label">Built-up Area Designed</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">1000+ Acres</div>
                        <p className="highlight-label">Site Area</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">8+</div>
                        <p className="highlight-label">Years of Excellence</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number accent-gradient-text">3</div>
                        <p className="highlight-label">Continents</p>
                    </div>
                </div>

                {/* Global Presence */}
                <div className="global-presence-wrapper">
                    <div className="section-header text-center mb-16">
                        <h2 className="mb-4">
                            Our <span className="text-primary">Global Presence</span>
                        </h2>
                        <p className="text-gray">{globalPresence.description}</p>
                    </div>

                    <div className="map-container">
                        <img src="/images/royal_blue_world_map.png" alt="World Map" className="world-map" />

                        {/* USA - approx 22% from left, 38% from top */}
                        <div className="map-pin pin-usa" title="USA">
                            <MapPin size={28} className="text-accent" />
                            <div className="pin-pulse"></div>
                            <span className="pin-label">USA</span>
                        </div>

                        {/* Africa - approx 49% from left, 52% from top */}
                        <div className="map-pin pin-africa" title="Africa">
                            <MapPin size={28} className="text-accent" />
                            <div className="pin-pulse"></div>
                            <span className="pin-label">Africa</span>
                        </div>

                        {/* India - approx 66% from left, 44% from top */}
                        <div className="map-pin pin-india" title="India">
                            <MapPin size={28} className="text-accent" />
                            <div className="pin-pulse"></div>
                            <span className="pin-label">India</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
