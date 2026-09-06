import React, { useState, useEffect } from 'react';

export default function QuizPlayer({ questions = [], topicTitle = "Quiz", courseName = "Course" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { [index]: { selected: number | null, revealed: boolean } }
    const [showGrid, setShowGrid] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    if (!questions || questions.length === 0) {
        return (
            <div className="course-topic">
                <p>No quiz questions available for this topic.</p>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    const totalQ = questions.length;
    const currentAnswer = answers[currentIndex] || { selected: null, revealed: false };

    // Calculate score
    const answeredCount = Object.keys(answers).length;
    const correctCount = Object.values(answers).filter(a => a.selected !== null && a.selected === questions[a.questionIndex]?.correct).length;

    const handleOptionSelect = (optIndex) => {
        // If already revealed, do not allow changing answer
        if (currentAnswer.revealed) return;

        setAnswers(prev => ({
            ...prev,
            [currentIndex]: {
                questionIndex: currentIndex,
                selected: optIndex,
                revealed: true
            }
        }));
    };

    const handleRevealAnswer = () => {
        setAnswers(prev => ({
            ...prev,
            [currentIndex]: {
                questionIndex: currentIndex,
                selected: prev[currentIndex]?.selected ?? null,
                revealed: true
            }
        }));
    };

    const handleNext = () => {
        if (currentIndex < totalQ - 1) {
            setCurrentIndex(prev => prev + 1);
            window.scrollTo({ top: 180, behavior: 'smooth' });
        } else {
            setIsCompleted(true);
            window.scrollTo({ top: 180, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            window.scrollTo({ top: 180, behavior: 'smooth' });
        }
    };

    const handleJumpTo = (index) => {
        setCurrentIndex(index);
        setShowGrid(false);
        setIsCompleted(false);
        window.scrollTo({ top: 180, behavior: 'smooth' });
    };

    const handleRestart = () => {
        setAnswers({});
        setCurrentIndex(0);
        setIsCompleted(false);
        window.scrollTo({ top: 180, behavior: 'smooth' });
    };

    const progressPercent = Math.round(((currentIndex + 1) / totalQ) * 100);

    // Results Completion Screen
    if (isCompleted) {
        const scorePercent = Math.round((correctCount / totalQ) * 100);
        let feedback = "Good effort! Keep practicing to master all concepts.";
        let badgeColor = "#f59e0b";
        if (scorePercent >= 80) {
            feedback = "Outstanding! You have thoroughly mastered these concepts.";
            badgeColor = "#10b981";
        } else if (scorePercent >= 60) {
            feedback = "Solid performance! A little review will make your knowledge rock solid.";
            badgeColor = "#3b82f6";
        }

        return (
            <div className="course-topic">
                <div className="gfg-breadcrumb">Tutorials &gt; Web Development &gt; {courseName} &gt; Test &gt; Quiz Results</div>
                
                <div className="quiz-completion-card" style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem',
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.35)'
                }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: `${badgeColor}20`,
                        color: badgeColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        margin: '0 auto 1.5rem auto',
                        border: `2px solid ${badgeColor}`
                    }}>
                        🏆
                    </div>
                    
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                        Quiz Completed!
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.75rem' }}>
                        {feedback}
                    </p>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Score</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: badgeColor }}>{correctCount} / {totalQ}</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Accuracy</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: badgeColor }}>{scorePercent}%</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Answered</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)' }}>{answeredCount} / {totalQ}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleRestart}
                            style={{ padding: '0.65rem 1.75rem', fontWeight: 600 }}
                        >
                            🔄 Retake Quiz
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => { setIsCompleted(false); setCurrentIndex(0); }}
                            style={{ padding: '0.65rem 1.75rem', fontWeight: 600 }}
                        >
                            📋 Review Questions
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="course-topic quiz-single-screen">
            <div className="gfg-breadcrumb">
                Tutorials &gt; Web Development &gt; {courseName} &gt; Test &gt; Quiz
            </div>

            {/* Header & Meta Bar */}
            <div className="quiz-header-bar" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700 }}>
                        {courseName} {topicTitle}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button 
                            type="button"
                            onClick={() => setShowGrid(!showGrid)}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-muted)',
                                padding: '0.35rem 0.85rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            <span>Questions Map</span>
                            <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: '#fff', padding: '0.1rem 0.45rem', borderRadius: '99px' }}>
                                {currentIndex + 1}/{totalQ}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '99px', height: '8px', overflow: 'hidden', width: '100%', marginBottom: '0.5rem' }}>
                    <div style={{
                        height: '100%',
                        width: `${progressPercent}%`,
                        background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)',
                        transition: 'width 0.3s ease'
                    }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                    <span>Question {currentIndex + 1} of {totalQ}</span>
                    <span>{progressPercent}% Completed</span>
                </div>
            </div>

            {/* Fast Question Navigation Grid (Collapsible) */}
            {showGrid && (
                <div className="quiz-nav-grid" style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Jump to Question:</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Green = Correct, Red = Incorrect, Gray = Unanswered</span>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                        gap: '0.4rem'
                    }}>
                        {questions.map((q, idx) => {
                            const ans = answers[idx];
                            const isCurrent = idx === currentIndex;
                            let bgColor = 'rgba(255,255,255,0.04)';
                            let borderColor = 'var(--border)';
                            let textColor = 'var(--text-muted)';

                            if (ans?.revealed) {
                                if (ans.selected === q.correct) {
                                    bgColor = 'rgba(16, 185, 129, 0.2)';
                                    borderColor = '#10b981';
                                    textColor = '#34d399';
                                } else if (ans.selected !== null) {
                                    bgColor = 'rgba(239, 68, 68, 0.2)';
                                    borderColor = '#ef4444';
                                    textColor = '#f87171';
                                }
                            }

                            if (isCurrent) {
                                borderColor = 'var(--primary)';
                                bgColor = 'rgba(59, 130, 246, 0.25)';
                                textColor = '#fff';
                            }

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleJumpTo(idx)}
                                    style={{
                                        height: '36px',
                                        borderRadius: 'var(--radius-sm)',
                                        border: `1px solid ${borderColor}`,
                                        background: bgColor,
                                        color: textColor,
                                        fontWeight: isCurrent ? 700 : 500,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* SINGLE QUESTION CARD ON SCREEN */}
            <div 
                className="test-card quiz-active-card" 
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    transition: 'border-color 0.2s ease'
                }}
            >
                {/* Question Card Top Indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: '#60a5fa',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '99px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                    }}>
                        Question {currentIndex + 1} of {totalQ}
                    </span>
                    
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                        {currentAnswer.revealed ? (
                            currentAnswer.selected === currentQ.correct ? (
                                <span style={{ color: '#34d399', fontWeight: 600 }}>✓ Correct (+2 pts)</span>
                            ) : currentAnswer.selected !== null ? (
                                <span style={{ color: '#f87171', fontWeight: 600 }}>✗ Incorrect</span>
                            ) : (
                                <span style={{ color: '#fbbf24', fontWeight: 600 }}>Answer Revealed</span>
                            )
                        ) : (
                            <span style={{ color: 'var(--text-dim)' }}>Click an option to see answer</span>
                        )}
                    </span>
                </div>

                {/* Question Prompt */}
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    lineHeight: 1.5,
                    marginBottom: '1rem'
                }}>
                    {currentQ.question}
                </h3>

                {/* Optional Code Block */}
                {currentQ.code && (
                    <div className="gfg-syntax-box" style={{ margin: '1rem 0 1.25rem 0' }}>
                        <pre style={{ margin: 0, padding: '1rem 1.25rem' }}>
                            <code>{currentQ.code}</code>
                        </pre>
                    </div>
                )}

                {/* Clickable Multiple-Choice Options */}
                <div className="test-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                    {currentQ.options.map((optionText, oIdx) => {
                        const isCorrectOption = oIdx === currentQ.correct;
                        const isSelectedOption = currentAnswer.selected === oIdx;

                        let rowClass = "quiz-interactive-option";
                        let rowStyle = {
                            padding: '1rem 1.25rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            background: 'rgba(255, 255, 255, 0.02)',
                            color: 'var(--text-main)',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: currentAnswer.revealed ? 'default' : 'pointer',
                            transition: 'all 0.2s ease',
                            userSelect: 'none'
                        };

                        let badgeBg = 'rgba(255, 255, 255, 0.08)';
                        let badgeColor = 'var(--text-muted)';
                        let statusText = null;

                        if (currentAnswer.revealed) {
                            if (isCorrectOption) {
                                rowStyle.background = 'rgba(16, 185, 129, 0.12)';
                                rowStyle.border = '1px solid #10b981';
                                rowStyle.color = '#a7f3d0';
                                rowStyle.fontWeight = '600';
                                badgeBg = '#10b981';
                                badgeColor = '#ffffff';
                                statusText = <span style={{ marginLeft: 'auto', color: '#34d399', fontWeight: 700, fontSize: '0.85rem' }}>✓ Correct Answer</span>;
                            } else if (isSelectedOption) {
                                rowStyle.background = 'rgba(239, 68, 68, 0.12)';
                                rowStyle.border = '1px solid #ef4444';
                                rowStyle.color = '#fecaca';
                                badgeBg = '#ef4444';
                                badgeColor = '#ffffff';
                                statusText = <span style={{ marginLeft: 'auto', color: '#f87171', fontWeight: 700, fontSize: '0.85rem' }}>✗ Your Choice</span>;
                            } else {
                                rowStyle.opacity = 0.55;
                            }
                        }

                        return (
                            <div 
                                key={oIdx}
                                className={rowClass}
                                style={rowStyle}
                                onClick={() => handleOptionSelect(oIdx)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleOptionSelect(oIdx); }}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: badgeBg,
                                    color: badgeColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.88rem',
                                    flexShrink: 0
                                }}>
                                    {String.fromCharCode(65 + oIdx)}
                                </div>
                                <div style={{ flex: 1, lineHeight: 1.4 }}>
                                    {optionText}
                                </div>
                                {statusText}
                            </div>
                        );
                    })}
                </div>

                {/* Answer and Explanation Box - ONLY SHOWN AFTER USER CLICKS */}
                {currentAnswer.revealed ? (
                    <div className="quiz-explanation-box" style={{
                        marginTop: '1.5rem',
                        padding: '1.25rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(59, 130, 246, 0.07)',
                        border: '1px solid rgba(59, 130, 246, 0.25)',
                        animation: 'fadeIn 0.25s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>💡</span>
                            <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.05rem' }}>
                                Correct Answer: Option {String.fromCharCode(65 + currentQ.correct)}
                            </span>
                        </div>
                        <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '0.98rem', fontWeight: 500 }}>
                            {currentQ.options[currentQ.correct]}
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                            <strong>Explanation:</strong> {currentQ.explanation}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={handleRevealAnswer}
                            style={{
                                background: 'transparent',
                                border: '1px dashed var(--border)',
                                color: 'var(--text-muted)',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                        >
                            👁️ Reveal Answer without Answering
                        </button>
                    </div>
                )}

                {/* Bottom Navigation Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border)',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        style={{
                            opacity: currentIndex === 0 ? 0.4 : 1,
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.6rem 1.3rem'
                        }}
                    >
                        <span>←</span> Previous
                    </button>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        Question {currentIndex + 1} / {totalQ}
                    </div>

                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNext}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.6rem 1.5rem',
                            fontWeight: 600
                        }}
                    >
                        {currentIndex === totalQ - 1 ? 'Finish Quiz ✓' : 'Next Question →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
