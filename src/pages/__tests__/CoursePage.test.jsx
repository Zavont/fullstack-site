import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CoursePage from '../CoursePage';
import * as CourseContextModule from '../../context/CourseContext';

// Mock the context hook
vi.mock('../../context/CourseContext', () => ({
  useCourse: vi.fn()
}));

const mockTopics = {
  'html': { title: 'HTML Basics' }
};

const mockCourseData = {
  language: 'HTML',
  topics: [
    { 
      id: 'html-quiz', 
      title: 'Quiz', 
      section: 'Test', 
      quiz: [
        { id: 1, question: 'Sample Question', options: ['A', 'B', 'C', 'D'], correct: 0, explanation: 'Sample Exp' }
      ] 
    }
  ]
};

describe('CoursePage - Notes Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    CourseContextModule.useCourse.mockReturnValue({
      topics: mockTopics,
      selectTopic: vi.fn(),
      selectedTopicKey: 'html',
      courseData: mockCourseData,
      isLoading: false,
      error: null,
      isSidebarOpen: false,
      toggleSidebar: vi.fn(),
      closeSidebar: vi.fn()
    });
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/course/html']}>
        <Routes>
          <Route path="/course/:topicId" element={<CoursePage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('does not render floating Add Notes button or My Notes on Quiz on quiz topic', async () => {
    renderComponent();

    // 1. Verify floating "Add Notes" button is NOT rendered
    expect(screen.queryByRole('button', { name: /add notes/i })).not.toBeInTheDocument();

    // 2. Verify inline "My Notes on Quiz" is NOT rendered
    expect(screen.queryByText(/My Notes on Quiz/i)).not.toBeInTheDocument();
  });

  it('isolates notes per topic and allows permanent note addition in topic content', async () => {
    const user = userEvent.setup();
    const multiTopicCourseData = {
      language: 'HTML',
      topics: [
        { id: 'html-tags', title: 'HTML Tags', content: '<p>Tags content</p>' },
        { id: 'html-elements', title: 'HTML Elements', content: '<p>Elements content</p>' }
      ]
    };

    CourseContextModule.useCourse.mockReturnValue({
      topics: mockTopics,
      selectTopic: vi.fn(),
      selectedTopicKey: 'html',
      courseData: multiTopicCourseData,
      isLoading: false,
      error: null,
      isSidebarOpen: false,
      toggleSidebar: vi.fn(),
      closeSidebar: vi.fn()
    });

    render(
      <MemoryRouter initialEntries={['/course/html']}>
        <Routes>
          <Route path="/course/:topicId" element={<CoursePage />} />
        </Routes>
      </MemoryRouter>
    );

    // 1. Verify permanent notes section for HTML Tags is rendered
    expect(screen.getByText('My Notes on HTML Tags')).toBeInTheDocument();

    // 2. Add note via inline topic note creator
    const inlineInput = screen.getByPlaceholderText('Add a note to HTML Tags...');
    await user.type(inlineInput, 'Note specifically for HTML Tags');
    const addBtn = screen.getByRole('button', { name: /add note to topic/i });
    await user.click(addBtn);

    // Verify note is rendered in HTML Tags
    expect(screen.getAllByText('Note specifically for HTML Tags').length).toBeGreaterThanOrEqual(1);

    // Verify stored under notes_html-tags
    const tagsNotes = JSON.parse(localStorage.getItem('notes_html-tags'));
    expect(tagsNotes).toHaveLength(1);
    expect(tagsNotes[0].text).toBe('Note specifically for HTML Tags');

    // 3. Switch to HTML Elements via sidebar
    const elementsLink = screen.getByRole('link', { name: 'HTML Elements' });
    await user.click(elementsLink);

    // Verify HTML Elements notes section is rendered
    expect(screen.getByText('My Notes on HTML Elements')).toBeInTheDocument();

    // Verify note from HTML Tags is NOT in HTML Elements
    expect(screen.queryByText('Note specifically for HTML Tags')).not.toBeInTheDocument();
    expect(screen.getByText('No notes yet for this topic. Use the box above to add your first note!')).toBeInTheDocument();

    // Verify floating Add Notes button is NOT rendered on regular topics
    expect(screen.queryByRole('button', { name: /add notes/i })).not.toBeInTheDocument();

    // 4. Add note to HTML Elements
    const elementsInput = screen.getByPlaceholderText('Add a note to HTML Elements...');
    await user.type(elementsInput, 'Note specifically for HTML Elements');
    const addBtnElements = screen.getByRole('button', { name: /add note to topic/i });
    await user.click(addBtnElements);

    // Verify stored under notes_html-elements
    const elementsNotes = JSON.parse(localStorage.getItem('notes_html-elements'));
    expect(elementsNotes).toHaveLength(1);
    expect(elementsNotes[0].text).toBe('Note specifically for HTML Elements');

    // 5. Switch back to HTML Tags
    const tagsLink = screen.getByRole('link', { name: 'HTML Tags' });
    await user.click(tagsLink);

    // Verify HTML Tags notes are restored and do not contain HTML Elements note
    expect(screen.getAllByText('Note specifically for HTML Tags').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText('Note specifically for HTML Elements')).not.toBeInTheDocument();
  });
});

