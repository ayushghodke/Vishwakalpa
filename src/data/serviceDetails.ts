export interface ServiceDetailType {
    title: string;
    heading: string;
    description: string;
    scope: string[];
}

export const serviceDetails: Record<string, ServiceDetailType> = {
    'architecture-design': {
        title: 'Architecture & Design',
        heading: 'We deliver context-driven architectural solutions across residential, commercial, institutional, and industrial sectors.',
        description: 'Our approach integrates concept development, detailed design, coordination, and regulatory compliance to create functional, sustainable, and future-ready spaces.',
        scope: [
            'Concept & schematic design',
            'Detailed working drawings',
            'Building approvals & compliance',
            'Design coordination & execution support'
        ]
    },
    'urban-planning': {
        title: 'Urban Planning',
        heading: 'We undertake large-scale urban and campus planning projects with a focus on functionality, circulation, infrastructure integration, and long-term viability.',
        description: 'From township layouts to mixed-use developments, we design structured, efficient, and regulation-aligned master plans.',
        scope: [
            'Zoning & land-use planning',
            'Township & campus planning',
            'Circulation & infrastructure planning',
            'Statutory planning support'
        ]
    },
    'project-management': {
        title: 'Project Management',
        heading: 'We provide end-to-end project oversight from concept to completion, ensuring coordination, quality control, cost efficiency, and timely delivery.',
        description: 'Our integrated management approach minimizes risks and streamlines execution.',
        scope: [
            'Project planning & scheduling',
            'Consultant coordination',
            'Site monitoring & reporting',
            'Quality and compliance tracking'
        ]
    },
    'bim-3d-modeling': {
        title: 'BIM, 3D Modelling & Visualization',
        heading: 'We leverage BIM-enabled workflows to enhance design coordination, reduce clashes, and improve execution accuracy.',
        description: 'Our visualization services communicate design intent clearly to stakeholders through high-quality renders and walkthroughs.',
        scope: [
            '3D modeling & BIM coordination',
            'LOD 200–500 deliverables',
            'Photorealistic renders',
            'Walkthrough animations'
        ]
    },
    'structural-mep': {
        title: 'Structural & MEP Design',
        heading: 'We deliver integrated structural and MEP engineering solutions to ensure safety, performance, and constructability.',
        description: 'Our coordination-driven approach minimizes on-site conflicts and enhances operational efficiency.',
        scope: [
            'Structural design & detailing',
            'HVAC, electrical & plumbing systems',
            'Firefighting systems',
            'Multi-disciplinary coordination'
        ]
    }
};
