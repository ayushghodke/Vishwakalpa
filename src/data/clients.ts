// ============================================
// CLIENTS DATA
//
// Premier manufacturing, engineering, and industrial enterprises
// whose facilities have been designed, planned, or engineered by Vishwakalpa.
// ============================================

export interface Client {
    name: string;
    shortName: string;
    logo: string;
    industry: string;
    projectSlug?: string;
}

export const clients: Client[] = [
    {
        name: 'Reliance Industries Limited',
        shortName: 'Reliance',
        logo: '/images/clients/reliance-industries.webp',
        industry: 'Petrochemicals, Energy & Materials',
    },
    {
        name: 'ITC Limited',
        shortName: 'ITC',
        logo: '/images/clients/itc-limited.webp',
        industry: 'Paperboards, Packaging & FMCG',
    },
    {
        name: 'AIA Engineering Limited',
        shortName: 'AIA Engineering',
        logo: '/images/clients/aia-engineering.webp',
        industry: 'High-Chrome Castings & Grinding Media',
        projectSlug: 'foundry-campus-ahmedabad',
    },
    {
        name: 'GMR Group',
        shortName: 'GMR',
        logo: '/images/clients/gmr-group.webp',
        industry: 'Infrastructure & Industrial Parks',
    },
    {
        name: 'Indorama Ventures',
        shortName: 'Indorama',
        logo: '/images/clients/indorama-ventures.webp',
        industry: 'Chemicals, PET & Sustainable Materials',
    },
    {
        name: 'Precision Group',
        shortName: 'Precision Camshafts',
        logo: '/images/clients/precision-group.webp',
        industry: 'Automotive & Precision Machining',
        projectSlug: 'precision-machining-facility-solapur',
    },
    {
        name: 'Neosym Industry Limited',
        shortName: 'Neosym',
        logo: '/images/clients/neosym.webp',
        industry: 'Foundry & Gray Iron Castings',
    },
    {
        name: 'Srichakra Polyplast',
        shortName: 'Srichakra',
        logo: '/images/clients/srichakra-polyplast.webp',
        industry: 'Post-Consumer Plastic Recycling',
        projectSlug: 'r-pet-recycling-campus-krishnagiri',
    },
    {
        name: 'TechInvention Lifecare',
        shortName: 'TechInvention',
        logo: '/images/clients/techinvention.webp',
        industry: 'Biotechnology & Vaccine Manufacturing',
        projectSlug: 'vaccine-manufacturing-campus-addis-ababa',
    },
    {
        name: 'Kanidi Biotech',
        shortName: 'Kanidi Biotech',
        logo: '/images/clients/kanidi-biotech.webp',
        industry: 'Biotechnology & Life Sciences',
    },
    {
        name: 'Kwality',
        shortName: 'Kwality',
        logo: '/images/clients/kwality.webp',
        industry: 'Food Processing & Dairy',
    },
    {
        name: 'MS Engineering & Consultants',
        shortName: 'MS Engineering',
        logo: '/images/clients/ms-engineering.webp',
        industry: 'Industrial Equipment & Engineering',
    },
];
