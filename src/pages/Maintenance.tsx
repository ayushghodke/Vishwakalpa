import { useEffect, useRef, useState } from 'react';
import { HardHat, Phone, Mail } from 'lucide-react';
import { company, mailtoUrl, telUrl } from '../data/company';
import './Maintenance.css';

const Maintenance = () => {
    const TARGET = 87;
    const [progress, setProgress] = useState(0);
    const [displayNum, setDisplayNum] = useState(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(TARGET);
            const startTime = performance.now();
            const DURATION = 1600; // matches CSS transition
            const tick = (now: number) => {
                const t = Math.min((now - startTime) / DURATION, 1);
                const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
                setDisplayNum(Math.round(eased * TARGET));
                if (t < 1) rafRef.current = requestAnimationFrame(tick);
            };
            rafRef.current = requestAnimationFrame(tick);
        }, 300);
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const phone = company.phoneDisplay;
    const email = company.email;

    return (
        <div className="maint" role="main">
            {/* Floating dust / spark particles */}
            <div className="maint-dust" aria-hidden="true">
                {Array.from({ length: 18 }).map((_, i) => (
                    <span key={i} style={{ ['--i' as string]: i }} />
                ))}
            </div>

            {/* Blueprint grid backdrop */}
            <div className="maint-grid" aria-hidden="true" />

            <div className="maint-inner">
                <header className="maint-brand">
                    <img src="/images/Logo.webp" alt="Vishwakalpa" className="maint-logo" width={48} height={48} />
                    <span>VISHWAKALPA</span>
                </header>

                {/* Animated construction crane */}
                <div className="maint-crane" aria-hidden="true">
                    <svg viewBox="0 0 320 240" width="320" height="240" role="img">
                        {/* Mast */}
                        <rect className="crane-mast" x="40" y="40" width="16" height="180" />
                        {/* Cross bracing on mast */}
                        <line className="crane-line" x1="40" y1="60" x2="56" y2="90" />
                        <line className="crane-line" x1="56" y1="60" x2="40" y2="90" />
                        <line className="crane-line" x1="40" y1="100" x2="56" y2="130" />
                        <line className="crane-line" x1="56" y1="100" x2="40" y2="130" />
                        <line className="crane-line" x1="40" y1="140" x2="56" y2="170" />
                        <line className="crane-line" x1="56" y1="140" x2="40" y2="170" />

                        {/* Rotating jib + load */}
                        <g className="crane-jib">
                            {/* Counter-jib */}
                            <rect className="crane-arm" x="6" y="36" width="50" height="10" />
                            <rect className="crane-weight" x="2" y="30" width="18" height="22" rx="2" />
                            {/* Main jib */}
                            <rect className="crane-arm" x="48" y="36" width="220" height="10" />
                            {/* Tower cab */}
                            <rect className="crane-cab" x="42" y="24" width="20" height="16" rx="2" />
                            {/* Hoist cable */}
                            <line className="crane-cable" x1="240" y1="46" x2="240" y2="120" />
                            {/* Swinging load */}
                            <g className="crane-load">
                                <rect x="222" y="120" width="36" height="26" rx="2" />
                            </g>
                        </g>
                    </svg>
                </div>

                <div className="maint-badge">
                    <HardHat size={18} strokeWidth={2.2} />
                    <span>Site under construction</span>
                </div>

                <h1 className="maint-title">
                    We're building something <span>great.</span>
                </h1>

                <p className="maint-text">
                    Our digital space is getting a fresh blueprint. We're laying the
                    foundations for a better experience — back online very soon.
                </p>

                {/* Build progress meter */}
                <div className="maint-progress" aria-label={`Build progress ${TARGET} percent`}>
                    <div className="maint-progress-head">
                        <span>Build progress</span>
                        <span>{displayNum}%</span>
                    </div>
                    <div className="maint-progress-track">
                        <div
                            className="maint-progress-fill"
                            style={{ width: `${progress}%` }}
                        >
                            <span className="maint-progress-stripes" />
                        </div>
                    </div>
                </div>

                <div className="maint-contact">
                    <span className="maint-contact-label">Need us in the meantime?</span>
                    <div className="maint-contact-links">
                        <a href={telUrl} className="maint-btn maint-btn--primary">
                            <Phone size={16} /> {phone}
                        </a>
                        <a href={mailtoUrl} className="maint-btn maint-btn--ghost">
                            <Mail size={16} /> {email}
                        </a>
                    </div>
                </div>

                <footer className="maint-footer">
                    © {company.legalName}
                </footer>
            </div>
        </div>
    );
};

export default Maintenance;
