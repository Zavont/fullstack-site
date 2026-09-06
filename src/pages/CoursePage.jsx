import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import QuizPlayer from '../components/ui/QuizPlayer';

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
    const [activeSubtopicId, setActiveSubtopicId] = React.useState(null);
    const [notes, setNotes] = React.useState([]);
    const [inlineNewNote, setInlineNewNote] = React.useState('');
    const [editingNoteId, setEditingNoteId] = React.useState(null);
    const [editingText, setEditingText] = React.useState('');

    const topicsList = courseData?.topics || [];
    const activeTopic = topicsList.find(t => t.id === activeSubtopicId) || topicsList[0] || null;
    const currentTopicId = activeTopic?.id || activeSubtopicId || topicId;

    const isQuizTopic = Boolean(
        activeTopic?.quiz || 
        activeTopic?.id?.endsWith('-quiz') || 
        activeTopic?.title?.toLowerCase() === 'quiz'
    );

    // Inline notes: removed on Quiz, kept in all rest of topics & interview questions
    const shouldShowInlineNotes = !isQuizTopic;

    const getNoteStorageKey = (cId, sId) => {
        if (!sId || sId === cId) return `notes_${cId}`;
        return sId.startsWith(cId) ? `notes_${sId}` : `notes_${cId}_${sId}`;
    };

    const currentNoteKey = getNoteStorageKey(topicId, currentTopicId);

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

    useEffect(() => {
        if (courseData?.topics?.length > 0) {
            const hash = window.location.hash.replace('#', '');
            const matching = hash ? courseData.topics.find(t => t.id === hash) : null;
            if (matching) {
                setActiveSubtopicId(matching.id);
            } else if (!activeSubtopicId || !courseData.topics.some(t => t.id === activeSubtopicId)) {
                setActiveSubtopicId(courseData.topics[0].id);
            }
        }
    }, [courseData]);

    // Keep accordion section open for active subtopic
    useEffect(() => {
        if (activeTopic?.section) {
            setOpenSections(prev => ({
                ...prev,
                [activeTopic.section]: true
            }));
        }
    }, [activeTopic?.section]);

    // Load notes for current active topic
    useEffect(() => {
        if (!currentNoteKey) return;
        const savedNotes = localStorage.getItem(currentNoteKey);
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch {
                setNotes([]);
            }
        } else {
            setNotes([]);
        }
        setEditingNoteId(null);
        setEditingText('');
        setInlineNewNote('');
    }, [currentNoteKey]);

    const handleAddNote = (textParam) => {
        const textToSave = (typeof textParam === 'string' ? textParam : inlineNewNote).trim();
        if (textToSave && currentNoteKey) {
            const updatedNotes = [
                ...notes, 
                { id: Date.now(), text: textToSave, date: new Date().toISOString() }
            ];
            setNotes(updatedNotes);
            localStorage.setItem(currentNoteKey, JSON.stringify(updatedNotes));
            setInlineNewNote('');
        }
    };

    const handleDeleteNote = (noteId) => {
        const updatedNotes = notes.filter(n => n.id !== noteId);
        setNotes(updatedNotes);
        if (currentNoteKey) {
            localStorage.setItem(currentNoteKey, JSON.stringify(updatedNotes));
        }
        if (editingNoteId === noteId) {
            setEditingNoteId(null);
            setEditingText('');
        }
    };

    const handleStartEdit = (note) => {
        setEditingNoteId(note.id);
        setEditingText(note.text);
    };

    const handleCancelEdit = () => {
        setEditingNoteId(null);
        setEditingText('');
    };

    const handleSaveEdit = (noteId) => {
        if (!editingText.trim() || !currentNoteKey) return;
        const updatedNotes = notes.map(n => {
            if (n.id === noteId) {
                return {
                    ...n,
                    text: editingText.trim(),
                    updatedAt: new Date().toISOString()
                };
            }
            return n;
        });
        setNotes(updatedNotes);
        localStorage.setItem(currentNoteKey, JSON.stringify(updatedNotes));
        setEditingNoteId(null);
        setEditingText('');
    };

    // Handle Previous/Next
    const topicKeys = Object.keys(topics);
    const currentIndex = topicKeys.indexOf(selectedTopicKey);
    const currentSubtopicIndex = topicsList.findIndex(t => t.id === (activeTopic?.id || activeSubtopicId));
    
    const handlePrev = () => {
        if (currentSubtopicIndex > 0) {
            const prevTopic = topicsList[currentSubtopicIndex - 1];
            setActiveSubtopicId(prevTopic.id);
            window.location.hash = prevTopic.id;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (currentIndex > 0) {
            const prevKey = topicKeys[currentIndex - 1];
            selectTopic(prevKey);
            navigate(`/course/${prevKey}`);
        }
    };

    const handleNext = () => {
        if (currentSubtopicIndex >= 0 && currentSubtopicIndex < topicsList.length - 1) {
            const nextTopic = topicsList[currentSubtopicIndex + 1];
            setActiveSubtopicId(nextTopic.id);
            window.location.hash = nextTopic.id;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (currentIndex < topicKeys.length - 1) {
            const nextKey = topicKeys[currentIndex + 1];
            selectTopic(nextKey);
            navigate(`/course/${nextKey}`);
        }
    };

    const isPrevDisabled = currentSubtopicIndex <= 0 && currentIndex <= 0;
    const isNextDisabled = (currentSubtopicIndex === -1 || currentSubtopicIndex >= topicsList.length - 1) && currentIndex >= topicKeys.length - 1;

    const handleSidebarItemClick = (e, subtopicId) => {
        e.preventDefault();
        setActiveSubtopicId(subtopicId);
        window.location.hash = subtopicId;
        closeSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 className="sidebar-title" style={{ margin: 0 }}>{courseData?.language || 'Topics'}</h3>
                        <Link 
                            to="/" 
                            onClick={closeSidebar}
                            style={{ 
                                fontSize: '0.78rem', 
                                color: 'var(--primary)', 
                                textDecoration: 'none', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '0.25rem', 
                                fontWeight: 600,
                                background: 'rgba(99, 102, 241, 0.12)',
                                padding: '0.2rem 0.55rem',
                                borderRadius: 'var(--radius-sm)'
                            }}
                        >
                            <span>←</span> All Courses
                        </Link>
                    </div>
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
                                    {groupTopics.map((topic, index) => {
                                        const isActive = topic.id === (activeTopic?.id || activeSubtopicId);
                                        return (
                                            <li className={`sidebar-item ${isActive ? 'active' : ''}`} key={topic.id || index}>
                                                <a 
                                                    href={`#${topic.id}`} 
                                                    className={`sidebar-link ${isActive ? 'active' : ''}`} 
                                                    onClick={(e) => handleSidebarItemClick(e, topic.id)}
                                                >
                                                    {topic.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </aside>
            
            <main className="course-main">
                <div className="course-content-container">
                    <div>
                        {(() => {
                            if (!activeTopic) return null;
                            return (
                                <section id={activeTopic.id} key={activeTopic.id} className="topic-section" style={{ marginBottom: '4rem' }}>
                                    {activeTopic?.quiz && Array.isArray(activeTopic.quiz) && activeTopic.quiz.length > 0 ? (
                                        <QuizPlayer 
                                            key={activeTopic.id}
                                            questions={activeTopic.quiz} 
                                            topicTitle={activeTopic.title} 
                                            courseName={courseData?.language || 'Course'} 
                                        />
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: activeTopic.content }} />
                                    )}
                                    
                                    {/* Permanent Notes Section in Topic Content (kept in rest of topics) */}
                                    {shouldShowInlineNotes && (
                                        <div className="topic-notes-appended" style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                                                <h3 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', wordBreak: 'break-word', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', flexShrink: 0 }}>
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                    </svg>
                                                    My Notes on {activeTopic.title}
                                                </h3>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem 0.75rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                                    {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                                                </span>
                                            </div>

                                            {/* Integrated Note Input Box right in topic content */}
                                            <div className="topic-note-creator" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                                                <textarea 
                                                    value={inlineNewNote} 
                                                    onChange={(e) => setInlineNewNote(e.target.value)} 
                                                    placeholder={`Add a note to ${activeTopic.title}...`} 
                                                    rows="3" 
                                                    className="note-textarea"
                                                    style={{ width: '100%', marginBottom: '0.75rem', padding: '0.75rem' }}
                                                    onKeyDown={(e) => {
                                                        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                                                            handleAddNote(inlineNewNote);
                                                        }
                                                    }}
                                                ></textarea>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    <small style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                                                        Notes are permanently saved to this topic
                                                    </small>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-primary" 
                                                        onClick={() => handleAddNote(inlineNewNote)}
                                                        disabled={!inlineNewNote.trim()}
                                                        style={{ opacity: inlineNewNote.trim() ? 1 : 0.6, cursor: inlineNewNote.trim() ? 'pointer' : 'not-allowed', padding: '0.45rem 1.1rem', fontSize: '0.875rem' }}
                                                    >
                                                        Add Note to Topic
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Notes List or Clean Empty State */}
                                            {notes.length === 0 ? (
                                                <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                                                        No notes yet for this topic. Use the box above to add your first note!
                                                    </p>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {notes.map(note => {
                                                        const isEditing = editingNoteId === note.id;
                                                        return (
                                                            <div key={note.id} className="note-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', position: 'relative' }}>
                                                                {/* Actions at Top Right */}
                                                                <div className="note-card-actions" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                                                    {!isEditing && (
                                                                        <button 
                                                                            type="button" 
                                                                            className="note-action-btn note-edit-btn" 
                                                                            onClick={() => handleStartEdit(note)} 
                                                                            aria-label="Edit note" 
                                                                            title="Edit note"
                                                                        >
                                                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                    <button 
                                                                        type="button" 
                                                                        className="note-action-btn note-delete-btn" 
                                                                        onClick={() => handleDeleteNote(note.id)} 
                                                                        aria-label="Delete note" 
                                                                        title="Delete note"
                                                                    >
                                                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                                        </svg>
                                                                    </button>
                                                                </div>

                                                                {isEditing ? (
                                                                    <div className="note-edit-area" style={{ marginTop: '0.25rem' }}>
                                                                        <textarea 
                                                                            value={editingText} 
                                                                            onChange={(e) => setEditingText(e.target.value)} 
                                                                            className="note-textarea" 
                                                                            rows="3" 
                                                                            autoFocus 
                                                                            style={{ width: '100%', marginBottom: '0.75rem', padding: '0.75rem' }} 
                                                                            placeholder="Edit your note..." 
                                                                        />
                                                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                                            <button 
                                                                            type="button" 
                                                                            className="btn btn-secondary" 
                                                                            style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }} 
                                                                            onClick={handleCancelEdit}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                        <button 
                                                                            type="button" 
                                                                            className="btn btn-primary" 
                                                                            style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }} 
                                                                            onClick={() => handleSaveEdit(note.id)}
                                                                        >
                                                                            Save Changes
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <p style={{ margin: 0, paddingRight: '4.5rem', color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{note.text}</p>
                                                                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        {note.updatedAt ? (
                                                                            <small style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                                                                (edited)
                                                                            </small>
                                                                        ) : <span />}
                                                                        <small style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                                            {new Date(note.date).toLocaleString(undefined, {
                                                                                year: 'numeric', month: 'short', day: 'numeric',
                                                                                hour: '2-digit', minute: '2-digit'
                                                                            })}
                                                                        </small>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    )}
                                </section>
                            );
                        })()}
                    </div>

                    <div className="course-actions">
                        <button 
                            className="btn btn-secondary" 
                            onClick={handlePrev}
                            disabled={isPrevDisabled}
                            style={{ opacity: isPrevDisabled ? 0.5 : 1, cursor: isPrevDisabled ? 'not-allowed' : 'pointer' }}
                        >
                            &larr; Previous Topic
                        </button>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleNext}
                            disabled={isNextDisabled}
                            style={{ opacity: isNextDisabled ? 0.5 : 1, cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}
                        >
                            Next Topic &rarr;
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
