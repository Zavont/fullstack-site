import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';

export default function CoursePage() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { 
        topics, 
        selectTopic, 
        selectedTopicKey, 
        courseData, 
        isLoading, 
        error, 
        isSidebarOpen, 
        toggleSidebar,
        closeSidebar 
    } = useCourse();

    const [openSections, setOpenSections] = React.useState({});

    // Group topics by section
    const groupedTopics = React.useMemo(() => {
        if (!courseData?.topics) return {};
        const groups = {};
        courseData.topics.forEach((topic) => {
            const sec = topic.section || "General Topics";
            if (!groups[sec]) groups[sec] = [];
            groups[sec].push(topic);
        });
        return groups;
    }, [courseData]);

    const toggleSection = (secName) => {
        setOpenSections(prev => {
            // Accordion behavior: close others
            const nextState = {}; 
            Object.keys(prev).forEach(k => nextState[k] = false);
            
            // Toggle the clicked one
            nextState[secName] = !prev[secName];
            
            return nextState;
        });
    };

    // Ensure the correct topic is selected in context if URL changes directly
    useEffect(() => {
        if (topicId && topics[topicId] && topicId !== selectedTopicKey) {
            selectTopic(topicId);
        } else if (!topics[topicId]) {
            // redirect to home if invalid topic
            navigate('/');
        }
    }, [topicId, selectedTopicKey, selectTopic, topics, navigate]);

    // Handle Previous/Next
    const topicKeys = Object.keys(topics);
    const currentIndex = topicKeys.indexOf(selectedTopicKey);
    
    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevKey = topicKeys[currentIndex - 1];
            selectTopic(prevKey);
            navigate(`/course/${prevKey}`);
        }
    };

    const handleNext = () => {
        if (currentIndex < topicKeys.length - 1) {
            const nextKey = topicKeys[currentIndex + 1];
            selectTopic(nextKey);
            navigate(`/course/${nextKey}`);
        }
    };

    const handleSidebarItemClick = (e, topicId) => {
        e.preventDefault();
        const section = document.getElementById(topicId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        closeSidebar();
    };

    if (isLoading) {
        return (
            <div className="course-layout">
                <main className="course-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="loader" style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="course-layout">
                <main className="course-main" style={{ padding: '2rem' }}>
                    <h2>Error loading course data</h2>
                    <p style={{ color: 'var(--danger, red)' }}>{error}</p>
                </main>
            </div>
        );
    }

    return (
        <div className="course-layout">
            {/* Overlay for mobile sidebar */}
            <div 
                className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} 
                onClick={closeSidebar}
            ></div>
            
            <aside className={`course-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3 className="sidebar-title">{courseData?.language || 'Topics'}</h3>
                </div>
                <ul className="sidebar-list">
                    {Object.entries(groupedTopics).map(([secName, groupTopics]) => {
                        // By default, if openSections[secName] is undefined, we could treat it as closed,
                        // The user requested that the menu should show main topics only first,
                        // and only expand to show subtopics when clicked.
                        const isOpen = openSections[secName] ?? false; 

                        return (
                            <li key={secName} className={`sidebar-section ${isOpen ? 'open' : ''}`}>
                                <div className="sidebar-section-header" onClick={() => toggleSection(secName)}>
                                    <span>{secName}</span>
                                    <svg className="section-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                                <ul className="sidebar-subtopics">
                                    {groupTopics.map((topic, index) => (
                                        <li className="sidebar-item" key={topic.id || index}>
                                            <a 
                                                href={`#${topic.id}`} 
                                                className="sidebar-link" 
                                                onClick={(e) => handleSidebarItemClick(e, topic.id)}
                                            >
                                                {topic.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </aside>
            
            <main className="course-main">
                <div className="course-content-container">
                    <div>
                        {courseData?.topics?.map((topic, index) => (
                            <section id={topic.id} key={topic.id || index} style={{ marginBottom: '4rem' }}>
                                <div dangerouslySetInnerHTML={{ __html: topic.content }} />
                            </section>
                        ))}
                    </div>

                    <div className="course-actions">
                        <button 
                            className="btn btn-secondary" 
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            style={{ opacity: currentIndex === 0 ? 0.5 : 1, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
                        >
                            &larr; Previous Topic
                        </button>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleNext}
                            disabled={currentIndex === topicKeys.length - 1}
                            style={{ opacity: currentIndex === topicKeys.length - 1 ? 0.5 : 1, cursor: currentIndex === topicKeys.length - 1 ? 'not-allowed' : 'pointer' }}
                        >
                            Next Topic &rarr;
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
