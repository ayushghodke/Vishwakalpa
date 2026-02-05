import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
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
        <nav className={`navbar glass-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <div className="navbar-logo">
                        <span className="logo-text">VISHWAKALPA</span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="navbar-links">
                        <li><a onClick={() => scrollTo('home')}>Home</a></li>
                        <li><a onClick={() => scrollTo('portfolio')}>Portfolio</a></li>
                        <li><a onClick={() => scrollTo('services')}>Services</a></li>
                        <li><a onClick={() => scrollTo('about')}>About</a></li>
                        <li><a onClick={() => scrollTo('contact')}>Contact</a></li>
                    </ul>

                    {/* CTA Button */}
                    <button className="btn btn-primary" onClick={() => scrollTo('contact')}>
                        Get in Touch
                    </button>

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
                        <a onClick={() => scrollTo('portfolio')}>Portfolio</a>
                        <a onClick={() => scrollTo('services')}>Services</a>
                        <a onClick={() => scrollTo('about')}>About</a>
                        <a onClick={() => scrollTo('contact')}>Contact</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
