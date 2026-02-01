import './Footer.css';
import contentData from '../assets/content.json';

const Footer = () => {
    const { contact } = contentData.company;
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Column */}
                    <div className="footer-col">
                        <h3 className="footer-logo">VISHWAKALPA</h3>
                        <p className="footer-tagline">
                            Let's Build Lasting Spaces Together
                        </p>
                        <p className="footer-description">
                            Technology-led Practice, Sustainable by Industry
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Contact Us</h4>
                        <ul className="footer-contact">
                            <li>📍 {contact.address}</li>
                            <li>📞 {contact.phone}</li>
                            <li>📧 {contact.email}</li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="footer-col">
                        <h4>Ready to Build?</h4>
                        <p className="mb-6">Let's transform your vision into reality</p>
                        <button className="btn btn-primary">
                            Get in Touch
                        </button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Vishwakalpa Design Planning & Management Pvt Ltd. All rights reserved.</p>
                    <button className="scroll-top-btn" onClick={scrollToTop}>
                        ↑ Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
