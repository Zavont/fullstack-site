import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';

export default function Navbar() {
    const { selectTopic, toggleSidebar, isSidebarOpen } = useCourse();
    const navigate = useNavigate();
    const location = useLocation();
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const [activeDropdown, setActiveDropdown] = React.useState(null);
    
    const isCoursePage = location.pathname.startsWith('/course');

    // Auto-close mobile menus on route change
    React.useEffect(() => {
        setIsNavOpen(false);
        setActiveDropdown(null);
    }, [location.pathname]);

    const handleHamburgerClick = () => {
        if (isCoursePage) {
            toggleSidebar();
        } else {
            setIsNavOpen(!isNavOpen);
        }
    };

    const handleTopicClick = (e, topicKey) => {
        e.preventDefault();
        selectTopic(topicKey);
        setIsNavOpen(false); // Close menu on selection
        setActiveDropdown(null); // Close dropdown on selection
        navigate(`/course/${topicKey}`);
    };

    const toggleDropdown = (e, menuName) => {
        e.preventDefault();
        setActiveDropdown(activeDropdown === menuName ? null : menuName);
    };

    return (
        <header className="header">
            <Link to="/" className="logo" onClick={() => { setIsNavOpen(false); setActiveDropdown(null); }}>
                <span>FullStack</span>Notes
            </Link>

            <nav className={`nav ${isNavOpen ? 'active' : ''}`}>
                <ul className="nav-list">
                    {/* Frontend Dropdown */}
                    <li className={`nav-item ${activeDropdown === 'frontend' ? 'open' : ''}`}>
                        <a href="#" className="nav-link" onClick={e => toggleDropdown(e, 'frontend')}>
                            FrontEnd <span className="chevron"></span>
                        </a>
                        <ul className="dropdown-menu frontend-dropdown">
                            <li>
                                <a href="#" className="dropdown-item" onClick={(e) => handleTopicClick(e, 'html')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    HTML
                                </a>
                            </li>
                            <li>
                                <a href="#" className="dropdown-item" onClick={(e) => handleTopicClick(e, 'css')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    </svg>
                                    CSS
                                </a>
                            </li>
                            <li>
                                <a href="#" className="dropdown-item" onClick={(e) => handleTopicClick(e, 'js')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 18a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7z" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 6H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    JavaScript
                                </a>
                            </li>
                            <li>
                                <a href="#" className="dropdown-item" onClick={(e) => handleTopicClick(e, 'react')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    React
                                </a>
                            </li>
                        </ul>
                    </li>

                    {/* Backend Dropdown */}
                    <li className={`nav-item ${activeDropdown === 'backend' ? 'open' : ''}`}>
                        <a href="#" className="nav-link" onClick={e => toggleDropdown(e, 'backend')}>
                            BackEnd <span className="chevron"></span>
                        </a>
                        <ul className="dropdown-menu backend-dropdown">
                            <li>
                                <a href="#" className="dropdown-item" onClick={(e) => handleTopicClick(e, 'java')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Java
                                </a>
                            </li>
                            <li>
                                <a href="#" className="dropdown-item" onClick={(e) => handleTopicClick(e, 'springboot')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Springboot
                                </a>
                            </li>
                            <li>
                                <a href="#" className="dropdown-item" onClick={(e) => handleTopicClick(e, 'sql')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <ellipse cx="12" cy="5" rx="9" ry="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    SQL
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        {/* If on course page, this would ideally navigate back to home and scroll to projects */}
                        <Link to="/#projects" className="nav-link" onClick={() => setIsNavOpen(false)}>Projects</Link>
                    </li>
                </ul>
            </nav>

            <div className={`hamburger ${(isNavOpen || isSidebarOpen) ? 'active' : ''}`} onClick={handleHamburgerClick}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </div>
        </header>
    );
}
