import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';

export default function QuickAccessCard({ topicKey, badge, title, description, iconSvg, themeColor, glowColor }) {
    const { selectTopic } = useCourse();
    const navigate = useNavigate();

    const handleClick = () => {
        selectTopic(topicKey);
        navigate(`/course/${topicKey}`);
    };

    return (
        <div 
            className="quick-card" 
            style={{ '--card-theme': themeColor, '--card-glow': glowColor }}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
        >
            <div className="quick-card-header">
                <div className="quick-card-icon">
                    {iconSvg}
                </div>
                <span className="quick-card-badge">{badge}</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
