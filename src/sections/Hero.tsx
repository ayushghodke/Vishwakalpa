import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-bg">
                <img src="/images/hero/mmlp-new.png" alt="Vishwakalpa Architecture" />
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
