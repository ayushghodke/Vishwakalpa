import { useState } from 'react';
import './Portfolio.css';
import contentData from '../assets/content.json';

type Category = 'all' | 'mixed-use' | 'residential' | 'industrial' | 'urban-planning';

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

    const projectImages: Record<string, string> = {
        'mixed-use': '/images/portfolio/portfolio-primary.jpg',
        'residential': '/images/portfolio/portfolio-primary.jpg',
        'industrial': '/images/portfolio/ethiopia-pharma.jpg',
        'urban-planning': '/images/portfolio/portfolio-primary.jpg'
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
                </div>

                {/* Portfolio Grid */}
                <div className="portfolio-grid">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="portfolio-card animate-fade-in">
                            <div className="portfolio-image">
                                <img
                                    src={projectImages[project.category as keyof typeof projectImages]}
                                    alt={project.name}
                                    loading="lazy"
                                />
                                <div className="portfolio-overlay glass-overlay">
                                    <div className="portfolio-content">
                                        <span className="portfolio-category">{project.categoryTitle}</span>
                                        <h3>{project.name}</h3>
                                        {project.location && <p className="project-location">📍 {project.location}</p>}
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
