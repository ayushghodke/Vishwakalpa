// ============================================
// PROJECTS — CASE STUDIES
//
// Both studies are published with full technical substance and ANONYMISED
// client identity, per the owner's decision. G4 flagged limitations on naming
// clients, so the safe default is applied.
//
// The technical detail is what ranks and what convinces a factory owner. The
// client name contributes almost nothing to search — so anonymising costs very
// little and removes all relationship risk.
//
// TO NAME A CLIENT LATER: set `clientName` to the real name. Nothing else needs
// to change — the page renders `clientName ?? clientDescriptor` throughout.
// ============================================

export interface ProjectStat {
    label: string;
    value: string;
}

/** Problem → Solution → Outcome. The structure the owner supplied, kept intact. */
export interface ProjectVertical {
    number: string;
    discipline: string;
    heading: string;
    subheading: string;
    problem: string;
    solution: string;
    outcome: string;
}

export interface Project {
    slug: string;
    title: string;
    shortTitle: string;
    seoTitle: string;
    seoDescription: string;
    /** null = anonymised. Set to the real name once clearance is obtained. */
    clientName: string | null;
    /** Used wherever clientName is null */
    clientDescriptor: string;
    city: string;
    region: string;
    industry: string;
    status: 'Completed' | 'In progress';
    durationMonths: number | null;
    plotArea: string;
    builtUpArea: string | null;
    scope: string[];
    summary: string[];
    stats: ProjectStat[];
    verticals: ProjectVertical[];
    /** null renders the branded placeholder — same convention as sectors.ts */
    image: string | null;
    /** Slugs from services.ts this project demonstrates */
    relatedServices: string[];
    order: number;
}

export const projects: Project[] = [
    {
        slug: 'foundry-campus-ahmedabad',
        title: 'Grinding Media Foundry Campus',
        shortTitle: 'Foundry Campus',
        seoTitle: 'Vishwakalpa | Foundry Campus Case Study, Ahmedabad',
        seoDescription:
            'Inside a 4,00,000 sq ft grinding media foundry: three melting and three holding furnaces, 30 MT EOT cranes at 15m clear height, and 11 kV HT supply.',
        clientName: null,
        clientDescriptor: 'a leading grinding media manufacturer',
        city: 'Ahmedabad',
        region: 'Gujarat',
        industry: 'Foundry — grinding media, high-chrome cast iron',
        status: 'Completed',
        durationMonths: 22,
        plotArea: '9.2 acres',
        builtUpArea: 'approx. 4,00,000 sq ft',
        scope: [
            'Master Planning',
            'Architecture',
            'Structural Coordination',
            'Electrical & MEP Coordination',
            'Project Management Consultancy',
        ],
        summary: [
            'A 9.2-acre high-chrome cast iron foundry campus producing grinding media, delivered over 22 months. The facility runs three melting and three holding furnaces across two production lines, under EOT cranes up to 30 MT, fed by an 11 kV HT supply with layered redundancy.',
            'Two problems shaped the design. Structurally and electrically, the building had to carry very heavy dynamic crane loads while guaranteeing that a furnace mid-melt was never exposed to a single point of power failure. Architecturally, a process running from above 1500°C down to hand-finishing had to be separated so that heat, fumes and fire risk never reached the people handling finished castings.',
        ],
        stats: [
            { label: 'Furnaces', value: '3 melting + 3 holding' },
            { label: 'Heaviest crane', value: '30 / 50 MT EOT' },
            { label: 'Clear height', value: '15m, crane rail at 10m' },
            { label: 'HT supply', value: '11 kV, 2 transformers' },
        ],
        verticals: [
            {
                number: '01',
                discipline: 'Structural & Electrical',
                heading: 'Heavy Crane Loads and HT Power',
                subheading:
                    'Engineering for 30 MT crane loads and 11 kV incoming supply across two furnace bays',
                problem:
                    'The melting and holding furnace bays needed to support very heavy, dynamic crane loads — up to 30 MT on the melting platform alone — across a 15m clear-height shed, while keeping crane rail access at a workable 10m for maintenance. At the same time the plant needed a reliable 11 kV HT supply capable of feeding both continuous furnace loads and standby DG backup, without single points of failure that could halt a molten-metal process mid-cycle.',
                solution:
                    'Structural frames were sized for the full crane duty cycle: three 10 MT plus one 30 MT EOT cranes and a 5 MT monorail on the melting platform, and two 10 MT plus two 5 MT EOT cranes on the holding furnace bay, with crane rail level fixed at 10m inside a 15m clear-height shed. Mezzanine floors at 3.5m were added at maintenance walkways and pouring areas without interrupting crane runway clearances. On the electrical side, 11 kV HT supply enters via underground cable to a metering kiosk with CT and PT, through an isolator with earth switch and gantry, into two main HT transformers. Seven internal distribution transformers with LT panels step down power for individual machine areas, backed by four 750 KVA DG sets, each with a dedicated diesel tank.',
                outcome:
                    'A structural frame that carries its heaviest lift — 30 MT — with full maintenance access at a safe 10m crane rail height, and an electrical system with layered redundancy from HT metering through to DG backup, so a furnace in the middle of a melt is never exposed to a single power failure point.',
            },
            {
                number: '02',
                discipline: 'Architectural',
                heading: 'Space Planning for a Two-Line Foundry',
                subheading:
                    'Keeping hot process, finishing and utilities in separate zones across a linear production spine',
                problem:
                    'A foundry moves metal through very different environments in one continuous flow — from a melting furnace at over 1500°C, through moulding and pouring, to a finishing area where workers handle the cooled casting by hand. If these zones are not physically separated, heat, fumes and fire risk from the melting and pouring areas spread into spaces where people work closely with the product, creating both a safety hazard and a quality risk from heat distortion.',
                solution:
                    'The layout follows the process itself, not the plot shape. Melting and holding furnaces — the hottest and highest-risk zones — are grouped into their own dedicated bays, physically separated from the moulding, pattern-making and finishing areas by structural walls, not just distance. Molten metal only ever travels along a fixed, short crane path, from furnace to mould, never crossing a walkway or a finishing zone. Cooling and quenching, where the casting first becomes safe to handle, sits as a buffer stage between the hot zone and the finishing area, so nobody working on finished castings is ever standing next to an open furnace.',
                outcome:
                    'Heat, fumes and fire risk stay contained to the two bays built for them, while moulding, finishing and quality checks happen in a separate, safer environment — with a fixed, minimum-distance path for molten metal designed once into the building, not managed afterwards through site rules.',
            },
        ],
        image: '/images/projects/foundry-campus-ahmedabad.webp',
        relatedServices: ['structural-mep-design', 'industrial-pmc', 'bim-3d-modeling'],
        order: 1,
    },

    {
        slug: 'precision-machining-facility-solapur',
        title: 'Automotive Precision Machining Facility',
        shortTitle: 'Machining Facility',
        seoTitle: 'Vishwakalpa | Precision Machining Case Study, Solapur',
        seoDescription:
            'Inside a 10-acre automotive machining campus: floor engineered to 5 MT UDL plus 8 MT puncture load, and column-free 30m PEB bays.',
        clientName: null,
        clientDescriptor: 'an automotive camshaft manufacturer',
        city: 'Solapur',
        region: 'Maharashtra',
        industry: 'Automotive precision machining — camshafts for global OEMs',
        status: 'Completed',
        durationMonths: 18,
        plotArea: '10 acres (40,470 sqm)',
        builtUpArea: 'approx. 2,50,000 sq ft',
        scope: [
            'Master Planning',
            'Architecture',
            'Structural Coordination',
            'MEP Coordination',
            'Project Management',
        ],
        summary: [
            'A 10-acre precision machining campus for camshaft production supplying global automotive OEMs, delivered over 18 months. Ten machining lines run inside a 7,835 sqm machine shop, mirrored by a warehouse of the same footprint across a shared service road.',
            'Two constraints drove the design. At site level, incoming raw steel and outgoing machined components could never share a route, because contamination on precision parts is a quality failure. At building level, the floor had to take heavy repeated point loads while the bays stayed column-free, so lines could be reconfigured — two requirements that normally pull against each other.',
        ],
        stats: [
            { label: 'Plot area', value: '10 acres (40,470 sqm)' },
            { label: 'Machine shop', value: '7,835 sqm, 10 lines' },
            { label: 'Warehouse', value: '7,835 sqm, RM + FG' },
            { label: 'Structure', value: 'PEB, long-span' },
        ],
        verticals: [
            {
                number: '01',
                discipline: 'Master Planning',
                heading: 'Material & Movement Flow',
                subheading: 'Keeping raw material and finished goods from ever crossing paths',
                problem:
                    'A 10-acre facility for 10 precision machining lines where incoming raw steel and outgoing finished components could never cross paths. Precision-machined parts are contamination-sensitive — any dust or debris from incoming stock moving through the same route as finished parts risks quality failure. At the same time, the full plot was not to be built out immediately, but room to expand later had to be preserved without redesigning utilities or roads from scratch.',
                solution:
                    'Two parallel production buildings — machine shop and warehouse, both 81.62m x 96.00m — sit either side of a shared 9m service road. Raw material enters the machine shop from the warehouse side, moves through the 10 machining lines (L#01 to L#10), and finished parts exit through a separate route into the warehouse\'s finished goods store. Each building is also split north-south: support functions (maintenance, stores, offices) on one strip, admin and visitor-facing functions (entrance, conference, canteen) on the other, so operational and visitor traffic never overlap. 40% of the site — approximately 35,400 sqm — is reserved for future phases, pre-connected to existing utility routes.',
                outcome:
                    'A campus where raw material and finished goods physically never cross, support functions stay separated from precision work areas, and land for future growth is already serviced — so Phase 2 will not require any utility rework.',
            },
            {
                number: '02',
                discipline: 'Structural',
                heading: 'Floor Loading & Long-Span Design',
                subheading: 'Engineering the floor for the loads it actually carries, with room to grow overhead',
                problem:
                    'The 10 CNC/VMC/HMC lines needed a floor that could take heavy, repeated point loads without cracking or settling over time — specifically a 5 MT uniformly distributed load plus an 8 MT puncture load per machine footprint. A standard industrial floor spec would not hold up under this kind of concentrated, repetitive machine loading across an 81.62m span. At the same time, column-free bays were needed so machine lines could be rearranged later — which is normally in tension with heavy floor load design.',
                solution:
                    'The floor was engineered specifically for the calculated machine loads — 5 MT UDL plus 8 MT puncture load per footprint — with a laser-screeded FM II finish suited to precision equipment rather than generic industrial traffic. A jack beam runs the full length of every one of the 10 machining lines, a structural provision allowing an overhead material-handling or light crane system to be added later along any line without breaking the floor or adding columns mid-bay. The PEB long-span frame keeps the entire 30m bay column-free.',
                outcome:
                    'A machining hall where the floor is engineered for exactly the loads it carries — neither over- nor under-designed — and every line already has built-in provision for future overhead handling, without a single column constraining how production is run today or reconfigured tomorrow.',
            },
        ],
        image: '/images/projects/precision-machining-facility-solapur.webp',
        relatedServices: [
            'industrial-master-planning',
            'machine-layout-design',
            'architecture-design',
        ],
        order: 2,
    },
];

export const projectsByOrder = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);

/** The name to display — real name once cleared, descriptor until then. */
export function clientLabel(project: Project): string {
    return project.clientName ?? project.clientDescriptor;
}
