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
    { id: 'html', title: 'HTML Basics', content: '<p>HTML content</p>' }
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

  it('opens notes modal and saves a new note to localStorage', async () => {
    const user = userEvent.setup();
    renderComponent();

    // 1. Verify "Add Notes" button is rendered
    const addNotesBtn = screen.getByRole('button', { name: /add notes/i });
    expect(addNotesBtn).toBeInTheDocument();

    // 2. Click button to open modal
    await user.click(addNotesBtn);

    // Verify modal is open by finding "My Notes" header
    expect(screen.getByText('My Notes')).toBeInTheDocument();
    
    // Verify initial empty state
    expect(screen.getByText('No notes yet for this topic.')).toBeInTheDocument();

    // 3. Type a note
    const textarea = screen.getByPlaceholderText('Write your note here...');
    await user.type(textarea, 'This is a test note for HTML');

    // 4. Click Save Note
    const saveBtn = screen.getByRole('button', { name: /save note/i });
    await user.click(saveBtn);

    // 5. Verify note is displayed in the list
    expect(screen.getAllByText('This is a test note for HTML').length).toBeGreaterThanOrEqual(1);
    
    // The empty state message should be gone
    expect(screen.queryByText('No notes yet for this topic.')).not.toBeInTheDocument();

    // 6. Verify it was saved to localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes_html'));
    expect(savedNotes).toHaveLength(1);
    expect(savedNotes[0].text).toBe('This is a test note for HTML');

    // 7. Verify edit and delete buttons are present
    const editBtns = screen.getAllByRole('button', { name: /edit note/i });
    const deleteBtns = screen.getAllByRole('button', { name: /delete note/i });
    expect(editBtns.length).toBeGreaterThanOrEqual(1);
    expect(deleteBtns.length).toBeGreaterThanOrEqual(1);

    // 8. Test edit note flow
    await user.click(editBtns[0]);
    const editInputs = screen.getAllByDisplayValue('This is a test note for HTML');
    expect(editInputs.length).toBeGreaterThanOrEqual(1);
    await user.clear(editInputs[0]);
    await user.type(editInputs[0], 'Updated note content');
    const saveEditBtns = screen.getAllByRole('button', { name: /^save/i });
    // Click the save button inside the edit form
    await user.click(saveEditBtns[0]);
    expect(screen.getAllByText('Updated note content').length).toBeGreaterThanOrEqual(1);

    // 9. Test delete note flow
    const updatedDeleteBtns = screen.getAllByRole('button', { name: /delete note/i });
    await user.click(updatedDeleteBtns[0]);
    expect(screen.queryByText('Updated note content')).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('notes_html'))).toEqual([]);
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
    expect(screen.getByText('No notes yet for this topic. Use the box above or the floating button to add your first note!')).toBeInTheDocument();

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

