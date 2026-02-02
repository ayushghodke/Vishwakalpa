import './About.css';
import contentData from '../assets/content.json';
import { Cpu, Target, Building2, CheckCircle2, Globe2 } from 'lucide-react';

const About = () => {
    const { company, coreValues, websiteRecommendations, globalPresence } = contentData;

    const valueIcons: Record<string, React.ReactNode> = {
        'Technology-led Practice': <Cpu size={48} className="text-accent" />,
        'From Vision to Delivery': <Target size={48} className="text-accent" />,
        'Modern Architectural Approach': <Building2 size={48} className="text-accent" />
    };

    return (
        <section id="about" className="section-lg about-section">
            <div className="about-bg">
                <img src="/images/portfolio/institutional.jpg" alt="About Background" />
                <div className="about-overlay"></div>
            </div>

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
                                {valueIcons[value.title]}
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
                                <span className="tagline-accent"><CheckCircle2 size={24} /></span>
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
                                <div className="region-icon"><Globe2 size={40} className="text-accent" /></div>
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
