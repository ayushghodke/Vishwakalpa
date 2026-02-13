import './Hero.css';

const Hero = () => {
    const scrollToPortfolio = () => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="hero">
            <div className="hero-bg">
                <img src="/images/hero/mmlp-new.png" alt="Vishwakalpa Architecture" />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <div className="container">
                    <h1 className="hero-title animate-fade-in-up">
                        Let's Build Lasting <span className="accent-gradient-text">Spaces</span> Together
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up">
                        Designed with Innovation
                    </p>
                    <div className="hero-cta animate-fade-in">
                        <button className="btn btn-primary btn-lg" onClick={scrollToPortfolio}>
                            Explore Portfolio
                        </button>
                        <button className="btn btn-secondary btn-lg" onClick={scrollToContact}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-arrow"></div>
            </div>
        </section>
    );
};

export default Hero;
