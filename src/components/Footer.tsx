import { Link } from 'react-router';
import './Footer.css';
import {
    company,
    formattedAddress,
    mailtoUrl,
    telUrl,
} from '../data/company';
import { servicesByOrder } from '../data/services';
import { blogs } from '../data/blogs';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // id was "contact" here AND on the Contact section — invalid HTML, and
        // the nav only worked because getElementById returned whichever came
        // first in the document. Renamed; the Contact section keeps #contact.
        <footer id="site-footer" className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand */}
                    <div className="footer-col">
                        <div className="footer-logo-container">
                            <img
                                src="/images/Logo.webp"
                                alt="Vishwakalpa"
                                className="footer-brand-logo"
                                width="96"
                                height="96"
                                loading="lazy"
                                decoding="async"
                            />
                            <h3 className="footer-logo">VISHWAKALPA</h3>
                        </div>
                        <p className="footer-tagline">
                            Industrial Facility Design &amp; Master Planning
                        </p>
                        <p className="footer-description">
                            Factories and manufacturing campuses — designed,
                            engineered and delivered.
                        </p>
                    </div>

                    {/* Services — real internal links, which also spreads crawl
                        equity to every service page from every page on the site. */}
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul className="footer-links">
                            {servicesByOrder.map((service) => (
                                <li key={service.slug}>
                                    <Link to={`/services/${service.slug}`}>{service.shortTitle}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technical Insights & Guides */}
                    <div className="footer-col">
                        <h4><Link to="/blogs" style={{ color: 'inherit' }}>Insights</Link></h4>
                        <ul className="footer-links">
                            <li>
                                <Link to="/blogs" style={{ fontWeight: 600 }}>All Technical Guides</Link>
                            </li>
                            {blogs.map((blog) => (
                                <li key={blog.slug}>
                                    <Link to={`/blogs/${blog.slug}`}>{blog.shortTitle}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Contact Us</h4>
                        <ul className="footer-contact">
                            <li>📍 {formattedAddress}</li>
                            <li>
                                📞 <a href={telUrl}>{company.phoneDisplay}</a>
                            </li>
                            <li>
                                📧 <a href={mailtoUrl}>{company.email}</a>
                            </li>
                            <li>🕗 {company.openingHours.display}</li>
                        </ul>
                    </div>
                </div>


                <div className="footer-bottom">
                    {/* Formal registered name. NAP matching compares exact
                        characters against the Google Business Profile. */}
                    <p>
                        &copy; {currentYear} {company.legalName}. All rights reserved.
                        <span className="footer-legal">
                            CIN {company.identifiers.cin} · GSTIN {company.identifiers.gstin}
                        </span>
                    </p>
                    <button className="scroll-top-btn" onClick={scrollToTop}>
                        ↑ Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
