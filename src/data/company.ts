// ============================================
// COMPANY — SINGLE SOURCE OF TRUTH FOR NAP
//
// NAP = Name, Address, Phone. Google matches this website against the Google
// Business Profile and every directory listing by comparing the EXACT
// characters. A mismatch — even a missing comma — can make Google treat you as
// two separate businesses and split your local ranking between them.
//
// Before this file existed, the company name and address were duplicated across
// index.html, content.json and Footer.tsx, and all three had drifted apart.
// Everything now reads from here. Do not hardcode these values anywhere else.
// ============================================

export const SITE_URL = 'https://www.vishwakalpa.com';

export const company = {
    /**
     * Registered name, from the GST certificate / CIN. Title-cased — registries
     * store names in caps but the caps are not part of the name.
     *
     * Three other spellings existed before this was settled:
     *   Google Business Profile: "Vishwakalpa Design, Planning & Management Pvt. Ltd."
     *   Old website:             "Vishwakalpa Design Planning & Management Pvt Ltd"
     *   LinkedIn slug:           "vishwakalpa-design-planning-and-management"  (agrees)
     *
     * ACTION OUTSTANDING: the Google Business Profile still needs renaming to
     * match this. See SEO-QUESTIONS-OUTSTANDING.md → A1.
     */
    legalName: 'Vishwakalpa Design Planning and Management Private Limited',

    /** Short form for the logo, nav and headings. NAP matching only cares about
     *  the formal name where it appears — footer, contact block, schema. */
    shortName: 'Vishwakalpa',

    foundedYear: 2025,
    employeeCount: 15,

    identifiers: {
        cin: 'U43219PN2025PTC246853',
        gstin: '27AALCV4596N1ZA',
    },

    address: {
        street: 'Vishwakalpa Building, Mula Nagar',
        locality: 'Sangvi',
        city: 'Pune',
        region: 'Maharashtra',
        postalCode: '411027',
        country: 'IN',
        countryName: 'India',
    },

    /**
     * Latitude/longitude for the LocalBusiness schema.
     *
     * Deliberately null rather than guessed. A wrong pin is worse than no pin —
     * it can conflict with the Google Business Profile's own location. Fill in
     * from the GBP dashboard (right-click the pin in Google Maps) and the geo
     * block starts emitting automatically.
     */
    geo: null as { latitude: number; longitude: number } | null,

    phone: '+919175761066',
    /** Human-readable form for display. Same number, formatted. */
    phoneDisplay: '+91 91757 61066',
    whatsapp: '919175761066',
    email: 'info@vishwakalpa.com',

    /**
     * Owner gave "8am-5pm" without specifying days. Mo-Sa is the norm for Indian
     * industrial consultancies. Confirm against the GBP listing — the two must
     * agree. See SEO-QUESTIONS-OUTSTANDING.md → A3.
     */
    openingHours: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '17:00',
        display: 'Monday – Saturday, 8:00 am – 5:00 pm',
    },

    social: {
        linkedin: 'https://www.linkedin.com/company/vishwakalpa-design-planning-and-management/',
        instagram: 'https://www.instagram.com/vishwakalpa',
    },

    /** States where the firm actively pursues work (owner answer D3). */
    areaServed: [
        'Maharashtra',
        'Gujarat',
        'Karnataka',
        'Tamil Nadu',
        'Andhra Pradesh',
        'Madhya Pradesh',
    ],

    /**
     * Cities with a real delivered or in-progress project. These replaced the
     * decorative world map — real place names are worth far more for local
     * search than an unfalsifiable "3 continents" claim.
     */
    projectCities: [
        { city: 'Pune', region: 'Maharashtra' },
        { city: 'Ahmedabad', region: 'Gujarat' },
        { city: 'Solapur', region: 'Maharashtra' },
        { city: 'Surat', region: 'Gujarat' },
        { city: 'Belagavi', region: 'Karnataka' },
    ],

    /** Owner answers G2 and H1 — used to qualify enquiries on the homepage. */
    engagement: {
        minProjectValue: '₹5 Crore',
        sweetSpot: '₹25–100 Crore',
        projectsPerYear: '2–4',
    },
} as const;

/** "Vishwakalpa Building, Mula Nagar, Sangvi, Pune, Maharashtra 411027, India" */
export const formattedAddress = [
    company.address.street,
    company.address.locality,
    company.address.city,
    `${company.address.region} ${company.address.postalCode}`,
    company.address.countryName,
].join(', ');

/** Every profile Google should treat as the same entity as this website. */
export const sameAs: string[] = [
    company.social.linkedin,
    company.social.instagram,
];

export const whatsappUrl = `https://wa.me/${company.whatsapp}`;
export const telUrl = `tel:${company.phone}`;
export const mailtoUrl = `mailto:${company.email}`;

/** Absolute URL for a site-relative path. Canonicals, og:url and the sitemap
 *  must all be absolute, and must all agree on the host. */
export function absoluteUrl(path: string): string {
    return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
