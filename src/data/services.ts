// ============================================
// SERVICES
//
// Six deep pages rather than eleven thin ones. Every page is backed by a real
// project — depth ranks, breadth does not, and unbacked pages drag the strong
// ones down with them.
//
// Priority order (owner answer, Section I):
//   1. Foundry design          — lowest competition, highest intent
//   2. Industrial master plan  — entry point for most large deals
//   3. Precision machining
//   4. Industrial PMC
//
// HONESTY GUARDRAILS — these are not stylistic preferences, they are factual
// constraints the owner set. Do not soften them when editing copy:
//
//   · MEP is delivered through a consultant partner, NOT in-house. Always
//     "coordinated MEP design", never "our in-house MEP team".
//   · Nestlé / Campa Cola / Everest / Havmor are the founding team's
//     PRE-Vishwakalpa experience. Always "our team has delivered", never
//     "Vishwakalpa has delivered".
//   · The firm does NOT manage MIDC liaison, factory licences or pollution
//     NOCs. It produces drawings and documentation that SUPPORT the client's
//     own applications. Never claim to run the approval process.
// ============================================

export interface ServiceFaq {
    question: string;
    answer: string;
}

export interface ServiceSection {
    heading: string;
    body: string[];
}

export interface Service {
    slug: string;
    /** H1 and card title */
    title: string;
    /** Short label for nav and breadcrumbs */
    shortTitle: string;
    /** <title> — under ~60 chars before the brand suffix */
    seoTitle: string;
    /** <meta name="description"> — 140-160 chars */
    seoDescription: string;
    /** One-line summary under the H1 */
    heading: string;
    /** Card blurb on the homepage services grid */
    cardDescription: string;
    intro: string[];
    sections: ServiceSection[];
    scope: string[];
    faqs: ServiceFaq[];
    /** Slug from projects.ts, if a case study backs this service */
    relatedProject: string | null;
    /** Ordering on the homepage grid */
    order: number;
}

const COST_FAQ: ServiceFaq = {
    question: 'How much does it cost per square foot?',
    answer:
        'It is the first question every client asks, and an honest answer needs two numbers from you: the process the building has to house, and the plot. A general-purpose shed and a foundry melting bay of the same floor area differ by a wide margin, because the foundry needs crane-rated structure, hot-zone separation and heavy power that the shed does not. Consultancy fees are normally a percentage of construction cost, scaled to the scope you actually need — design only, design plus coordination, or full project management. Send us the plot details and what you intend to manufacture and you will get a specific fee proposal rather than a range.',
};

const TIMELINE_FAQ: ServiceFaq = {
    question: 'How long will it take?',
    answer:
        'Design and drawing production for a mid-sized industrial facility typically runs three to six months to GFC stage, depending on how settled the process layout is when we start. Construction then depends on scale — the two completed projects on this site ran 22 months and 18 months from start to commissioning, at roughly 4,00,000 and 2,50,000 sq ft respectively. The single largest cause of delay is not drawing production; it is process changes arriving after the structure is fixed. Time spent on master planning at the beginning is what protects the schedule later.',
};

const MIN_SIZE_FAQ: ServiceFaq = {
    question: 'Is there a minimum project size?',
    answer:
        'We take on industrial projects from around ₹5 Crore of construction cost upward, and we deliberately limit intake to a small number of large projects each year so that senior people stay on every one of them. We do not take residential, interior or retail work. If your project is below that threshold we would rather tell you at the first call than take it on and under-serve it.',
};

const BIM_FAQ: ServiceFaq = {
    question: 'Do you model the project in BIM?',
    answer:
        'Yes — every project is modelled before construction begins, and clash detection between structure, services and process equipment happens in the model rather than on site. Catching a conflict between a crane runway and a duct run costs an afternoon in the model; catching it on site costs rework and programme. This is where the 10–15% construction cost saving we quote actually comes from.',
};

export const services: Service[] = [
    {
        slug: 'foundry-design',
        title: 'Foundry Design',
        shortTitle: 'Foundry Design',
        seoTitle: 'Foundry Design Consultant India | Vishwakalpa',
        seoDescription:
            'Foundry design consultants for melting shops and casting plants. Hot-zone separation, EOT crane structure and HT power infrastructure, across India.',
        heading:
            'Melting shops, casting plants and grinding media foundries — designed around the process, not the plot.',
        cardDescription:
            'Melting and holding bays, hot-zone separation, heavy crane structure and HT power infrastructure.',
        intro: [
            'A foundry is not a shed with furnaces in it. Metal moves through a continuous sequence of very different environments in a single building — from a melting furnace running above 1500°C, through moulding and pouring, to a finishing area where people handle the cooled casting by hand. Get the separation between those zones wrong and you have built a safety problem into the structure, where it is expensive and disruptive to fix later.',
            'We have designed and coordinated foundry facilities including a 9.2-acre, 4,00,000 sq ft grinding media campus with three melting and three holding furnaces, and we are currently working on foundry and machining facilities elsewhere in western India. That work is where the detail on this page comes from.',
        ],
        sections: [
            {
                heading: 'Hot-zone separation is a structural decision, not a site rule',
                body: [
                    'The layout follows the process, not the shape of the plot. Melting and holding furnaces — the hottest and highest-risk zones — get their own dedicated bays, separated from moulding, pattern-making and finishing by structural walls rather than distance alone. Molten metal travels a fixed, short crane path from furnace to mould and never crosses a walkway or a finishing area.',
                    'Cooling and quenching sits between the hot zone and the finishing area as a deliberate buffer, so that nobody working on finished castings is ever standing next to an open furnace. Designed once into the building, this stops being something the plant has to manage through procedure every shift.',
                ],
            },
            {
                heading: 'Crane loads and clear heights drive the frame',
                body: [
                    'Foundry structure is sized for the full crane duty cycle, not a nominal load. On the grinding media campus that meant a melting platform carrying three 10 MT and one 30 MT EOT cranes plus a 5 MT monorail, with a separate holding-furnace bay carrying two 10 MT and two 5 MT cranes — crane rail fixed at 10m inside a 15m clear-height shed so maintenance access stays workable.',
                    'Mezzanine levels at maintenance walkways and pouring areas are worked into the frame without interrupting crane runway clearances. These decisions are extremely difficult to retrofit, which is why they belong in the first structural model rather than in a variation order.',
                ],
            },
            {
                heading: 'Power infrastructure with layered redundancy',
                body: [
                    'A furnace in the middle of a melt cannot be exposed to a single point of power failure. On the same campus, 11 kV HT supply enters by underground cable to a metering kiosk with CT and PT, through an isolator with earth switch and gantry, into two main HT transformers. Seven internal distribution transformers with LT panels step power down for individual machine areas, backed by four 750 KVA DG sets each with a dedicated diesel tank.',
                    'Electrical and MEP design is coordinated with our consultant partners and integrated into the model alongside structure and process, so the clashes surface before anything is built.',
                ],
            },
        ],
        scope: [
            'Foundry master planning and process-driven zoning',
            'Melting, holding, moulding and finishing bay layout',
            'EOT crane structure, runway beams and machine foundations',
            'HT power distribution and DG backup coordination',
            'Wind-based zoning, fume extraction and hot-zone ventilation strategy',
            'Quenching pit design with insulated false floor and ceiling',
            'BIM coordination across structure, services and process equipment',
            'Drawings and documentation supporting your statutory approval applications',
        ],
        faqs: [
            {
                question: 'What makes foundry design different from ordinary industrial design?',
                answer:
                    'Three things a general industrial consultant will usually under-estimate: heat and fume management as a zoning problem rather than a ventilation afterthought, crane duty cycles that drive the entire structural frame, and power redundancy sized so a melt is never at risk from a single failure. A foundry laid out like a general engineering shed works on paper and creates safety and quality problems in operation.',
            },
            {
                question: 'Can you work with our existing furnace and equipment suppliers?',
                answer:
                    'Yes, and it is better when we do. Equipment vendors set the foundations, utility loads, clearances and crane requirements that the building has to accommodate. We coordinate their inputs into the model early, because equipment selection changing after the structure is fixed is one of the most expensive things that can happen on a foundry project.',
            },
            COST_FAQ,
            TIMELINE_FAQ,
            BIM_FAQ,
        ],
        relatedProject: 'foundry-campus-ahmedabad',
        order: 1,
    },

    {
        slug: 'industrial-master-planning',
        title: 'Industrial Master Planning',
        shortTitle: 'Master Planning',
        seoTitle: 'Industrial Master Planning Consultant | Vishwakalpa',
        seoDescription:
            'Industrial campus master planning: plot layout, material flow, utility corridors and phased expansion. Projects delivered up to 500 acres.',
        heading:
            'The most undervalued phase of an industrial project, and the one that decides what the next twenty years cost.',
        cardDescription:
            'Campus layout, material flow, utility corridors and land reserved for phases you have not designed yet.',
        intro: [
            'Master planning is the cheapest phase of an industrial project and the one with the longest consequences. Decisions made in a few weeks on a site plan — where raw material enters, where the road runs, which corner is left undeveloped — determine whether Phase 2 is a straightforward extension or a rebuild of your utilities.',
            'Our technical lead holds a Master\'s in Urban and Regional Planning alongside architectural practice, which means campus-level thinking comes before building-level thinking. Master planning exercises delivered to date run up to 500 acres for integrated industrial campuses.',
        ],
        sections: [
            {
                heading: 'Material flow before buildings',
                body: [
                    'The first question is not what the buildings look like. It is what moves through the site, in what direction, and what must never cross what. On a 10-acre precision machining campus that meant two parallel production buildings either side of a shared 9m service road, with raw steel entering one end and finished components leaving through an entirely separate route — because contamination from incoming stock moving along the same path as machined parts is a quality failure waiting to happen.',
                    'Each building was also split so that support functions sat on one strip and admin and visitor-facing functions on the other, keeping operational and visitor traffic from ever overlapping.',
                ],
            },
            {
                heading: 'Plan the phase you have not funded yet',
                body: [
                    'Most industrial clients build a fraction of their plot on day one and intend to expand. The difference between a good master plan and a poor one shows up years later, when that expansion either connects to existing infrastructure or requires tearing up roads and re-routing utilities.',
                    'On the machining campus, 40% of the site — roughly 35,400 sqm — was reserved for future phases and pre-connected to the existing utility routes. Phase 2 there will not require any utility rework. That provision cost almost nothing at planning stage.',
                ],
            },
            {
                heading: 'Utilities, roads and statutory layout',
                body: [
                    'Power, water, drainage and telecom corridors are planned as a network rather than run to each building as it is designed. Common facilities — administration, security, canteen, fire station — are positioned against both operational logic and statutory requirement.',
                    'For MIDC and similar organised industrial zones we prepare the layout drawings and documentation your approval applications need. We do not manage the liaison or filing process itself; that stays with you or your appointed liaison consultant.',
                ],
            },
        ],
        scope: [
            'Site master plan with plot demarcation and road network',
            'Material and personnel flow planning across the campus',
            'Utility infrastructure corridors — power, water, drainage, telecom',
            'Phased development strategy with pre-serviced expansion land',
            'Common facilities — administration, security, canteen, fire station',
            'Green belt, boundary treatment and statutory landscape provision',
            'Layout drawings and documentation supporting MIDC and statutory applications',
        ],
        faqs: [
            {
                question: 'We only want one building. Do we still need a master plan?',
                answer:
                    'If the plot is larger than the building, yes — and it almost always is. The master plan is what stops your one building from being positioned somewhere that makes the second one awkward or the utility runs wasteful. It is a small piece of work relative to the project and it is the single highest-leverage thing you can get right early.',
            },
            {
                question: 'How much land should we reserve for expansion?',
                answer:
                    'It depends on your production roadmap rather than on a rule of thumb, but the important part is not the percentage — it is that the reserved land is pre-connected to utility routes and road access. Reserved land that needs the infrastructure torn up to use is not really reserved. On our Solapur campus 40% was held back and serviced in advance.',
            },
            MIN_SIZE_FAQ,
            TIMELINE_FAQ,
        ],
        relatedProject: 'precision-machining-facility-solapur',
        order: 2,
    },

    {
        slug: 'factory-design',
        title: 'Factory Design',
        shortTitle: 'Factory Design',
        seoTitle: 'Factory Design Consultant India | Vishwakalpa',
        seoDescription:
            'Greenfield factory design, plant expansion and factory layout planning. Process-led layouts, PEB structure and BIM coordination for manufacturers across India.',
        heading:
            'Greenfield plants from empty land, expansions to running facilities, and layouts that follow the process.',
        cardDescription:
            'New plants from bare land, expansion of existing facilities, and machine-level layout planning.',
        intro: [
            '"I have land and need a manufacturing plant designed" is close to the exact phrasing we hear at the first call. It covers three quite different jobs: a greenfield plant on an empty site, an extension or renovation to a facility that is already running, and layout planning inside a building envelope that already exists.',
            'All three start the same way — with what you intend to manufacture, at what volume, and how material has to move to make that happen. The building comes after that, not before.',
        ],
        sections: [
            {
                heading: 'Greenfield — from bare land to production',
                body: [
                    'A greenfield project gives you the rare freedom to let the process dictate the building rather than the reverse. Machine lines, material routes, utility corridors and expansion land can all be positioned optimally instead of being fitted around constraints inherited from someone else.',
                    'That freedom is also the risk. Every early decision compounds, and the cost of changing a structural bay or a utility corridor rises steeply once construction starts. This is why we model the whole facility in BIM before anything is built.',
                ],
            },
            {
                heading: 'Expansion — designing around a plant that cannot stop',
                body: [
                    'Extending a running facility is a harder problem than a greenfield one, because production continues throughout. The design has to account for construction access that does not cut across live material routes, utility tie-ins that can be made during planned shutdowns, and structural connections to a building whose as-built condition may not match its drawings.',
                    'We survey and model the existing condition before designing the extension, rather than trusting the original drawing set. That is usually where the surprises are.',
                ],
            },
            {
                heading: 'Layout planning — machines, flow and clearance',
                body: [
                    'Layout planning is the detailed level: machine placement, material flow, clearances for operation and maintenance, and the provision for equipment you intend to add later. It is where floor loading specifications, service drops and handling routes are settled.',
                    'Done properly it is also where a large amount of avoidable cost is removed — a line laid out to minimise travel and rework does not need to be re-laid out two years later.',
                ],
            },
        ],
        scope: [
            'Greenfield plant design from site analysis to GFC drawings',
            'Expansion and renovation design for facilities in production',
            'Factory layout planning — machine placement, flow, clearances',
            'PEB and RCC structural design coordination',
            'Coordinated MEP design with our consultant partners',
            'BIM modelling and clash detection before construction',
            'Detailed Project Reports and feasibility studies',
            'Drawings and documentation supporting your approval applications',
        ],
        faqs: [
            {
                question: 'We have land but no drawings and no process layout yet. Can you still start?',
                answer:
                    'Yes, and that is the best time to involve us. If the process layout is not yet fixed we can work from your production targets, product mix and equipment shortlist to develop it — which is considerably better than receiving a layout that was drawn without reference to how the building has to work. Bring the plot documents, the products and the volumes.',
            },
            {
                question: 'Can you design around equipment we have already ordered?',
                answer:
                    'Yes. Equipment foundations, utility loads, clearances and handling requirements become fixed inputs to the design. It is more constrained than designing before ordering, but it is entirely workable — the important thing is that we get the vendor drawings early rather than late.',
            },
            COST_FAQ,
            TIMELINE_FAQ,
            BIM_FAQ,
        ],
        relatedProject: null,
        order: 3,
    },

    {
        slug: 'precision-machining-facility-design',
        title: 'Precision Machining Facility Design',
        shortTitle: 'Machining Facilities',
        seoTitle: 'Machining Plant Design Consultant | Vishwakalpa',
        seoDescription:
            'Design consultants for CNC, VMC and HMC machining plants. Floor loading engineered to machine spec, with long-span column-free bays.',
        heading:
            'Floors engineered for the loads they actually carry, and column-free bays you can reconfigure.',
        cardDescription:
            'CNC, VMC and HMC facilities — machine-spec floor loading, long-span structure and clean material routes.',
        intro: [
            'Precision machining puts two demands on a building that pull against each other. The floor has to take heavy, repeated point loads without cracking or settling, and the bays have to stay column-free so machine lines can be rearranged as the product mix changes.',
            'We designed a 10-acre, 2,50,000 sq ft automotive machining facility with ten machining lines producing camshafts for global OEM customers. The specifics below come from that project.',
        ],
        sections: [
            {
                heading: 'Floor specification is a calculation, not a standard detail',
                body: [
                    'A generic industrial floor does not survive concentrated, repetitive machine loading. On the Solapur facility the floor was engineered for the calculated machine loads — 5 MT uniformly distributed load plus an 8 MT puncture load per machine footprint — with a laser-screeded FM II finish appropriate to precision equipment rather than general industrial traffic.',
                    'Specifying this correctly means the floor is neither over-designed nor under-designed. Both are expensive; the second is expensive later, which is worse.',
                ],
            },
            {
                heading: 'Column-free bays with provision for overhead handling',
                body: [
                    'A PEB long-span frame keeps the full 30m bay column-free, so machine lines can be reconfigured without a column in the way. Alongside that, a jack beam runs the full length of each of the ten machining lines — a structural provision allowing an overhead handling or light crane system to be added later along any line, without breaking the floor or introducing a mid-bay column.',
                    'That provision cost very little to build in. Retrofitting it would mean structural work in a live machining hall.',
                ],
            },
            {
                heading: 'Raw material and finished goods must never cross',
                body: [
                    'Machined parts are contamination-sensitive. Dust or debris carried in on incoming stock, travelling the same route as finished components, is a quality failure route. On the Solapur campus, raw material enters the machine shop from the warehouse side, moves through lines L#01 to L#10, and finished parts exit by a separate route into the finished goods store.',
                    'The separation is built into the site plan rather than managed by procedure, which is the difference between a control that holds and one that depends on everybody following it every day.',
                ],
            },
        ],
        scope: [
            'Machine shop layout for CNC, VMC and HMC lines',
            'Floor loading design to calculated machine specification',
            'Laser-screeded FM-classified floor finish specification',
            'Long-span PEB structure with column-free machining bays',
            'Jack beam and future overhead handling provision',
            'Raw material and finished goods flow separation',
            'Warehouse, stores and finished goods integration',
            'Coordinated MEP design — compressed air, power, extraction',
        ],
        faqs: [
            {
                question: 'What floor specification do we actually need?',
                answer:
                    'It comes from your machines, not from a standard. We work from the equipment schedule — machine weights, footprints, dynamic loads and vibration sensitivity — to calculate a uniformly distributed load and a puncture load per footprint, then specify the slab, reinforcement and finish flatness class against those figures. On our Solapur project that produced 5 MT UDL plus 8 MT puncture load with an FM II laser-screeded finish.',
            },
            {
                question: 'Can we add cranes to the machining lines later?',
                answer:
                    'Only if the structure was designed for it. Adding overhead handling to a frame that was not provisioned means structural strengthening in an operating facility. Building in a jack beam along each line at construction stage is inexpensive and preserves the option — we would recommend it on almost any machining hall.',
            },
            COST_FAQ,
            BIM_FAQ,
        ],
        relatedProject: 'precision-machining-facility-solapur',
        order: 4,
    },

    {
        slug: 'industrial-pmc',
        title: 'Industrial Project Management',
        shortTitle: 'Project Management',
        seoTitle: 'Industrial PMC & Project Management | Vishwakalpa',
        seoDescription:
            'Project management for industrial construction: contractor coordination, site supervision, quality and cost control. Periodic or full-time PMC.',
        heading:
            'The difference between periodic site visits and full-time PMC is the difference between reporting problems and preventing them.',
        cardDescription:
            'Contractor coordination, site supervision, quality control and cost tracking through to commissioning.',
        intro: [
            'A set of drawings does not build a factory. Somebody has to hold contractors to them, catch deviations while they are still cheap to correct, and keep a dozen agencies working to one programme. That is what project management consultancy is.',
            'We offer it at two levels, and it is worth being clear about the difference because they are often sold as though they were the same thing.',
        ],
        sections: [
            {
                heading: 'Periodic supervision versus full-time PMC',
                body: [
                    'Periodic supervision means scheduled site visits at defined intervals and milestones, with reports on progress and quality. It suits projects with a capable in-house team who need independent technical oversight rather than day-to-day management.',
                    'Full-time PMC places our people on site continuously. The distinction matters because most costly construction problems are not discovered at a milestone inspection — they are decisions taken between inspections. A deviation caught the day it happens costs a conversation; caught three weeks later it costs demolition.',
                ],
            },
            {
                heading: 'Designed by the people who supervise it',
                body: [
                    'Where we have produced the design, PMC is materially stronger, because the people checking the work already know why each detail is the way it is. A crane runway tolerance or a floor flatness class is not an abstract specification to be enforced — it is a requirement someone on our team calculated.',
                    'We also take on PMC for projects designed by others. In that case the first task is a design review, so that we understand what we are being asked to enforce before we start enforcing it.',
                ],
            },
            {
                heading: 'Cost, programme and quality tracked together',
                body: [
                    'These three are not independent. Programme pressure produces quality compromise, quality compromise produces rework, and rework destroys both cost and programme. Tracking them as one picture rather than three separate reports is what lets you see a problem while it is still a small one.',
                    'Our reporting covers progress against programme, quality observations with photographic record, variation and cost tracking, and a forward view of decisions you need to make before they become urgent.',
                ],
            },
        ],
        scope: [
            'Project planning, programme development and scheduling',
            'Tender documentation and contractor evaluation support',
            'Consultant and agency coordination across disciplines',
            'Full-time site supervision or scheduled periodic inspection',
            'Quality control against specification and drawings',
            'Variation, cost and progress tracking with regular reporting',
            'Snagging, commissioning support and handover coordination',
        ],
        faqs: [
            {
                question: 'Which do we need — periodic visits or full-time PMC?',
                answer:
                    'It depends on your own team. If you have experienced project people in-house and need independent technical checking, periodic supervision is usually sufficient and considerably cheaper. If your team is running the business rather than the build, full-time is what actually protects the outcome. For projects with heavy process equipment, tight tolerances or a compressed programme, we would recommend full-time.',
            },
            {
                question: 'Will you manage our approvals and licences?',
                answer:
                    'No, and we would rather be clear about it than imply otherwise. We prepare the drawings and technical documentation your applications require — layout drawings, statutory submissions and supporting documents — but the liaison and filing process itself stays with you or a liaison consultant you appoint. Firms that promise to handle approvals are usually subcontracting it anyway.',
            },
            {
                question: 'Can you take over a project that has already started?',
                answer:
                    'Yes. It begins with a condition and design review so we know what has been built, what was specified, and where the two differ. That review is worth doing honestly even if you then decide not to appoint us — knowing the actual position is better than assuming.',
            },
            COST_FAQ,
        ],
        relatedProject: 'foundry-campus-ahmedabad',
        order: 5,
    },

    {
        slug: 'structural-mep-design',
        title: 'Structural & MEP Design',
        shortTitle: 'Structural & MEP',
        seoTitle: 'Industrial Structural & MEP Design | Vishwakalpa',
        seoDescription:
            'Industrial structural design and coordinated MEP: PEB frames, crane gantries, machine foundations and utility systems. Licensed engineers.',
        heading:
            'The engineering that holds the building up and keeps it running — coordinated in one model.',
        cardDescription:
            'PEB frames, crane gantries and machine foundations, with coordinated electrical, HVAC and utility design.',
        intro: [
            'Industrial structure has to carry loads that ordinary buildings never see: furnaces, EOT cranes running full duty cycles, machine foundations taking repeated puncture loading, and long spans that have to stay column-free. The services then have to route through that structure without conflict.',
            'Our Head of Structural Engineering is a Licensed Structural Design Engineer in two states, with over fifteen years across industrial, commercial and high-rise work in both RCC and steel.',
        ],
        sections: [
            {
                heading: 'Structural design for industrial loads',
                body: [
                    'PEB frame design and proof-checking, crane runway beams sized to the actual duty cycle, machine foundations for furnaces, CNC and VMC lines, and foundation engineering for heavy and dynamic loads. Long-span frames keep production bays column-free so lines can be reconfigured without structural constraint.',
                    'Where equipment vendors provide foundation and load data, that becomes a fixed input to the structural model rather than a coordination problem discovered on site.',
                ],
            },
            {
                heading: 'Coordinated MEP design',
                body: [
                    'MEP is delivered in coordination with our consultant partners rather than by an in-house team, and we would rather state that plainly than imply a capability we do not hold directly. What we do own is the coordination: electrical distribution, HVAC and ventilation, compressed air and utility piping, plumbing, drainage and firefighting systems are integrated into the same model as structure and process.',
                    'Our senior technical authority on this side brings over forty years in MEP engineering, industrial piping and utility infrastructure, which is what makes the coordination meaningful rather than administrative.',
                ],
            },
            {
                heading: 'Clash detection is where the saving is',
                body: [
                    'Structure, services and process equipment are modelled together and checked against each other before construction. A crane runway crossing a duct route, a foundation clashing with a drainage run, a service drop landing in a machine footprint — each of these costs an afternoon to resolve in a model and days of rework on site.',
                    'This is the concrete mechanism behind the 10–15% construction cost saving we quote. It is not a general claim about technology; it is the accumulated cost of conflicts that never reached site.',
                ],
            },
        ],
        scope: [
            'PEB frame design, proof-checking and vendor drawing review',
            'EOT crane runway beams and gantry structure',
            'Machine foundation design for furnaces, CNC, VMC and HMC lines',
            'Heavy and dynamic load foundation engineering',
            'Long-span column-free bay design in steel and RCC',
            'Coordinated electrical distribution and HT infrastructure',
            'Coordinated HVAC, ventilation, compressed air and utility piping',
            'Firefighting, plumbing and drainage coordination',
            'BIM clash detection across all disciplines before construction',
        ],
        faqs: [
            {
                question: 'Is your MEP team in-house?',
                answer:
                    'No. MEP design is delivered through our consultant partners, with coordination, integration and technical oversight held by us. We are explicit about this because the distinction matters when you are comparing proposals — some firms describe coordinated MEP as though it were in-house. What you get from us is a single point of accountability for the coordination, backed by a principal consultant with over forty years in industrial MEP and piping.',
            },
            {
                question: 'Can you proof-check a PEB vendor\'s design?',
                answer:
                    'Yes, and it is worth doing. PEB vendors optimise for their own supply, which is reasonable, but the design still has to satisfy your crane loads, future provisions and site conditions. Independent proof-checking by a licensed structural engineer is inexpensive relative to what it catches.',
            },
            BIM_FAQ,
            COST_FAQ,
        ],
        relatedProject: 'foundry-campus-ahmedabad',
        order: 6,
    },
];

export const servicesByOrder = [...services].sort((a, b) => a.order - b.order);

export function getService(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
