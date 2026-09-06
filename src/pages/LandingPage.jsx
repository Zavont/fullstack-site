import React from 'react';
import QuickAccessCard from '../components/ui/QuickAccessCard';

export default function LandingPage() {

    const quickCards = [
        {
            topicKey: 'react',
            badge: 'React',
            title: 'Frontend Core',
            description: 'Construct complex, stateful modular components with high-performance hooks.',
            themeColor: '#3b82f6',
            glowColor: 'rgba(59, 130, 246, 0.12)',
            iconSvg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                </svg>
            )
        },
        {
            topicKey: 'springboot',
            badge: 'Spring Boot',
            title: 'Backend Architecture',
            description: 'Implement microservices and production APIs using robust Java dependency injection.',
            themeColor: '#10b981',
            glowColor: 'rgba(16, 185, 129, 0.12)',
            iconSvg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            )
        },
        {
            topicKey: 'sql',
            badge: 'SQL',
            title: 'Relational Database',
            description: 'Optimize join indices and design normalized schemas to store records efficiently.',
            themeColor: '#3b82f6',
            glowColor: 'rgba(59, 130, 246, 0.12)',
            iconSvg: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
            )
        }
    ];

    const projects = [
        {
            tech: 'HTML + CSS + JS',
            title: 'Portfolio Website',
            desc: 'A personal portfolio website to showcase projects, skills, and contact information with a responsive and modern design.'
        },
        {
            tech: 'Java + PostgreSQL',
            title: 'E-Commerce Catalog API',
            desc: 'Highly scalable e-commerce back-end API utilizing Spring Boot, Spring Security, Hibernate ORM, and query indexing for sub-second database transactions.'
        },
        {
            tech: 'JS + CSS Grid',
            title: 'Interactive Canvas Editor',
            desc: 'A lightweight in-browser template compiler allowing users to test responsive flexbox layouts and customize stylesheets dynamically.'
        }
    ];

    return (
        <div id="landingPage">
            {/* Hero Showcase Section */}
            <main className="hero">
                <span className="badge">Next Generation Syllabus</span>
                <h1>Master the Complete<br /><span>Full Stack Ecosystem</span></h1>
                <p>Interactive playground designed to learn and practice modern technologies. Select a topic from the navigation dropdowns or explore the quick starts below.</p>

                {/* Quick Access Grid */}
                <div className="quick-access">
                    {quickCards.map((card, idx) => (
                        <QuickAccessCard key={idx} {...card} />
                    ))}
                </div>
            </main>

            {/* Projects Section */}
            <section className="projects-section" id="projects">
                <div className="section-header">
                    <span className="badge">Portfolio Showcase</span>
                    <h2>Featured Projects</h2>
                    <p>See how frontend and backend technologies integrate into production systems.</p>
                </div>
                <div className="projects-grid">
                    {projects.map((proj, idx) => (
                        <div className="project-card" key={idx}>
                            <div className="project-content">
                                <span className="project-tech">{proj.tech}</span>
                                <h3>{proj.title}</h3>
                                <p>{proj.desc}</p>
                                <div className="project-links">
                                    <a href="https://github.com" target="_blank" rel="noreferrer" className="project-link">
                                        GitHub
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round" className="external-icon">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
