import './About.css';
import contentData from '../assets/content.json';

const About = () => {
    const { company, coreValues, websiteRecommendations, globalPresence } = contentData;

    const valueIcons: Record<string, string> = {
        'Technology-led Practice': '💻',
        'From Vision to Delivery': '🎯',
        'Modern Architectural Approach': '🏛️'
    };

    return (
        <section id="about" className="section-lg about-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header text-center">
                    <h2 className="mb-4">
                        What We <span className="accent-gradient-text">Stand For</span>
                    </h2>
                    <p className="text-gray mb-12">
                        {websiteRecommendations.about.keyMessage}
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="mission-statement glass-card-gold">
                    <h3 className="mission-title">Our Mission</h3>
                    <p className="mission-text">{company.mission}</p>
                </div>

                {/* Core Values Grid */}
                <div className="values-grid">
                    {coreValues.map((value, index) => (
                        <div key={index} className="value-card glass-card animate-fade-in">
                            <div className="value-icon">
                                {valueIcons[value.title as keyof typeof valueIcons]}
                            </div>
                            <h4>{value.title}</h4>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>

                {/* Taglines */}
                <div className="taglines-section">
                    <div className="tagline-grid">
                        {company.taglines.slice(0, 3).map((tagline, index) => (
                            <div key={index} className="tagline-item">
                                <span className="tagline-accent">✓</span>
                                <p>{tagline}</p>
                            </div>
                        ))}
                    </div>
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
                            Our <span className="accent-gradient-text">Global Presence</span>
                        </h2>
                        <p className="text-gray">{globalPresence.description}</p>
                    </div>

                    <div className="regions-grid">
                        {globalPresence.regions.map((region, index) => (
                            <div key={index} className="region-card glass-card">
                                <div className="region-icon">🌍</div>
                                <p className="region-name">{region}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
