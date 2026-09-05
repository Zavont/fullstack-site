import React, { createContext, useState, useContext, useEffect } from 'react';
import { topics } from '../data/topics';

const CourseContext = createContext();

export function CourseProvider({ children }) {
    const [selectedTopicKey, setSelectedTopicKey] = useState('html');
    const [courseData, setCourseData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeTopic = topics[selectedTopicKey];

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        // Fetch detailed course JSON data when topic changes
        const fetchCourseData = async () => {
            if (!selectedTopicKey) return;
            setIsLoading(true);
            setError(null);
            try {
                // We're loading the file from public/data/
                // Check if the file exists by matching the category or key
                // From the original structure, JSON files were named after the key (e.g. html.json, js.json)
                const filename = `${selectedTopicKey}.json`;
                const response = await fetch(`/data/${filename}`);
                if (!response.ok) {
                    throw new Error('Course data not found');
                }
                const data = await response.json();
                setCourseData(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setCourseData(null); // Clear data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseData();
    }, [selectedTopicKey]);

    const selectTopic = (key) => {
        if (topics[key]) {
            setSelectedTopicKey(key);
            closeSidebar(); // auto-close sidebar on mobile
        }
    };

    const value = {
        topics,
        selectedTopicKey,
        activeTopic,
        courseData,
        isSidebarOpen,
        isLoading,
        error,
        selectTopic,
        toggleSidebar,
        closeSidebar
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
}

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error('useCourse must be used within a CourseProvider');
    }
    return context;
};
