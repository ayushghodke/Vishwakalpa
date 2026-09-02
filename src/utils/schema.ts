// ============================================
// JSON-LD STRUCTURED DATA
//
// Replaces the single hardcoded Organization block that used to sit in
// index.html. Three things were wrong with it: the type was too generic for a
// firm with a physical office, there was no @id so nothing else could reference
// it, and there was no sameAs at all — meaning Google had no way to connect the
// website to the company's social profiles or its Business Profile.
//
// ProfessionalService is a subtype of LocalBusiness, which is what unlocks the
// local-search signals a Pune consultancy actually competes on.
// ============================================

import { SITE_URL, company, sameAs } from '../data/company';
import type { Service } from '../data/services';
import type { TeamMember } from '../data/team';
import type { Project } from '../data/projects';
import type { BlogPost } from '../data/blogs';
import { clientLabel } from '../data/projects';


/** Stable identifier every other node points at, so Google reads one entity
 *  rather than a scattering of unrelated mentions. */
const ORG_ID = `${SITE_URL}/#organization`;

const postalAddress = {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: `${company.address.locality}, ${company.address.city}`,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
};

export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': ORG_ID,
        name: company.legalName,
        legalName: company.legalName,
        alternateName: company.shortName,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/Logo.webp`,
        image: `${SITE_URL}/images/hero/mmlp-new.webp`,
        description:
            'Industrial design and project management consultancy specialising in foundries, factories and manufacturing campuses. Master planning, architecture, structural design and PMC.',
        foundingDate: String(company.foundedYear),
        numberOfEmployees: { '@type': 'QuantitativeValue', value: company.employeeCount },
        address: postalAddress,
        telephone: company.phone,
        email: company.email,
        sameAs,
        identifier: [
            { '@type': 'PropertyValue', name: 'CIN', value: company.identifiers.cin },
            { '@type': 'PropertyValue', name: 'GSTIN', value: company.identifiers.gstin },
        ],
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: company.openingHours.days,
                opens: company.openingHours.opens,
                closes: company.openingHours.closes,
            },
        ],
        areaServed: company.areaServed.map((name) => ({
            '@type': 'AdministrativeArea',
            name,
        })),
        knowsAbout: [
            'Foundry design',
            'Industrial master planning',
            'Factory design',
            'Precision machining facility design',
            'Industrial project management',
            'Industrial structural engineering',
        ],
        // Emitted only once real coordinates are supplied from the Google
        // Business Profile. A guessed pin is worse than none — it can conflict
        // with the listing's own location.
        ...(company.geo
            ? {
                  geo: {
                      '@type': 'GeoCoordinates',
                      latitude: company.geo.latitude,
                      longitude: company.geo.longitude,
                  },
              }
            : {}),
    };
}

export function serviceSchema(service: Service) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_URL}/services/${service.slug}#service`,
        name: service.title,
        description: service.seoDescription,
        serviceType: service.title,
        provider: { '@id': ORG_ID },
        areaServed: company.areaServed.map((name) => ({
            '@type': 'AdministrativeArea',
            name,
        })),
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${service.title} scope`,
            itemListElement: service.scope.map((item) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: item },
            })),
        },
    };
}

/**
 * FAQPage markup.
 *
 * Worth setting expectations honestly: Google restricted rich FAQ results to
 * government and health sites in 2023, so these will not render as expandable
 * boxes in search for an engineering consultancy. They are still worth having —
 * they answer real buyer objections on the page, they keep people reading, and
 * they are what AI answer engines quote when asked for a recommendation.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${SITE_URL}${crumb.path === '/' ? '/' : crumb.path}`,
        })),
    };
}

/**
 * Person nodes for the team page.
 *
 * This is the highest-leverage schema on the site. Google gives a substantial
 * advantage to pages that demonstrably have real, qualified people behind them,
 * and the old site named nobody at all.
 */
export function personSchema(member: TeamMember) {
    return {
        '@type': 'Person',
        '@id': `${SITE_URL}/team#${member.id}`,
        name: member.name,
        jobTitle: member.role,
        description: member.credential,
        worksFor: { '@id': ORG_ID },
        ...(member.qualifications.length
            ? { hasCredential: member.qualifications }
            : {}),
        ...(member.photo ? { image: `${SITE_URL}${member.photo}` } : {}),
    };
}

export function teamPageSchema(members: TeamMember[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: members.map((member, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: personSchema(member),
        })),
    };
}

export function projectSchema(project: Project) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${SITE_URL}/projects/${project.slug}#article`,
        headline: project.title,
        description: project.seoDescription,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        about: {
            '@type': 'Project',
            name: project.title,
            description: `${project.industry} — ${clientLabel(project)}, ${project.city}, ${project.region}`,
            location: {
                '@type': 'Place',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: project.city,
                    addressRegion: project.region,
                    addressCountry: 'IN',
                },
            },
        },
    };
}

export function blogPostingSchema(blog: BlogPost) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blogs/${blog.slug}#article`,
        headline: blog.title,
        description: blog.seoDescription,
        articleSection: blog.category,
        keywords: [blog.primaryKeyword, ...blog.secondaryKeywords].join(', '),
        datePublished: blog.publishedDate,
        dateModified: blog.modifiedDate,
        image: `${SITE_URL}${blog.image}`,
        inLanguage: 'en-IN',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blogs/${blog.slug}`,
        },
        author: {
            '@type': 'Organization',
            '@id': ORG_ID,
            name: blog.author.name,
        },
        publisher: {
            '@type': 'Organization',
            '@id': ORG_ID,
            name: company.legalName,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/Logo.webp`,
            },
        },
    };
}

export function blogListSchema(blogPosts: BlogPost[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/blogs#collection`,
        name: 'Technical Insights & Engineering Guides | Vishwakalpa',
        description:
            'Expert technical guides on industrial facility planning, CNC machine shop layouts, space calculations, and factory design.',
        url: `${SITE_URL}/blogs`,
        publisher: { '@id': ORG_ID },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: blogPosts.map((b, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${SITE_URL}/blogs/${b.slug}`,
                name: b.title,
            })),
        },
    };
}

