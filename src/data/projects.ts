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
    country?: string;
    industry: string;
    status: 'Completed' | 'In progress' | 'Under Construction';
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

    {
        slug: 'r-pet-recycling-campus-krishnagiri',
        title: 'R-PET Recycling Campus',
        shortTitle: 'R-PET Recycling',
        seoTitle: 'R-PET Recycling Campus | Vishwakalpa Case Study',
        seoDescription:
            'Inside a 20-acre R-PET recycling campus in Krishnagiri: 168.5m single-bay wash line, 7.5 MVA power across three HT transformers, and linear material flow.',
        clientName: null,
        clientDescriptor: 'a major post-consumer PET recycling manufacturer',
        city: 'Krishnagiri',
        region: 'Tamil Nadu',
        country: 'India',
        industry: 'Recycling — R-PET, post-consumer PET bottle processing',
        status: 'Under Construction',
        durationMonths: null,
        plotArea: '20 acres (80,940 sqm)',
        builtUpArea: 'approx. 10 acres (40,470 sqm / 4,35,600 sq ft)',
        scope: [
            'Master Planning',
            'Architecture',
            'Structural Coordination',
            'Electrical & MEP Coordination',
            'Project Management Consultancy',
        ],
        summary: [
            'A recycling campus processing post-consumer PET bottles into R-PET flake and pellet, master-planned across a 20-acre site with roughly half the plot under roof — a coverage ratio that left room for the raw material yard, internal roads, water circulation infrastructure and future expansion, while still running a single linear process spine from intake to despatch.',
            'Two problems shaped the design. Structurally and electrically, a wash line running 168.5m in a single bay needed uninterrupted power redundancy across three HT transformers feeding continuous washing, drying and pelletising loads, with no tolerance for a mid-process trip. Logistically, on a 20-acre plot large enough to invite an inefficient, spread-out layout, the raw material yard and the finished goods yard needed to sit at opposite ends of one deliberate linear flow, so incoming and outgoing material never crossed and the plant didn\'t waste its scale on unnecessary internal travel distance.',
        ],
        stats: [
            { label: 'Wash line', value: '168.5m × 32.6m bay' },
            { label: 'Storage split', value: 'RM 5.3k · FG 7.6k sqm' },
            { label: 'HT power', value: '3 × 2.5 MVA (7.5 MVA)' },
            { label: 'Plot scale', value: '20 acres, ~50% built' },
        ],
        verticals: [
            {
                number: '01',
                discipline: 'Structural & Electrical',
                heading: 'A 168-Metre Wash Line on Layered HT Power',
                subheading:
                    'Engineering continuous power redundancy across a single-bay process run that cannot tolerate a mid-cycle trip',
                problem:
                    'The wash line is a single continuous bay 168.5m long and 32.6m wide — effectively one uninterrupted process run from bale-breaking through washing to drying. A power trip partway along that line doesn\'t just stop one machine; it stalls material mid-wash across the whole bay, with wet PET flake sitting in line until power is restored. The plant needed HT supply capacity sized for this continuous load, split so that a fault on one transformer never takes down the whole line.',
                solution:
                    'Three 2.5 MVA transformers (TR-1, TR-2, TR-3) were positioned together at a dedicated transformer yard, feeding separate LT panel groups rather than one shared bus — so the wash line\'s load is distributed across independent supply paths. A DG yard sits adjacent for backup, with UPS provision at the panel room for control systems that cannot tolerate even a changeover gap. Multiple forklift charging bays were positioned directly along the raw material and finished goods storage runs, keeping material handling power local to where it\'s used rather than routed across the site.',
                outcome:
                    '7.5 MVA of HT capacity split across three independent transformer paths, so a single transformer fault reduces line capacity rather than halting the wash line entirely — keeping a 168-metre continuous process run protected from single points of electrical failure.',
            },
            {
                number: '02',
                discipline: 'Architecture & Master Planning',
                heading: 'A 20-Acre Plot, Built to a Deliberate Half',
                subheading: 'Using scale as an asset, not an excuse for an inefficient layout',
                problem:
                    'A 20-acre plot is large enough that a plant can be laid out carelessly and still fit — scattering buildings, over-sizing internal roads, and leaving material to travel unnecessary distances between process stages. With roughly half the plot committed to built structure, the other 10 acres of yard, road and buffer space needed a clear purpose rather than becoming leftover ground around the buildings.',
                solution:
                    'The master plan sequences Raw Material Storage (5,300 sqm) at one end, through the Wash Line (168.5m single bay), into FG Storage (7,590 sqm) at the opposite end — a straight-line process with no reversal, deliberately using the plot\'s length rather than its full width. The unbuilt half of the site was allocated with intent: raw material yard capacity for incoming bale trucks, a dedicated water circulation zone, internal roads sized for simultaneous inbound and outbound traffic, and clear room for the Phase 2 capacity this scale of plot was clearly bought to accommodate. Multiple loading ramps at 1:10 and 1:12 connect varying floor levels (FFL 100.65 to 101.70) across the site, letting the plant sit on its natural grade without a single expensive flat pad.',
                outcome:
                    'A 20-acre campus where the built 10 acres does the work of a tightly planned facility, not a sprawling one — and the unbuilt 10 acres is committed to yard capacity, traffic separation and expansion headroom rather than sitting idle as leftover plot.',
            },
        ],
        image: '/images/projects/r-pet-recycling-campus-krishnagiri.webp',
        relatedServices: [
            'industrial-master-planning',
            'structural-mep-design',
            'industrial-pmc',
            'architecture-design',
        ],
        order: 3,
    },

    {
        slug: 'vaccine-manufacturing-campus-addis-ababa',
        title: 'Vaccine Manufacturing Campus',
        shortTitle: 'Vaccine Campus',
        seoTitle: 'Vaccine Manufacturing Campus | Vishwakalpa Case Study',
        seoDescription:
            'Inside an 8-acre WHO-GMP vaccine manufacturing campus in Ethiopia: double-height glazed admin, elevated inter-block bridge, and stacked dense warehousing.',
        clientName: null,
        clientDescriptor: "Ethiopia's national vaccine manufacturing programme",
        city: 'Kilinto Industrial Park',
        region: 'Addis Ababa',
        country: 'Ethiopia',
        industry: 'Pharmaceutical — WHO-GMP vaccine manufacturing',
        status: 'Under Construction',
        durationMonths: null,
        plotArea: '8 acres (32,375 sqm)',
        builtUpArea: 'approx. 4.8 acres / ~2,09,000 sq ft',
        scope: [
            'Architecture',
            'Master Planning',
            'Interior Planning',
            'MEP',
            'Structural',
        ],
        summary: [
            'A vaccine manufacturing campus where the architecture had to do two jobs at once — project Ethiopia\'s ambition to international regulators, delegations and global health partners walking through the front door, while running a fully validated, multi-block GMP production facility behind it. The design treats arrival and operation as one sequence, not two separate buildings bolted together.',
            'Operating in Kilinto Industrial Park, the master plan coordinates double-height architectural glazing, an amphitheater for regulatory briefings, stacked dense warehousing, and an upper-level inter-block bridge that allows personnel and sterile materials to move seamlessly between production units under WHO Maturity Level 4 standards.',
        ],
        stats: [
            { label: 'Plot scale', value: '8 acres, ~60% built' },
            { label: 'Reception', value: 'Double-height glazing' },
            { label: 'Admin features', value: 'Amphitheater & suites' },
            { label: 'Connectivity', value: 'Elevated inter-block bridge' },
        ],
        verticals: [
            {
                number: '01',
                discipline: 'Architecture & Frontage',
                heading: 'An Arrival Sequence Built for What This Building Represents',
                subheading:
                    'Designing the Administration Block as the first impression of a national vaccine self-reliance programme',
                problem:
                    'The facility isn\'t a private factory visited by its own staff. It\'s a flagship facility that regulators, government delegations, UNICEF and AMA procurement teams, and international health partners walk through as evidence that Ethiopia can produce PQ-ready vaccines at WHO Maturity Level 4. The Administration Block had to read as credible and world-class in the first thirty seconds of arrival — before anyone reaches a single production suite — while still functioning as genuine working space for a technical, GMP-regulated organisation.',
                solution:
                    'Arrival opens into a double-height reception with full-height glazing — a deliberate first move that signals scale and transparency rather than a conventional low-ceilinged corporate lobby. From there, the block unfolds around two distinct kinds of space: working space (staff offices, the IT and digital backbone that runs the site\'s documentation and coordination systems) and gathering space, sized generously because this building expects visitors. Multiple conference suites of varying scale support everything from a routine internal review to a full stakeholder delegation, while an amphitheater gives the site a genuine assembly and presentation space — for regulatory briefings, training sessions, or the kind of announcement a national vaccine programme is built to make.',
                outcome:
                    'An Administration Block that functions as both the working front office of a GMP facility and the space Ethiopia uses to show the world what it has built — without either role compromising the other.',
            },
            {
                number: '02',
                discipline: 'Master Planning & Circulation',
                heading: 'A Bridge, Stacked Storage, and a Campus That Moves Like One Building',
                subheading:
                    'Connecting production blocks and handling material at density, without treating either as an afterthought',
                problem:
                    'A multi-block campus rising to six levels in places creates two practical problems the moment people and material need to move through it. First, connecting separate blocks at height without routing every transfer back down to ground level and across an open yard — which is both inefficient and, on a GMP site, a contamination and security risk. Second, warehousing at the density this facility needed without simply building more footprint, when the plot was already committed to production and administration space.',
                solution:
                    'An elevated bridge connects two of the campus\'s production blocks directly at an upper level — letting personnel and controlled material move between buildings without descending to grade, crossing open site traffic, or passing through unnecessary security transitions. In the Warehouse Block, stacking storage was used deliberately rather than flat, single-layer racking, concentrating raw material and finished goods capacity into a smaller footprint — freeing plot area for what the campus actually needed more of: production floor and future expansion room. The warehouse\'s segregated intake and quarantine zones sit adjacent to this stacked storage, so material still moves through full traceability checks before release, regardless of where in the stack it\'s held.',
                outcome:
                    'A campus that behaves like a single connected building rather than seven separate ones — with the bridge removing an entire layer of ground-level movement, and stacked warehousing giving the site storage density without spending plot area it needed elsewhere.',
            },
        ],
        image: '/images/projects/vaccine-manufacturing-campus-addis-ababa.webp',
        relatedServices: [
            'architecture-design',
            'industrial-master-planning',
            'structural-mep-design',
            'bim-3d-modeling',
        ],
        order: 4,
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
