import { useState } from 'react';
import './Portfolio.css';
import contentData from '../assets/content.json';

type Category = 'all' | 'mixed-use' | 'residential' | 'industrial' | 'urban-planning' | 'institutional';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('all');

    const portfolioData = contentData.portfolio.categories;

    const projects = portfolioData.flatMap(category =>
        category.projects.map(project => ({
            ...project,
            category: category.id,
            categoryTitle: category.title
        }))
    );

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    // Multiple images per category for variety
    const categoryImages: Record<string, string[]> = {
        'mixed-use': ['/images/portfolio/portfolio-primary.jpg'],
        'residential': [
            '/images/portfolio/residential/building-1.jpg',
            '/images/portfolio/residential/building-2.jpg',
            '/images/portfolio/residential/dallas-1.jpg',
            '/images/portfolio/residential/dallas-2.jpg',
            '/images/portfolio/residential/dallas-3.jpg',
            '/images/portfolio/residential/bungalow-concept.jpg'
        ],
        'industrial': [
            '/images/portfolio/industrial/pharma-2.jpg',
            '/images/portfolio/industrial/pharma-3.jpg',
            '/images/portfolio/industrial/pharma-4.jpg',
            '/images/portfolio/industrial/pharma-5.jpg',
            '/images/portfolio/industrial/pharma-external.jpg',
            '/images/portfolio/industrial/industry-1.jpg'
        ],
        'urban-planning': [
            '/images/portfolio/urban-planning/area-dev-1.jpg',
            '/images/portfolio/urban-planning/area-dev-2.jpg',
            '/images/portfolio/urban-planning/area-dev-3.jpg',
            '/images/portfolio/urban-planning/area-dev-4.jpg',
            '/images/portfolio/urban-planning/transport-2.jpg',
            '/images/portfolio/urban-planning/transport-3.jpg'
        ],
        'institutional': ['/images/portfolio/institutional.jpg']
    };

    // Get image for a specific project (rotate through available images)
    const getProjectImage = (category: string, index: number): string => {
        const images = categoryImages[category as keyof typeof categoryImages] || [];
        return images[index % images.length] || '/images/portfolio/portfolio-primary.jpg';
    };

    return (
        <section id="portfolio" className="section-lg">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="mb-4">Our <span className="gold-gradient">Portfolio</span></h2>
                    <p className="text-gray mb-8">
                        Transforming visions into architectural excellence
                    </p>
                </div>

                {/* Category Filter */}
                <div className="portfolio-filter">
                    <button
                        className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                    >
                        All Projects
                    </button>
                    <button
                        className={`filter-btn ${activeCategory === 'mixed-use' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('mixed-use')}
                    >
                        Mixed-Use
                    </button>
                    <button
                        className={`filter-btn ${activeCategory === 'residential' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('residential')}
                    >
                        Residential
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
                    <button
                        className={`filter-btn ${activeCategory === 'institutional' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('institutional')}
                    >
                        Institutional
                    </button>
                </div>

                {/* Portfolio Grid */}
                <div className="portfolio-grid">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="portfolio-card animate-fade-in">
                            <div className="portfolio-image">
                                <img
                                    src={getProjectImage(project.category, index)}
                                    alt={project.name}
                                    loading="lazy"
                                />
                                <div className="portfolio-overlay glass-overlay">
                                    <div className="portfolio-content">
                                        <span className="portfolio-category">{project.categoryTitle}</span>
                                        <h3>{project.name}</h3>
                                        {(project as any).location && <p className="project-location">📍 {(project as any).location}</p>}
                                        <div className="project-features">
                                            {((project as any).features || (project as any).deliverables)?.slice(0, 3).map((feature: string, i: number) => (
                                                <span key={i} className="feature-tag">{feature}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
