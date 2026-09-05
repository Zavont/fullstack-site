import React from 'react';
import QuickAccessCard from '../components/ui/QuickAccessCard';
import CodeBlock from '../components/ui/CodeBlock';
import { useCourse } from '../context/CourseContext';

export default function LandingPage() {
    const { activeTopic, selectTopic } = useCourse();

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

            {/* Sandbox Section */}
            <section className="sandbox-section" id="sandbox">
                <div className="sandbox-container" style={{ '--theme-color': activeTopic?.themeColor || 'var(--primary)' }}>
                    {/* Sandbox Left details */}
                    <div className="sandbox-details">
                        <div className="sandbox-header">
                            <span className="sandbox-category">{activeTopic?.category}</span>
                            <h2 className="sandbox-title">{activeTopic?.title || 'Interactive Sandbox'}</h2>
                            <p className="sandbox-desc">
                                {activeTopic?.description || 'Select any frontend or backend language from the navbar list to view interactive code workspaces and custom concepts.'}
                            </p>
                        </div>

                        <div className="concepts-group">
                            <h4 className="concepts-title">Key Core Concepts</h4>
                            <div className="concepts-tags">
                                {activeTopic?.tags ? activeTopic.tags.map(tag => (
                                    <span key={tag} className="concept-tag">{tag}</span>
                                )) : (
                                    <>
                                        <span className="concept-tag">Web Standards</span>
                                        <span className="concept-tag">Interactive playgrounds</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="interactive-quiz">
                            <h4 className="concepts-title" style={{ marginBottom: '0.5rem' }}>Topic Quick Quiz</h4>
                            <div>
                                {activeTopic?.quiz ? (
                                    <div className="quiz-card">
                                        <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem' }}>{activeTopic.quiz.question}</p>
                                        <div className="quiz-options">
                                            {activeTopic.quiz.options.map((opt, i) => (
                                                <button key={i} className="quiz-option" onClick={(e) => {
                                                    const target = e.currentTarget;
                                                    if(opt.isCorrect) {
                                                        target.classList.add('correct');
                                                    } else {
                                                        target.classList.add('incorrect');
                                                    }
                                                }}>
                                                    {opt.text}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Select a course topic to load quiz assessment.</p>
                                )}
                            </div>
                        </div>

                        <div className="sandbox-actions">
                            <button className="btn btn-primary" onClick={() => {
                                const keys = ['html', 'css', 'js', 'react', 'java', 'springboot', 'sql'];
                                const currIdx = keys.indexOf(activeTopic?.filename ? Object.keys(activeTopic).find(key => activeTopic[key] === activeTopic) : 'html');
                                const nextKey = keys[(currIdx + 1) % keys.length];
                                selectTopic(nextKey);
                            }}>
                                Next Lesson
                            </button>
                            <button className="btn btn-secondary" onClick={() => window.open('https://github.com', '_blank')}>
                                Docs
                            </button>
                        </div>
                    </div>

                    {/* Sandbox Right code preview */}
                    <CodeBlock 
                        filename={activeTopic?.filename || 'workspace'} 
                        codeHtml={activeTopic?.code || 'Select a topic from the header...'} 
                        rawCode={activeTopic?.rawCode || ''}
                    />
                </div>
            </section>

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
