import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import './Navbar.css';

// ============================================
// NAVBAR
//
// Previously every nav item called getElementById(id).scrollIntoView() — which
// works on the homepage and silently does nothing everywhere else, because
// those section elements only exist on the homepage. All six items were dead on
// /service/:id. With ten routes now that would have been ten pages with a
// non-functioning nav, and a real internal-linking loss on top of the UX one.
//
// Anchors now resolve against the homepage from anywhere: on the homepage they
// smooth-scroll, off it they navigate to /#section and scroll after arrival.
// ============================================

interface NavItem {
    label: string;
    /** Homepage section id, or an absolute route path */
    target: string;
    isRoute?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Home', target: 'home' },
    { label: 'Services', target: 'services' },
    { label: 'Industries', target: 'industries' },
    { label: 'Projects', target: 'portfolio' },
    { label: 'Team', target: '/team', isRoute: true },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === '/';

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

    const goToSection = (id: string) => {
        setMobileMenuOpen(false);

        if (isHome) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Off the homepage: navigate there first. Home.tsx reads the hash on
        // mount and scrolls once the sections actually exist.
        navigate(`/#${id}`);
    };

    const renderLink = (item: NavItem, className?: string) =>
        item.isRoute ? (
            // Closed here rather than in an effect on location.pathname — the
            // click IS the event, so reacting to the navigation afterwards is a
            // round trip through state for no benefit.
            <Link
                key={item.label}
                to={item.target}
                className={className}
                onClick={() => setMobileMenuOpen(false)}
            >
                {item.label}
            </Link>
        ) : (
            <a
                key={item.label}
                className={className}
                role="button"
                tabIndex={0}
                onClick={() => goToSection(item.target)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goToSection(item.target);
                    }
                }}
            >
                {item.label}
            </a>
        );

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo" aria-label="Vishwakalpa — home">
                        <img
                            src="/images/Logo.webp"
                            alt="Vishwakalpa"
                            className="brand-logo"
                            width="96"
                            height="96"
                            decoding="async"
                        />
                        <span className="logo-text">VISHWAKALPA</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="navbar-links">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.label}>{renderLink(item)}</li>
                        ))}
                        <li>
                            <button
                                className="btn btn-primary contact-highlight"
                                onClick={() => goToSection('contact')}
                            >
                                Contact Us
                            </button>
                        </li>
                    </ul>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu glass-panel">
                        {NAV_ITEMS.map((item) => renderLink(item))}
                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '10px' }}
                            onClick={() => goToSection('contact')}
                        >
                            Contact Us
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
