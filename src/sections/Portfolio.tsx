import { useState, useEffect } from 'react';
import './Portfolio.css';
import contentData from '../assets/content.json';

type Category = 'residential' | 'commercial' | 'institutional' | 'industrial' | 'urban-planning';

// Portfolio Card Component with Image Carousel
const PortfolioCard = ({ project, images }: { project: any; images: string[] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-carousel effect
    useEffect(() => {
        if (images.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [images.length, isPaused]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="portfolio-card animate-fade-in"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="portfolio-image">
                <img
                    src={images[currentImageIndex]}
                    alt={`${project.name} - Image ${currentImageIndex + 1}`}
                    loading="lazy"
                />

                {/* Image navigation arrows - only show if multiple images */}
                {images.length > 1 && (
                    <>
                        <button
                            className="image-nav-btn prev"
                            onClick={prevImage}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            className="image-nav-btn next"
                            onClick={nextImage}
                            aria-label="Next image"
                        >
                            ›
                        </button>

                        {/* Image indicators */}
                        <div className="image-indicators">
                            {images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(idx)}
                                />
                            ))}
                        </div>
                    </>
                )}

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
        // Residential projects (3 projects from 3 folders)
        if (category === 'residential') {
            if (projectName.includes('Complex 1')) {
                return ['/images/portfolio/residential/building-1.jpg'];
            } else if (projectName.includes('Complex 2')) {
                return ['/images/portfolio/residential/building-2.jpg'];
            } else if (projectName.includes('Bungalow')) {
                return [
                    '/images/portfolio/residential/dallas-1.jpg',
                    '/images/portfolio/residential/dallas-2.jpg',
                    '/images/portfolio/residential/dallas-3.jpg',
                    '/images/portfolio/residential/bungalow-concept.jpg'
                ];
            }
        }

        // Industrial projects (2 projects from 2 folders)
        if (category === 'industrial') {
            if (projectName.includes('Industrial Development 1')) {
                return ['/images/portfolio/industrial/industry-1.jpg'];
            } else if (projectName.includes('Pharmaceutical')) {
                return [
                    '/images/portfolio/industrial/pharma-2.jpg',
                    '/images/portfolio/industrial/pharma-3.jpg',
                    '/images/portfolio/industrial/pharma-4.jpg',
                    '/images/portfolio/industrial/pharma-5.jpg',
                    '/images/portfolio/industrial/pharma-external.jpg'
                ];
            }
        }

        // Urban Planning (2 projects from 2 folders)
        if (category === 'urban-planning') {
            if (projectName.includes('Area Development')) {
                return [
                    '/images/portfolio/urban-planning/area-dev-1.jpg',
                    '/images/portfolio/urban-planning/area-dev-2.jpg',
                    '/images/portfolio/urban-planning/area-dev-3.jpg',
                    '/images/portfolio/urban-planning/area-dev-4.jpg'
                ];
            } else if (projectName.includes('Transport')) {
                return [
                    '/images/portfolio/urban-planning/transport-2.jpg',
                    '/images/portfolio/urban-planning/transport-3.jpg'
                ];
            }
        }

        // Institutional
        if (category === 'institutional') {
            return ['/images/portfolio/institutional.jpg'];
        }

        // Commercial
        if (category === 'commercial') {
            return ['/images/portfolio/portfolio-primary.jpg'];
        }

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
                                images={images}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
