import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-bg">
                <img
                    src="/images/hero/mmlp-new.webp"
                    alt="Vishwakalpa Architecture"
                    width="1920"
                    height="1080"
                    fetchPriority="high"
                    decoding="async"
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <div className="container">
                    <h1 className="hero-title animate-fade-in-up">
                        Let's Build Lasting <span>Spaces</span> Together
                    </h1>
                </div>
            </div>

        </section>
    );
};

export default Hero;
