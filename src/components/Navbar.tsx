import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <div className="navbar-logo">
                        <img
                            src="/images/Logo.webp"
                            alt="Vishwakalpa Logo"
                            className="brand-logo"
                            width="96"
                            height="96"
                            decoding="async"
                        />
                        <span className="logo-text">VISHWAKALPA</span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="navbar-links">
                        <li><a onClick={() => scrollTo('home')}>Home</a></li>
                        <li><a onClick={() => scrollTo('industries')}>Industries</a></li>
                        <li><a onClick={() => scrollTo('portfolio')}>Portfolio</a></li>
                        <li><a onClick={() => scrollTo('services')}>Services</a></li>
                        <li><a onClick={() => scrollTo('about')}>About</a></li>
                        <li><button className="btn btn-primary contact-highlight" onClick={() => scrollTo('contact')}>Contact Us</button></li>
                    </ul>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu glass-panel">
                        <a onClick={() => scrollTo('home')}>Home</a>
                        <a onClick={() => scrollTo('industries')}>Industries</a>
                        <a onClick={() => scrollTo('portfolio')}>Portfolio</a>
                        <a onClick={() => scrollTo('services')}>Services</a>
                        <a onClick={() => scrollTo('about')}>About</a>
                        <button className="btn btn-primary" style={{ marginTop: '10px' }} onClick={() => scrollTo('contact')}>Contact Us</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
