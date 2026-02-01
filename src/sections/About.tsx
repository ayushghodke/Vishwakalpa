import './About.css';
import contentData from '../assets/content.json';

const About = () => {
    const { company, coreValues, websiteRecommendations } = contentData;

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
                        What We <span className="gold-gradient">Stand For</span>
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
                        <div className="highlight-number gold-gradient">15+</div>
                        <p className="highlight-label">Years of Excellence</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number gold-gradient">100+</div>
                        <p className="highlight-label">Projects Delivered</p>
                    </div>
                    <div className="highlight-card glass-panel">
                        <div className="highlight-number gold-gradient">3</div>
                        <p className="highlight-label">Countries</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
