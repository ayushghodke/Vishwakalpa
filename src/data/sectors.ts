import {
    Car,
    CircuitBoard,
    Warehouse,
    Building2,
    Wheat,
    FlaskConical,
    Factory,
    Plane,
    Server,
    Leaf,
    LandPlot,
    Recycle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ============================================
// INDUSTRY SECTORS
// Single source of truth for the "Industries We Serve" grid.
//
// To add a missing image later:
//   1. Drop the source PNG into public/images/sectors/<id>.png
//   2. Add a matching row to scripts/optimize-images.mjs
//   3. Run `node scripts/optimize-images.mjs`, then delete the PNG
//   4. Change `image: null` below to '/images/sectors/<id>.webp'
// ============================================

export interface Sector {
    id: string;
    number: string;
    title: string;
    tagline: string;
    services: [string, string, string, string];
    /** null renders the branded gradient placeholder card instead of a photo */
    image: string | null;
    icon: LucideIcon;
}

export const sectors: Sector[] = [
    {
        id: 'automotive-ev',
        number: '01',
        title: 'Automotive & EV',
        tagline: 'Purpose-built facilities for next-generation vehicle manufacturing.',
        services: [
            'Assembly line layout and EV battery zone planning',
            'High-voltage infrastructure and safety compliance design',
            'Logistics flow, truck docks, and material handling integration',
            'Facade, landscaping, and OEM-grade campus presentation'
        ],
        image: '/images/sectors/automotive-ev.webp',
        icon: Car
    },
    {
        id: 'electronics-semiconductors',
        number: '02',
        title: 'Electronics & Semiconductors',
        tagline: 'Precision environments for sensitive and high-tech manufacturing.',
        services: [
            'Cleanroom zoning and contamination control planning',
            'Static-free flooring and ESD-compliant facility design',
            'Power redundancy and UPS infrastructure coordination',
            'IGBC-compliant sustainable facility design'
        ],
        image: '/images/sectors/electronics-semiconductors.webp',
        icon: CircuitBoard
    },
    {
        id: 'warehousing-logistics',
        number: '03',
        title: 'Warehousing & Logistics',
        tagline: 'High-capacity, operationally optimized storage and distribution facilities.',
        services: [
            'Clear-height optimization and racking layout coordination',
            'Dock leveler, truck bay, and circulation planning',
            'Fire suppression, sprinkler zoning, and statutory compliance',
            'Office and admin block integration within warehouse campuses'
        ],
        image: '/images/sectors/warehousing-logistics.webp',
        icon: Warehouse
    },
    {
        id: 'multi-tenant-campus',
        number: '04',
        title: 'Multi-tenant Manufacturing Campus',
        tagline: 'Shared infrastructure, individual identity — designed for growth.',
        services: [
            'Master planning for multi-unit industrial campuses',
            'Shared utility corridors, roads, and common amenity blocks',
            'Scalable plot layouts with flexible expansion options',
            'Security, entry management, and campus identity design'
        ],
        image: '/images/sectors/multi-tenant-campus.webp',
        icon: Building2
    },
    {
        id: 'food-processing',
        number: '05',
        title: 'Food Processing',
        tagline: 'Hygienic, high-throughput facilities built for speed and compliance.',
        services: [
            'FSSAI and food-grade facility design standards',
            'Cold chain integration and processing zone separation',
            'Natural light, ventilation, and worker comfort design',
            'Waste management and effluent treatment planning'
        ],
        image: '/images/sectors/food-processing.webp',
        icon: Wheat
    },
    {
        id: 'pharmaceuticals',
        number: '06',
        title: 'Pharmaceuticals',
        tagline: 'Precision environments that meet GMP regulatory and operational standards.',
        services: [
            'GMP-compliant facility layout and cleanroom zoning',
            'HVAC, validation corridor, and utility integration planning',
            'Fire safety and hazardous material handling compliance',
            'IGBC green certification for pharma campuses'
        ],
        image: '/images/sectors/pharmaceuticals.webp',
        icon: FlaskConical
    },
    {
        // NOTE: copy below is a draft — no source content was supplied for this
        // sector. Safe to reword without touching any other file.
        id: 'heavy-engineering-manufacturing',
        number: '07',
        title: 'Heavy Engineering & Manufacturing',
        tagline: 'Heavy-load, large-span facilities engineered for industrial-scale production.',
        services: [
            'Heavy machine foundation and high-load flooring design',
            'Large-span structural bays and EOT crane integration',
            'Fabrication, welding, and assembly zone layout planning',
            'Utility, compressed air, and power distribution coordination'
        ],
        image: '/images/sectors/heavy-engineering-manufacturing.webp',
        icon: Factory
    },
    {
        // Merged from the separate "Precision Engineering" and
        // "Aerospace & Defense" source blocks — best four of the eight services.
        id: 'precision-aerospace-defense',
        number: '08',
        title: 'Precision, Aerospace & Defense',
        tagline: 'Secure, vibration-controlled environments for high-tolerance manufacturing.',
        services: [
            'Anti-vibration flooring and precision machine foundation design',
            'Temperature and humidity-controlled shop floor planning',
            'Large-span hangar design with security zoning and access control',
            'Compliance with defense establishment and statutory norms'
        ],
        image: null,
        icon: Plane
    },
    {
        id: 'data-centers',
        number: '09',
        title: 'Data Centers',
        tagline: 'Mission-critical facilities designed for maximum uptime and scalability.',
        services: [
            'Raised floor, hot/cold aisle, and server room planning',
            'Power and cooling redundancy (N+1, 2N) coordination',
            'Fire suppression and multi-tier security zone design',
            'Facade and landscape design for corporate data parks'
        ],
        image: null,
        icon: Server
    },
    {
        id: 'renewable-energy-biofuels',
        number: '10',
        title: 'Renewable Energy & Biofuels',
        tagline: "Industrial infrastructure for India's clean energy transition.",
        services: [
            'Solar panel assembly plant and storage facility design',
            'Biofuel processing zone and feedstock storage planning',
            'Safety compliance for flammable material environments',
            'IGBC green building integration and certification support'
        ],
        image: null,
        icon: Leaf
    },
    {
        id: 'industrial-parks',
        number: '11',
        title: 'Industrial Parks',
        tagline: 'End-to-end master planning for organized and compliant industrial zones.',
        services: [
            'Site master plan with plot demarcation and road network',
            'Utility infrastructure — power, water, drainage, telecom',
            'Common facilities — admin, security, canteen, fire station',
            'MIDC and statutory layout approval coordination'
        ],
        image: null,
        icon: LandPlot
    },
    {
        id: 'plastics-recycling-textiles',
        number: '12',
        title: 'Plastics, Recycling & Textiles',
        tagline: 'Sustainable processing facilities built for circular economy operations.',
        services: [
            'Sorting, shredding, and processing zone layout design',
            'Ventilation and dust control for polymer environments',
            'Effluent treatment and waste segregation planning',
            'IGBC compliance and green landscaping integration'
        ],
        image: null,
        icon: Recycle
    }
];
