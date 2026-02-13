import { useState } from 'react';
import './Portfolio.css';
import contentData from '../assets/content.json';

type Category = 'residential' | 'commercial' | 'institutional' | 'industrial' | 'urban-planning';

// Portfolio Card Component - Single Image
const PortfolioCard = ({ project, image }: { project: any; image: string }) => {
    return (
        <div className="portfolio-card animate-fade-in">
            <div className="portfolio-image">
                <img
                    src={image}
                    alt={project.name}
                    loading="lazy"
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
    const [activeCategory, setActiveCategory] = useState<Category>('residential');

    const portfolioData = contentData.portfolio.categories;

    const projects = portfolioData.flatMap(category =>
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

        // Residential projects
        if (cat === 'residential' || cat.includes('residen')) {
            if (name.includes('complex 1')) {
                return ['/images/portfolio/residential/building-1.jpg'];
            } else if (name.includes('complex 2')) {
                return ['/images/portfolio/residential/building-2.jpg'];
            } else if (name.includes('bungalow')) {
                return [
                    '/images/portfolio/residential/dallas-1.jpg',
                    '/images/portfolio/residential/dallas-2.jpg',
                    '/images/portfolio/residential/dallas-3.jpg',
                    '/images/portfolio/residential/bungalow-concept.jpg'
                ];
            }
        }

        // Industrial projects
        if (cat === 'industrial') {
            if (name.includes('development 1')) {
                return ['/images/portfolio/industrial/industry-1.jpg'];
            } else if (name.includes('pharma')) {
                return [
                    '/images/portfolio/industrial/pharma-2.jpg',
                    '/images/portfolio/industrial/pharma-3.jpg',
                    '/images/portfolio/industrial/pharma-4.jpg',
                    '/images/portfolio/industrial/pharma-5.jpg',
                    '/images/portfolio/industrial/pharma-external.jpg'
                ];
            }
        }

        // Urban Planning
        if (cat === 'urban-planning') {
            if (name.includes('area')) {
                return [
                    '/images/portfolio/urban-planning/area-dev-1.jpg',
                    '/images/portfolio/urban-planning/area-dev-2.jpg',
                    '/images/portfolio/urban-planning/area-dev-3.jpg',
                    '/images/portfolio/urban-planning/area-dev-4.jpg'
                ];
            } else if (name.includes('transport') || name.includes('sai chowk')) {
                return [
                    '/images/portfolio/urban-planning/transport-2.jpg',
                    '/images/portfolio/urban-planning/transport-3.jpg'
                ];
            }
        }

        // Institutional
        if (cat === 'institutional') {
            return ['/images/portfolio/institutional.jpg'];
        }

        // Commercial
        if (cat === 'commercial') {
            return ['/images/portfolio/portfolio-primary.jpg'];
        }

        // Fallback for everything else
        return ['/images/portfolio/portfolio-primary.jpg'];
    };

    return (
        <section id="portfolio" className="section-lg">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">Our <span className="accent-gradient-text">Portfolio</span></h2>
                    <p className="text-gray mb-8">
                        Transforming visions into architectural excellence
                    </p>
                </div>

                {/* Category Filter */}
                <div className="portfolio-filter">
                    <button
                        className={`filter-btn ${activeCategory === 'residential' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('residential')}
                    >
                        Residential
                    </button>
                    <button
                        className={`filter-btn ${activeCategory === 'commercial' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('commercial')}
                    >
                        Commercial
                    </button>
                    <button
                        className={`filter-btn ${activeCategory === 'institutional' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('institutional')}
                    >
                        Institutional
                    </button>
                    <button
                        className={`filter-btn ${activeCategory === 'industrial' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('industrial')}
                    >
                        Industrial
                    </button>
                    <button
                        className={`filter-btn ${activeCategory === 'urban-planning' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('urban-planning')}
                    >
                        Urban Planning
                    </button>
                </div>

                {/* Portfolio Grid */}
                <div className="portfolio-grid">
                    {filteredProjects.map((project, projectIndex) => {
                        const images = getProjectImages(project.name, project.category);
                        return (
                            <PortfolioCard
                                key={projectIndex}
                                project={project}
                                image={images[0]}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
