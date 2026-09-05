import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import CoursePage from './pages/CoursePage';
import { useCourse } from './context/CourseContext';

export default function App() {
    const { pathname, hash } = useLocation();

    // Scroll to top or specific hash on route change
    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return (
        <>
            {/* Ambient background glows */}
            <div className="bg-glow-1"></div>
            <div className="bg-glow-2"></div>
            
            <Navbar />
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/course/:topicId" element={<CoursePage />} />
            </Routes>
            
            <Footer />
        </>
    );
}
