import { useState } from 'react';
import './Portfolio.css';
import contentData from '../assets/content.json';

interface PortfolioProject {
    name: string;
    type?: string;
    location?: string;
    image?: string;
    features?: string[];
}

interface PortfolioCategory {
    id: string;
    title: string;
    description: string;
    // Categories default to active when the flag is absent, so older data
    // shapes without the flag still render. Set `active: false` to hide a
    // category from the site without deleting its project data.
    active?: boolean;
    projects: PortfolioProject[];
}

// Portfolio Card Component - Single Image
const PortfolioCard = ({ project, image }: { project: any; image: string }) => {
    const isInProgress = project.name.includes('Website is in progress');

    if (isInProgress || !image) {
        return (
            <div className="portfolio-card in-progress-card animate-fade-in">
                <div className="portfolio-content-centered">
                    <h3 className="in-progress-text">Website is in Progress</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="portfolio-card animate-fade-in">
            <div className="portfolio-image">
                <img
                    src={image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    width="1400"
                    height="933"
                />

                <div className="portfolio-overlay glass-overlay">
                    <div className="portfolio-content">
                        <span className="portfolio-category">{project.categoryTitle}</span>
                        <h3>{project.name}</h3>
                        {project.location && <p className="project-location">📍 {project.location}</p>}
                        <div className="project-features">
                            {(project.features || project.deliverables)?.slice(0, 3).map((feature: string, i: number) => (
                                <span key={i} className="feature-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Portfolio = () => {
    const portfolioData = contentData.portfolio.categories as PortfolioCategory[];
    const activeCategories = portfolioData.filter(category => category.active !== false);

    const [activeCategory, setActiveCategory] = useState<string | undefined>(activeCategories[0]?.id);

    const projects = activeCategories.flatMap(category =>
        category.projects.map(project => ({
            ...project,
            category: category.id,
            categoryTitle: category.title
        }))
    );

    const filteredProjects = projects.filter(p => p.category === activeCategory);

    // Get all images for a project (returns array)
    const getProjectImages = (projectName: string, category: string): string[] => {
        const name = projectName.toLowerCase();
        const cat = category.toLowerCase();

        // If website is in progress, return no image
        if (name.includes('website is in progress')) {
            return [];
        }

        // Residential projects
        if (cat === 'residential' || cat.includes('residen')) {
            if (name.includes('complex 1')) {
                return ['/images/portfolio/residential/building-1.webp'];
            } else if (name.includes('bungalow')) {
                return [
                    '/images/portfolio/residential/dallas-3.webp',
                    '/images/portfolio/residential/dallas-1.webp',
                    '/images/portfolio/residential/dallas-2.webp',
                    '/images/portfolio/residential/bungalow-concept.webp'
                ];
            }
        }

        // Industrial projects
        if (cat === 'industrial') {
            if (name.includes('development 1')) {
                return ['/images/portfolio/industrial/industry-1.webp'];
            } else if (name.includes('pharma')) {
                return [
                    '/images/portfolio/industrial/pharma-external.webp',
                    '/images/portfolio/industrial/pharma-2.webp',
                    '/images/portfolio/industrial/pharma-3.webp',
                    '/images/portfolio/industrial/pharma-4.webp',
                    '/images/portfolio/industrial/pharma-5.webp'
                ];
            }
        }

        // Urban Planning
        if (cat === 'urban-planning') {
            if (name.includes('area')) {
                return [
                    '/images/portfolio/urban-planning/area-dev-1.webp',
                    '/images/portfolio/urban-planning/area-dev-2.webp',
                    '/images/portfolio/urban-planning/area-dev-3.webp',
                    '/images/portfolio/urban-planning/area-dev-4.webp'
                ];
            } else if (name.includes('transport') || name.includes('sai chowk')) {
                return [
                    '/images/portfolio/urban-planning/transport-2.webp',
                    '/images/portfolio/urban-planning/transport-3.webp'
                ];
            }
        }

        // Catch-all fallback
        return ['/images/portfolio/portfolio-primary.webp'];
    };

    return (
        <section id="portfolio" className="section-lg">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">Our <span className="text-primary">Portfolio</span></h2>
                    <p className="text-gray mb-8">
                        Industrial facilities built for performance, compliance, and scale
                    </p>
                </div>

                {/* Category Filter — hidden when only one category is active */}
                {activeCategories.length > 1 && (
                    <div className="portfolio-filter">
                        {activeCategories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Portfolio Grid */}
                <div className="portfolio-grid">
                    {filteredProjects.map((project, projectIndex) => {
                        const images = getProjectImages(project.name, project.category);
                        return (
                            <PortfolioCard
                                key={projectIndex}
                                project={project}
                                image={images[0] || ''}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
