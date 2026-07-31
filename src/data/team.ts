// ============================================
// TEAM
//
// Ten profiles, published as supplied by the company. Each becomes a Person
// node in the /team page's JSON-LD, linked to the organisation.
//
// This is the highest-leverage content on the site for search. Google gives a
// substantial ranking advantage to sites that demonstrably have real, qualified
// experts behind them — and a page signed by a licensed structural engineer or
// a consultant with forty years in industrial MEP will outrank an anonymous
// page saying the same words. The old site named nobody at all.
//
// PHOTOS: `photo: null` renders the branded placeholder card — the same
// convention already used in sectors.ts. To add one:
//   1. Drop the image into public/images/team/<id>.webp
//   2. Change `photo: null` to '/images/team/<id>.webp'
// Nothing else needs touching.
// ============================================

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    /** One line for the card and for the Person schema jobTitle context */
    credential: string;
    /** Years of professional experience, where stated. null = not supplied. */
    yearsExperience: number | null;
    qualifications: string[];
    bio: string[];
    /** null renders the branded placeholder instead of a photograph */
    photo: string | null;
    /** Leadership appear on the homepage strip; everyone appears on /team */
    isLeadership: boolean;
    order: number;
}

export const team: TeamMember[] = [
    {
        id: 'vishwanath-shinde',
        name: 'Vishwanath Shinde',
        role: 'Co-Founder and Principal Consultant',
        credential: '40+ years in MEP engineering, industrial piping and utility infrastructure',
        yearsExperience: 40,
        qualifications: ['MEP Engineering', 'Industrial Piping Systems', 'Utility Infrastructure'],
        bio: [
            'Vishwanath Shinde is the Co-Founder and Principal Consultant of Vishwakalpa, and the technical foundation on which the firm was built. With over 40 years of experience in MEP engineering, industrial piping systems and utility infrastructure, he represents a depth of knowledge that most consultancies in this space simply cannot replicate — the kind that comes not from textbooks but from four decades of solving real problems on real sites across India\'s industrial landscape.',
            'His career spans the full breadth of mechanical, electrical and plumbing engineering for industrial and manufacturing facilities, with particular depth in process piping, utility systems, compressed air, firefighting infrastructure and industrial electrical distribution. He has worked with and alongside some of India\'s most established industrial names, including Finolex Cables and Pipes, and has managed the MEP scope on a wide range of manufacturing, process and infrastructure projects.',
            'At Vishwakalpa, Vishwanath serves as the firm\'s senior technical authority — the person who has seen every version of a problem before, and whose judgement shapes how the team approaches every new one.',
        ],
        photo: null,
        isLeadership: true,
        order: 1,
    },
    {
        id: 'akshay-shilimkar',
        name: 'Akshay Shilimkar',
        role: 'Co-Founder and CEO',
        credential: '12+ years; B.E. Mechanical, M.Sc. Electrical & Electronics, University of Nottingham',
        yearsExperience: 12,
        qualifications: [
            'B.E. Mechanical Engineering, Savitribai Phule Pune University',
            'M.Sc. Electrical and Electronics Engineering, University of Nottingham',
            'Erasmus Mundus Joint Masters Programme',
        ],
        bio: [
            'Akshay Shilimkar is the Co-Founder of Vishwakalpa, where he leads business development, client strategy and project engagement across industrial and manufacturing sectors.',
            'Akshay holds a Bachelor\'s degree in Mechanical Engineering from Savitribai Phule Pune University, and a Master\'s degree in Electrical and Electronics Engineering from the University of Nottingham, completed as part of the Erasmus Mundus Joint Masters Programme — a competitive, merit-based scholarship programme funded by the European Commission and delivered jointly across universities in the UK, Spain and Italy.',
            'At Vishwakalpa, Akshay works directly with founders and managing directors of manufacturing businesses, from the first conversation through to signed engagement — helping them translate a production vision into a campus that works: the right layout, the right cost envelope, the right consultants, and a design process that does not surprise them halfway through construction. He has led client engagements across foundry, precision machining, galvanizing, food processing and pharmaceutical sectors.',
        ],
        photo: null,
        isLeadership: true,
        order: 2,
    },
    {
        id: 'anuja-shinde',
        name: 'Anuja Shinde',
        role: 'Co-Founder and CTO',
        credential: '12+ years; B.Arch, M.Plan Urban and Regional Planning',
        yearsExperience: 12,
        qualifications: [
            'Bachelor of Architecture, Ajeenkya DY Patil Knowledge City, Pune',
            'Master of Urban and Regional Planning, MIT ADT University, Pune (full scholarship)',
        ],
        bio: [
            'Anuja Shinde is the Co-Founder and CTO of Vishwakalpa.',
            'Anuja holds a Bachelor of Architecture from Ajeenkya DY Patil Knowledge City, Pune, and a Master\'s in Urban and Regional Planning from MIT ADT University, Pune, on a full scholarship. Her planning training alongside architectural practice gives her a campus-level perspective that most industrial architects do not carry — she thinks in process flows and land use logic before she thinks in buildings.',
            'Over her career, Anuja has personally designed and delivered industrial facilities across precision and heavy machining, plastic recycling, textile manufacturing, food processing, pharmaceutical manufacturing and multi-use industrial parks. She has worked on individual facility designs on plots of up to 40 acres, and has led master planning exercises for integrated industrial campuses of up to 500 acres.',
            'At Vishwakalpa she leads the full technical scope of every engagement: master planning, architectural design, BIM-integrated coordination across structural and MEP disciplines, drawing production through to GFC stage, and construction-stage technical oversight.',
        ],
        photo: null,
        isLeadership: true,
        order: 3,
    },
    {
        id: 'mohammed-zabi',
        name: 'Mohammed Zabi',
        role: 'Head of Structural Engineering',
        credential: 'Licensed Structural Design Engineer in Telangana and Karnataka; 15+ years',
        yearsExperience: 15,
        qualifications: [
            'B.E. Civil Engineering, PDA College of Engineering',
            'M.Tech Structural Engineering, R.V. College of Engineering, Bangalore',
            'Licensed Structural Design Engineer — Telangana',
            'Licensed Structural Design Engineer — Karnataka',
        ],
        bio: [
            'Mohammed Zabi is the Head of Structural Engineering at Vishwakalpa, with over 15 years of experience in structural design and construction across industrial, commercial, high-rise and residential projects, covering both RCC and steel structures.',
            'Mohammed holds a Bachelor\'s degree in Civil Engineering from PDA College of Engineering and a Master of Technology in Structural Engineering from R.V. College of Engineering, Bangalore. He is a Licensed Structural Design Engineer in two states, Telangana and Karnataka — a credential carrying formal government recognition of his competence to sign and certify structural designs independently.',
            'At Vishwakalpa, Mohammed leads structural design across all industrial projects: PEB frame coordination and proof-checking, machine foundation design for heavy equipment including furnaces, cranes and CNC/VMC/HMC lines, crane runway beam design, and foundation engineering for complex industrial loads. His dual state licensure and his experience bridging design and construction execution make him the firm\'s technical authority on everything that holds the building up.',
        ],
        photo: null,
        isLeadership: true,
        order: 4,
    },
    {
        id: 'akash-jagtap',
        name: 'Akash Sanjay Jagtap',
        role: 'Head of MEP Design',
        credential: '8 years in mechanical, electrical and plumbing systems for industrial facilities',
        yearsExperience: 8,
        qualifications: ['B.E. Mechanical Engineering, Savitribai Phule Pune University'],
        bio: [
            'Akash Sanjay Jagtap is the Head of MEP Design at Vishwakalpa, with 8 years of experience in mechanical, electrical and plumbing systems design for industrial and manufacturing facilities.',
            'Akash holds a Bachelor of Engineering in Mechanical Engineering from Savitribai Phule Pune University — a foundation that directly informs his approach to MEP design, where understanding how mechanical systems interact with production equipment matters as much as the engineering of the systems themselves.',
            'At Vishwakalpa, Akash leads MEP design across all active projects, covering electrical distribution, HVAC and ventilation, compressed air and utility piping, plumbing and drainage, and firefighting systems — ensuring full coordination with architectural and structural design before anything reaches the construction stage.',
        ],
        photo: null,
        isLeadership: false,
        order: 5,
    },
    {
        id: 'mayur-ashok',
        name: 'Mayur Ashok',
        role: 'Head of Mechanical Engineering',
        credential: '10+ years across precision machining, fabrication and packaging automation',
        yearsExperience: 10,
        qualifications: [
            'B.E. Mechanical Engineering, Savitribai Phule Pune University',
            'Certified SolidWorks Professional',
        ],
        bio: [
            'Mayur Ashok is the Head of Mechanical Engineering at Vishwakalpa, bringing over 10 years of hands-on mechanical design and industrial engineering experience across precision machining, fabrication, laser cutting, FMCG packaging automation and high-speed manufacturing systems.',
            'Mayur holds a Bachelor\'s degree in Mechanical Engineering from Savitribai Phule Pune University and is a certified SolidWorks professional. His career spans mechanical design roles at Kakade Laser (laser cutting and fabrication), XOLERTIC Asia (CNC-integrated systems, robotic case packers, cobot and palletizer assemblies), and Rovema India (new product development for FMCG packaging machinery including VFFS, cartoners and end-of-line systems).',
            'At Vishwakalpa, Mayur leads mechanical engineering input across industrial projects — from utility system design and compressed air layouts to equipment interface coordination for CNC, VMC and HMC machining lines, fabrication shops, laser cutting facilities and packaging plants.',
        ],
        photo: null,
        isLeadership: false,
        order: 6,
    },
    {
        id: 'aarushi-gupta',
        name: 'Aarushi Gupta',
        role: 'Senior Architect and Landscape Designer',
        credential: 'B.Arch; M.Arch Urban Design — 12+ years across architecture and landscape',
        yearsExperience: 12,
        qualifications: [
            'Bachelor of Architecture, Guru Gobind Singh Indraprastha University',
            'Master of Architecture in Urban Design, Sushant School of Art and Architecture',
        ],
        bio: [
            'Aarushi Gupta is a Senior Architect and Landscape Designer at Vishwakalpa, with over 12 years of experience spanning architectural design, landscape planning, site development and visual communication.',
            'Aarushi holds a Bachelor of Architecture from Guru Gobind Singh Indraprastha University and a Master of Architecture in Urban Design from Sushant School of Art and Architecture — a combination giving her a dual lens: the ability to design at the building level and think coherently at the campus and urban scale simultaneously.',
            'At Vishwakalpa, Aarushi contributes to the architectural and landscape design scope of industrial campuses, where green belt planning, boundary treatment, internal landscape and the visual character of the facility matter not only aesthetically but for regulatory compliance and worker environment quality.',
        ],
        photo: null,
        isLeadership: false,
        order: 7,
    },
    {
        id: 'mayur-khedekar',
        name: 'Mayur Khedekar',
        role: 'Chief Human Resources Officer',
        credential: '12+ years in technical talent acquisition across international markets',
        yearsExperience: 12,
        qualifications: ['KTH Royal Institute of Technology, Sweden'],
        bio: [
            'Mayur Khedekar is the Chief Human Resources Officer at Vishwakalpa, bringing over 12 years of experience in talent acquisition, strategic recruitment and people operations across international markets.',
            'Mayur holds a degree from KTH Royal Institute of Technology, Sweden — one of Europe\'s leading technical universities — a foundation giving him an uncommon advantage in industrial hiring: the ability to evaluate technical candidates on substance, not just credentials.',
            'At Vishwakalpa, that technical grounding has been instrumental in building a team with the engineering depth industrial facility design demands. Where most design firms hire generalists and hope for the best, Vishwakalpa\'s ability to identify and attract specialists in foundry design, heavy structural engineering and industrial MEP coordination is a direct reflection of the rigour he brings to every hiring decision.',
        ],
        photo: null,
        isLeadership: false,
        order: 8,
    },
    {
        id: 'jeffil-obadiah',
        name: 'Jeffil Obadiah',
        role: 'Head of Business Development and Commercial Strategy',
        credential: '6 years in B2B and infrastructure-led enterprise deal structuring',
        yearsExperience: 6,
        qualifications: ['Bachelor\'s degree, Presidency College'],
        bio: [
            'Jeffil Obadiah is the Head of Business Development and Commercial Strategy at Vishwakalpa, with 6 years of experience building pipelines, structuring enterprise deals and driving client acquisition across B2B and infrastructure-led businesses.',
            'Jeffil holds a Bachelor\'s degree from Presidency College, and has built his career at the intersection of commercial strategy, relationship development and enterprise sales — with exposure spanning design-led businesses, infrastructure, software and B2B environments across India and Europe.',
            'At Vishwakalpa, Jeffil leads the firm\'s growth strategy: identifying and qualifying high-value industrial leads, managing the commercial side of client relationships from first contact through to signed engagement, and building the partnerships and referral channels a boutique industrial practice depends on to maintain a consistent pipeline of the right projects.',
        ],
        photo: null,
        isLeadership: false,
        order: 9,
    },
    {
        id: 'ayush-ghodke',
        name: 'Ayush Ghodke',
        role: 'Digital and Technology Lead',
        credential: 'B.E.; full-stack development, API integration and IoT systems',
        yearsExperience: null,
        qualifications: ['B.E., Pune Vidyarthi Griha\'s College of Engineering, Pune'],
        bio: [
            'Ayush Ghodke is the Digital and Technology Lead at Vishwakalpa, responsible for the firm\'s digital presence, website development, marketing content and visual communication.',
            'Ayush holds a Bachelor\'s degree in Engineering from Pune Vidyarthi Griha\'s College of Engineering, Pune, and has built his technical career across full-stack software development, API integration, IoT systems and enterprise application development — with hands-on experience in React.js, Python, Java, Node.js and FastAPI.',
            'At Vishwakalpa, Ayush handles the full digital stack: website design and development, digital marketing and social media content, graphic design, photography and post-production for project documentation. His software background means Vishwakalpa\'s digital presence is built and maintained by someone who understands both the technical architecture behind it and the industrial context it needs to communicate.',
        ],
        photo: null,
        isLeadership: false,
        order: 10,
    },
];

export const teamByOrder = [...team].sort((a, b) => a.order - b.order);
export const leadership = teamByOrder.filter((m) => m.isLeadership);

/**
 * Combined professional experience across the team, for the homepage stats.
 *
 * This replaced "8+ Years of Excellence", which was factually wrong — the
 * company was incorporated in 2025. The owner's own note (B1) says to lead with
 * team experience rather than company age, and this is both accurate and a
 * considerably stronger claim. Derived, not hardcoded, so it stays true as the
 * team changes.
 */
export const combinedYearsExperience = team.reduce(
    (total, m) => total + (m.yearsExperience ?? 0),
    0,
);

/** Initials for the placeholder card shown until a photograph is supplied. */
export function initials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}
