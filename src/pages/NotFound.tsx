import { Link } from 'react-router';
import type { MetaDescriptor } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesByOrder } from '../data/services';
import { buildMeta } from '../utils/seo';
import './NotFound.css';

// ============================================
// 404
//
// The old site had no 404 route at all: vercel.json rewrote every URL to
// index.html, the SPA booted, <Routes> matched nothing, and the visitor got a
// blank white page at HTTP 200.
//
// That combination is worse than it looks. A 200 status tells Google the URL is
// a real page, so every mistyped or stale link becomes an indexable empty page
// — and once / is prerendered, a catch-all rewrite serves the full homepage at
// every bogus URL, generating unlimited duplicate content. Dropping the rewrite
// and prerendering this route is what produces a genuine 404 instead.
// ============================================

export function meta(): MetaDescriptor[] {
    return buildMeta({
        title: 'Page Not Found | Vishwakalpa',
        description: 'This page could not be found.',
        path: '/404',
        noindex: true,
    });
}

const NotFound = () => {
    return (
        <div className="notfound-page">
            <Navbar />

            <main className="notfound-main">
                <div className="container notfound-container">
                    <p className="notfound-code">404</p>
                    <h1 className="notfound-title">This page doesn't exist</h1>
                    <p className="notfound-text">
                        The link may be out of date, or the address mistyped. Here is what
                        we do — one of these is probably what you were looking for.
                    </p>

                    <ul className="notfound-links">
                        {servicesByOrder.map((service) => (
                            <li key={service.slug}>
                                <Link to={`/services/${service.slug}`}>{service.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="notfound-actions">
                        <Link to="/" className="btn btn-primary btn-lg">
                            Back to home
                        </Link>
                        <Link to="/#contact" className="btn btn-secondary btn-lg">
                            Contact us
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
