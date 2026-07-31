// ============================================
// SERVICES
//
// Six deep pages rather than eleven thin ones. Depth ranks, breadth does not,
// and unbacked pages drag the strong ones down with them.
//
// The list is organised by DISCIPLINE (what we do) rather than by FACILITY TYPE
// (what we build). Facility and industry targeting lives in sectors.ts — the
// twelve "Industries We Serve" cards — and in the case studies. Ordered as the
// work actually runs: plan the campus, design the building, lay out the
// machines, engineer it, model it, build it.
//
// NOTE ON FOUNDRY — the owner's Section I ranked "foundry design consultant
// India" as the single highest-value target: lowest competition, highest
// intent, three real projects behind it. It was removed from the service list
// at the owner's request. It now appears only in the Ahmedabad case study, and
// there is no foundry sector card either, so nothing on the site targets that
// term directly. Worth revisiting.
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
    /** <title> — under ~60 chars including the brand suffix */
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
        'It is the first question every client asks, and an honest answer needs two things from you: the process the building has to house, and the plot. A general-purpose shed and a heavy manufacturing bay of the same floor area differ by a wide margin, because the heavy bay needs crane-rated structure, process zoning and power infrastructure the shed does not. Consultancy fees are normally a percentage of construction cost, scaled to the scope you actually need — design only, design plus coordination, or full project management. Send us the plot details and what you intend to manufacture and you will get a specific fee proposal rather than a range.',
};

const TIMELINE_FAQ: ServiceFaq = {
    question: 'How long will it take?',
    answer:
        'Design and drawing production for a mid-sized industrial facility typically runs three to six months to GFC stage, depending on how settled the process layout is when we start. Construction then depends on scale — the two completed projects on this site ran 22 months and 18 months from start to commissioning, at roughly 4,00,000 and 2,50,000 sq ft respectively. The single largest cause of delay is not drawing production; it is process changes arriving after the structure is fixed. Time spent on planning at the beginning is what protects the schedule later.',
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
        slug: 'industrial-master-planning',
        title: 'Industrial Master Planning',
        shortTitle: 'Master Planning',
        seoTitle: 'Vishwakalpa | Industrial Master Planning Consultant',
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
        order: 1,
    },

    {
        slug: 'architecture-design',
        title: 'Architecture & Design',
        shortTitle: 'Architecture',
        seoTitle: 'Vishwakalpa | Industrial Architecture & Design Consultant',
        seoDescription:
            'Industrial architecture for factories and manufacturing campuses: building envelope, admin blocks, worker amenities, facade and statutory compliance.',
        heading:
            'The building around the process — engineered for the people who work in it, not only the machines.',
        cardDescription:
            'Building envelope, admin and amenity blocks, facade, daylight and ventilation, statutory compliance.',
        intro: [
            'Industrial architecture is usually treated as whatever is left over once the process layout is fixed. That is how you end up with a plant that runs adequately and is unpleasant to work in — no daylight where people spend ten hours, an admin block positioned so visitors walk through a material route, an entrance that says nothing about the company to the OEM customer auditing it.',
            'The building envelope is also where a large amount of operating cost is decided: orientation, roof and wall build-up, ventilation strategy and glazing determine what you spend on cooling and lighting for the next twenty years.',
        ],
        sections: [
            {
                heading: 'Envelope, daylight and ventilation',
                body: [
                    'Orientation and roof design are settled against the actual process heat load, not a default. Where the process is hot — furnaces, ovens, hot forming — ventilation and stack effect are designed into the section rather than solved afterwards with fans. Where it is precision work, the priority inverts: stable temperature, controlled daylight and no glare across a machine console.',
                    'North light, roof monitors and translucent sheeting reduce the lighting load through the working day. On a large-span shed that is a material saving, and it is free if it is decided before the structure is.',
                ],
            },
            {
                heading: 'Admin, amenity and the visitor route',
                body: [
                    'Offices, canteen, changing rooms, first aid and toilets are positioned so that people reach them without crossing a material route or a hazardous zone. On the Solapur campus each building was split north-south, with maintenance, stores and offices on one strip and entrance, conference and canteen on the other, so operational and visitor traffic never overlap.',
                    'This matters commercially as well as practically. If your customers audit your plant — and in automotive, pharma and food they will — the route they walk is part of what they are assessing.',
                ],
            },
            {
                heading: 'Facade, identity and statutory compliance',
                body: [
                    'An industrial building does not need to be decorative, but it does need to look like a company worth placing a long-term order with. Facade treatment, entrance design, boundary and landscape are handled as part of the architecture rather than added at the end when the budget is gone.',
                    'Setbacks, ground coverage, FSI, fire tender access, green belt provision and parking are checked against the applicable development control rules from the first sketch. We prepare the drawings and documentation your approval applications require; the liaison and filing stay with you or your appointed consultant.',
                ],
            },
        ],
        scope: [
            'Concept and schematic design for industrial buildings and campuses',
            'Building envelope, roof and section design against process heat load',
            'Daylight, natural ventilation and glare control strategy',
            'Administration, canteen, changing room and amenity block design',
            'Facade, entrance and campus identity treatment',
            'Green belt, boundary and landscape integration',
            'Detailed working drawings through to GFC stage',
            'Drawings and documentation supporting your statutory applications',
        ],
        faqs: [
            {
                question: 'Do we need an architect if we already have a PEB vendor?',
                answer:
                    'A PEB vendor supplies and erects a structural shed. They do not plan how people move through it, where the amenities go, how it is ventilated, or whether the layout satisfies your development control rules — and they have no commercial reason to. On anything beyond a plain storage shed, the two are complementary rather than alternatives: we design the facility, they supply the frame, and we proof-check what they propose.',
            },
            {
                question: 'Can you improve an existing plant without rebuilding it?',
                answer:
                    'Often, yes. Daylight, ventilation, amenity provision and circulation can frequently be improved substantially within an existing envelope, and those are the changes people working there actually notice. It starts with a survey of the as-built condition, because on older plants the drawings and the building have usually diverged.',
            },
            COST_FAQ,
            TIMELINE_FAQ,
        ],
        relatedProject: 'precision-machining-facility-solapur',
        order: 2,
    },

    {
        slug: 'machine-layout-design',
        title: 'Machine Layout Design',
        shortTitle: 'Machine Layout',
        seoTitle: 'Vishwakalpa | Machine Layout Design Consultant',
        seoDescription:
            'Machine layout design for manufacturing plants: machine placement, material flow, clearances, floor loading and provision for future reconfiguration.',
        heading:
            'Where every machine sits, how material reaches it, and what the floor underneath has to carry.',
        cardDescription:
            'Machine placement, line balancing, clearances, floor loading specification and future handling provision.',
        intro: [
            '"I have the machines, I need to know how to lay them out" is one of the more common ways this conversation starts — sometimes for a new plant, often for a shop floor that has grown by accretion until nobody can move a pallet without going the long way round.',
            'Layout is where a large amount of avoidable operating cost is either designed out or locked in for a decade. A line laid out to minimise travel, double-handling and cross-traffic does not need re-laying out in two years, and the floor under it does not crack because it was specified for the loads it actually carries.',
        ],
        sections: [
            {
                heading: 'Flow first, then placement',
                body: [
                    'Machines are positioned against the process sequence and the material route, not against the shape of the building. Incoming stock, work in progress and finished goods each get a defined path, and those paths are kept from crossing — on the Solapur machining campus, raw material entered the machine shop from the warehouse side, moved through lines L#01 to L#10, and finished parts left by an entirely separate route, because contamination on precision components is a quality failure.',
                    'Operator positions, inspection points, tool storage and scrap removal are placed in the same exercise. They are what determine whether the layout works on a Tuesday afternoon, and they are what a purely equipment-driven layout leaves out.',
                ],
            },
            {
                heading: 'Clearances people actually need',
                body: [
                    'Maintenance access, door swings, guard opening, chip conveyor withdrawal, pallet turning circles and forklift aisles are set from the real equipment drawings rather than a nominal gap. The common failure is a layout that satisfies the machine footprint and leaves no room to pull a spindle or turn a stacker.',
                    'Statutory clearances — gangway widths, fire escape routes, electrical panel working space — are checked at the same time, because retro-fitting them means moving machines that are already grouted down.',
                ],
            },
            {
                heading: 'Floor loading and future handling',
                body: [
                    'Layout and floor specification are the same decision. We work from the equipment schedule — machine weights, footprints, dynamic loads and vibration sensitivity — to a uniformly distributed load and a puncture load per footprint. On the Solapur facility that produced 5 MT UDL plus 8 MT puncture load with a laser-screeded FM II finish, appropriate to precision equipment rather than general industrial traffic.',
                    'Provision for what you will add later belongs in the same drawing. A jack beam along each line, service drops at planned positions and spare capacity in the compressed air and power runs cost very little now and are disruptive to add into a running shop floor.',
                ],
            },
        ],
        scope: [
            'Machine placement and line layout against process sequence',
            'Material flow planning — raw material, WIP and finished goods separation',
            'Operator, inspection, tool storage and scrap removal positions',
            'Maintenance, statutory and material-handling clearance verification',
            'Floor loading specification from the real equipment schedule',
            'Floor finish and flatness class specification',
            'Utility drop coordination — power, compressed air, extraction, coolant',
            'Provision for future overhead handling and line reconfiguration',
        ],
        faqs: [
            {
                question: 'We have an existing shop floor. Can you re-plan it without stopping production?',
                answer:
                    'Usually in phases, yes — but it starts with an honest survey, because on an established plant the as-built layout and the drawings have almost always diverged. We then sequence the moves so that each step leaves a workable floor, which normally means the relayout takes longer than a greenfield one and costs far less than the disruption of doing it all at once.',
            },
            {
                question: 'What floor specification do we actually need?',
                answer:
                    'It comes from your machines, not from a standard. Machine weights, footprints, dynamic loads and vibration sensitivity give a uniformly distributed load and a puncture load per footprint, and the slab, reinforcement and finish flatness class are specified against those figures. Over-designing a floor is expensive; under-designing one is expensive later, which is worse.',
            },
            BIM_FAQ,
            COST_FAQ,
        ],
        relatedProject: 'precision-machining-facility-solapur',
        order: 3,
    },

    {
        slug: 'structural-mep-design',
        title: 'Structural & MEP Design',
        shortTitle: 'Structural & MEP',
        seoTitle: 'Vishwakalpa | Industrial Structural & MEP Design',
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
                    'On the Ahmedabad campus that meant a melting platform carrying three 10 MT and one 30 MT EOT cranes plus a 5 MT monorail, with crane rail fixed at 10m inside a 15m clear-height shed so maintenance access stayed workable. Where equipment vendors provide foundation and load data, that becomes a fixed input to the structural model rather than a coordination problem discovered on site.',
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
                heading: 'Power infrastructure with layered redundancy',
                body: [
                    'On a process that cannot be interrupted mid-cycle, single points of failure are a design problem rather than an operations one. The Ahmedabad foundry takes 11 kV HT supply by underground cable to a metering kiosk with CT and PT, through an isolator with earth switch and gantry, into two main HT transformers — with seven internal distribution transformers feeding individual machine areas and four 750 KVA DG sets behind them, each with a dedicated diesel tank.',
                    'That layering is specified against what a stoppage actually costs you, which is a different calculation for a melting furnace than for an assembly line.',
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
        order: 4,
    },

    {
        slug: 'bim-3d-modeling',
        title: 'BIM, 3D Modelling & Visualization',
        shortTitle: 'BIM & Visualization',
        seoTitle: 'Vishwakalpa | BIM & 3D Visualization for Industry',
        seoDescription:
            'BIM-integrated design with clash detection across structure, services and process equipment. LOD 200-500 deliverables, renders and walkthroughs.',
        heading:
            'Build it once in the model, so you do not build it twice on site.',
        cardDescription:
            'Clash detection across structure, services and equipment. LOD 200–500, photorealistic renders and walkthroughs.',
        intro: [
            'Every project we take on is modelled before construction begins. This is the firm\'s core differentiator and the mechanism behind the 10–15% construction cost saving we quote — not a general claim about technology, but the accumulated cost of conflicts that never reached site.',
            'A crane runway crossing a duct route, a machine foundation clashing with a drainage run, a service drop landing inside a machine footprint: each of these costs an afternoon to resolve in a model. On site, each costs rework, a variation order and programme.',
        ],
        sections: [
            {
                heading: 'Clash detection is where the saving is',
                body: [
                    'Structure, services and process equipment are modelled together and checked against each other before anything is procured. Vendor equipment drawings are brought into the same model, so foundation positions, utility connection points and maintenance clearances are verified against the building rather than assumed.',
                    'The clashes worth catching are rarely the obvious ones. They are the maintenance access that disappears once the cable tray is routed, or the crane hook approach that cannot reach the furnace because a duct was moved 400mm during detailing.',
                ],
            },
            {
                heading: 'LOD 200 to 500, matched to the decision being made',
                body: [
                    'Modelling to a higher level of detail than a decision requires is wasted effort, and modelling to a lower one gives false confidence. Concept-stage massing and zoning sit at LOD 200; coordination and clash detection at LOD 300–350; fabrication-level detail and as-built records at LOD 400–500.',
                    'The deliverable is agreed against what you actually need it for — coordination, procurement, fabrication, or handover to a facilities team who will still be using it in ten years.',
                ],
            },
            {
                heading: 'Visualization that answers a question',
                body: [
                    'Photorealistic renders and walkthrough animations are produced from the same model as the drawings, so what you show a board, a lender or an OEM customer is the building that will actually be built rather than an artist\'s impression of it.',
                    'They are also genuinely useful internally. Walking a production manager through a model before the foundation is poured surfaces process objections while they are still free to act on.',
                ],
            },
        ],
        scope: [
            '3D modelling and BIM coordination across all disciplines',
            'Clash detection between structure, services and process equipment',
            'Vendor equipment integration into the coordinated model',
            'LOD 200–500 deliverables matched to project stage',
            'Drawing production from the coordinated model',
            'Photorealistic renders for stakeholder and customer presentation',
            'Walkthrough animations and process flow visualization',
            'As-built model handover for facilities management',
        ],
        faqs: [
            {
                question: 'Where does the 10–15% saving actually come from?',
                answer:
                    'Conflicts resolved before procurement rather than after installation. A clash found in the model costs drafting time; the same clash found on site costs rework, a variation, and usually programme. It also comes from quantities taken off a coordinated model rather than estimated, which reduces both over-ordering and mid-project surprises. It is not a discount on construction — it is avoided waste.',
            },
            {
                question: 'We already have a contractor doing shop drawings. Is BIM duplicating that?',
                answer:
                    'No, and the sequence matters. Shop drawings are produced per trade, after award, by parties with no visibility of each other. Coordination modelling happens before that and across all of them, which is precisely where inter-trade clashes live. The model then makes the shop drawings faster and less contentious rather than replacing them.',
            },
            {
                question: 'Can you model an existing plant we did not design?',
                answer:
                    'Yes. It begins with a measured survey, because on an established facility the as-built condition and the original drawings have almost always diverged. That model is worth having before any expansion or relayout — it is the difference between designing against the building you have and the building you think you have.',
            },
            COST_FAQ,
        ],
        relatedProject: 'foundry-campus-ahmedabad',
        order: 5,
    },

    {
        slug: 'industrial-pmc',
        title: 'Industrial Project Management',
        shortTitle: 'Project Management',
        seoTitle: 'Vishwakalpa | Industrial PMC & Project Management',
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
        order: 6,
    },
];

export const servicesByOrder = [...services].sort((a, b) => a.order - b.order);

export function getService(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
