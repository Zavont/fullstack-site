const topics = {
    html: {
        category: "Frontend",
        title: "HTML5: Semantic Structure",
        description: "HTML5 is the standard markup language for documents designed to be displayed in a web browser. Modern HTML focuses on semantic elements, accessibility (a11y), and proper page structure to support search engine optimization and assistive technologies.",
        tags: ["Semantic HTML", "SEO Best Practices", "Forms & Validation", "Accessibility"],
        themeColor: "#06b6d4",
        filename: "index.html",
        code: `<span class="hl-comment">&lt;!-- Semantic Page Layout --&gt;</span>
<span class="hl-tag">&lt;header</span> <span class="hl-attr">class</span>=<span class="hl-string">"site-header"</span><span class="hl-tag">&gt;</span>
  <span class="hl-tag">&lt;nav</span> <span class="hl-attr">aria-label</span>=<span class="hl-string">"Main Navigation"</span><span class="hl-tag">&gt;</span>
    <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span>=<span class="hl-string">"/"</span> <span class="hl-attr">class</span>=<span class="hl-string">"logo"</span><span class="hl-tag">&gt;</span>StackAcademy<span class="hl-tag">&lt;/a&gt;</span>
  <span class="hl-tag">&lt;/nav&gt;</span>
<span class="hl-tag">&lt;/header&gt;</span>

<span class="hl-tag">&lt;main&gt;</span>
  <span class="hl-tag">&lt;article</span> <span class="hl-attr">class</span>=<span class="hl-string">"course-article"</span><span class="hl-tag">&gt;</span>
    <span class="hl-tag">&lt;h1&gt;</span>Learn Frontend Development<span class="hl-tag">&lt;/h1&gt;</span>
    <span class="hl-tag">&lt;p&gt;</span>Build structures that scale.<span class="hl-tag">&lt;/p&gt;</span>
  <span class="hl-tag">&lt;/article&gt;</span>
<span class="hl-tag">&lt;/main&gt;</span>`,
        rawCode: `<!-- Semantic Page Layout -->\n<header class="site-header">\n  <nav aria-label="Main Navigation">\n    <a href="/" class="logo">StackAcademy</a>\n  </nav>\n</header>\n\n<main>\n  <article class="course-article">\n    <h1>Learn Frontend Development</h1>\n    <p>Build structures that scale.</p>\n  </article>\n</main>`,
        quiz: {
            question: "Which HTML5 element is used to represent self-contained composition in a document?",
            options: [
                { text: "<section>", isCorrect: false },
                { text: "<article>", isCorrect: true },
                { text: "<div>", isCorrect: false },
                { text: "<aside>", isCorrect: false }
            ]
        }
    },
    css: {
        category: "Frontend",
        title: "CSS3: Premium Styling & Grid layouts",
        description: "Cascading Style Sheets (CSS) describe how HTML elements are to be displayed on screen. Modern CSS incorporates layout systems like Flexbox and Grid, custom properties (variables) for consistent design themes, transitions, animations, and container queries.",
        tags: ["Grid & Flexbox", "Custom Properties", "Transitions", "Responsive"],
        themeColor: "#ec4899",
        filename: "style.css",
        code: `<span class="hl-comment">/* Modern Glassmorphic CSS Grid */</span>
<span class="hl-keyword">:root</span> {
  <span class="hl-attr">--blur-intensity</span>: 16px;
  <span class="hl-attr">--border-glass</span>: rgba(255, 255, 255, 0.08);
}

<span class="hl-keyword">.grid-container</span> {
  <span class="hl-attr">display</span>: grid;
  <span class="hl-attr">grid-template-columns</span>: repeat(auto-fit, minmax(250px, 1fr));
  <span class="hl-attr">gap</span>: 1.5rem;
}

<span class="hl-keyword">.glass-card</span> {
  <span class="hl-attr">backdrop-filter</span>: blur(var(--blur-intensity));
  <span class="hl-attr">border</span>: 1px solid var(--border-glass);
  <span class="hl-attr">transition</span>: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}`,
        rawCode: `/* Modern Glassmorphic CSS Grid */\n:root {\n  --blur-intensity: 16px;\n  --border-glass: rgba(255, 255, 255, 0.08);\n}\n\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n\n.glass-card {\n  backdrop-filter: blur(var(--blur-intensity));\n  border: 1px solid var(--border-glass);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}`,
        quiz: {
            question: "Which property is used to align items horizontally along the main axis in a CSS Flexbox container?",
            options: [
                { text: "align-items", isCorrect: false },
                { text: "align-content", isCorrect: false },
                { text: "justify-content", isCorrect: true },
                { text: "flex-direction", isCorrect: false }
            ]
        }
    },
    js: {
        category: "Frontend",
        title: "JavaScript: Async ESNext",
        description: "JavaScript is the programming language of the Web. High-performance modern applications utilize asynchronous programming patterns (async/await, promises), ES6+ modules, array methods, closures, and DOM manipulation to construct interactive client-side logic.",
        tags: ["Async / Await", "ES6+ Modules", "Event Loop", "Closures"],
        themeColor: "#eab308",
        filename: "app.js",
        code: `<span class="hl-comment">// Fetching and updating user interface asynchronously</span>
<span class="hl-keyword">async function</span> <span class="hl-function">loadDashboardData</span>(<span class="hl-type">userId</span>) {
  <span class="hl-keyword">try</span> {
    <span class="hl-keyword">const</span> response = <span class="hl-keyword">await</span> <span class="hl-function">fetch</span>(\`/api/users/\${userId}\`);
    <span class="hl-keyword">if</span> (!response.ok) <span class="hl-keyword">throw new</span> <span class="hl-type">Error</span>(<span class="hl-string">'Network failed'</span>);
    
    <span class="hl-keyword">const</span> data = <span class="hl-keyword">await</span> response.<span class="hl-function">json</span>();
    <span class="hl-function">updateUI</span>(data);
  } <span class="hl-keyword">catch</span> (err) {
    console.<span class="hl-function">error</span>(<span class="hl-string">'Dashboard Error:'</span>, err.message);
  }
}`,
        rawCode: `// Fetching and updating user interface asynchronously\nasync function loadDashboardData(userId) {\n  try {\n    const response = await fetch(\`/api/users/\${userId}\`);\n    if (!response.ok) throw new Error('Network failed');\n    \n    const data = await response.json();\n    updateUI(data);\n  } catch (err) {\n    console.error('Dashboard Error:', err.message);\n  }\n}`,
        quiz: {
            question: "What is the correct way to declare an asynchronous function in JavaScript?",
            options: [
                { text: "function async myFunc() {}", isCorrect: false },
                { text: "async function myFunc() {}", isCorrect: true },
                { text: "function myFunc() async {}", isCorrect: false },
                { text: "let myFunc = () => async {}", isCorrect: false }
            ]
        }
    },
    react: {
        category: "Frontend",
        title: "React: Declarative UI & Hooks",
        description: "React is a popular frontend library developed by Meta. It allows developers to build component-driven single-page interfaces, managing state declaratively using Hooks (useState, useEffect, useMemo), virtual DOM synchronization, and context providers.",
        tags: ["Hooks Architecture", "Virtual DOM", "Context API", "Components"],
        themeColor: "#3b82f6",
        filename: "Dashboard.jsx",
        code: `<span class="hl-keyword">import</span> React, { useState, useEffect } <span class="hl-keyword">from</span> <span class="hl-string">'react'</span>;

<span class="hl-keyword">export default function</span> <span class="hl-function">Dashboard</span>() {
  <span class="hl-keyword">const</span> [stats, setStats] = <span class="hl-function">useState</span>(<span class="hl-keyword">null</span>);

  <span class="hl-function">useEffect</span>(() =&gt; {
    <span class="hl-comment">// Track component lifecycle</span>
    <span class="hl-function">fetchStats</span>().<span class="hl-function">then</span>(data =&gt; <span class="hl-function">setStats</span>(data));
  }, []);

  <span class="hl-keyword">return</span> (
    <span class="hl-tag">&lt;div</span> <span class="hl-attr">className</span>=<span class="hl-string">"dashboard-container"</span><span class="hl-tag">&gt;</span>
      <span class="hl-tag">&lt;h2&gt;</span>Active Sessions<span class="hl-tag">&lt;/h2&gt;</span>
      {stats ? <span class="hl-tag">&lt;p&gt;</span>{stats.activeCount}<span class="hl-tag">&lt;/p&gt;</span> : <span class="hl-tag">&lt;p&gt;</span>Loading...<span class="hl-tag">&lt;/p&gt;</span>}
    <span class="hl-tag">&lt;/div&gt;</span>
  );
}`,
        rawCode: `import React, { useState, useEffect } from 'react';\n\nexport default function Dashboard() {\n  const [stats, setStats] = useState(null);\n\n  useEffect(() => {\n    // Track component lifecycle\n    fetchStats().then(data => setStats(data));\n  }, []);\n\n  return (\n    <div className="dashboard-container">\n      <h2>Active Sessions</h2>\n      {stats ? <p>{stats.activeCount}</p> : <p>Loading...</p>}\n    </div>\n  );\n}`,
        quiz: {
            question: "In React, which hook is used to run side effects like fetching data or setting up subscriptions?",
            options: [
                { text: "useState", isCorrect: false },
                { text: "useContext", isCorrect: false },
                { text: "useEffect", isCorrect: true },
                { text: "useReducer", isCorrect: false }
            ]
        }
    },
    java: {
        category: "Backend",
        title: "Java: Object-Oriented Foundations",
        description: "Java is a robust, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Java is widely used for back-end enterprise architectures, using Collections API, Streams, and concurrency frameworks.",
        tags: ["OOP Architecture", "Collections Framework", "Stream API", "Concurrency"],
        themeColor: "#ea580c",
        filename: "UserService.java",
        code: `<span class="hl-keyword">package</span> com.stackacademy.service;

<span class="hl-keyword">import</span> java.util.List;
<span class="hl-keyword">import</span> java.util.stream.Collectors;

<span class="hl-keyword">public class</span> <span class="hl-type">UserService</span> {
    <span class="hl-keyword">private final</span> <span class="hl-type">List</span>&lt;<span class="hl-type">String</span>&gt; databaseUsers;

    <span class="hl-keyword">public</span> <span class="hl-function">UserService</span>(<span class="hl-type">List</span>&lt;<span class="hl-type">String</span>&gt; users) {
        <span class="hl-keyword">this</span>.databaseUsers = users;
    }

    <span class="hl-keyword">public</span> <span class="hl-type">List</span>&lt;<span class="hl-type">String</span>&gt; <span class="hl-function">searchUsersByPrefix</span>(<span class="hl-type">String</span> prefix) {
        <span class="hl-keyword">return</span> databaseUsers.stream()
            .filter(user -&gt; user.toLowerCase().startsWith(prefix.toLowerCase()))
            .collect(<span class="hl-type">Collectors</span>.toList());
    }
}`,
        rawCode: `package com.stackacademy.service;\n\nimport java.util.List;\nimport java.util.stream.Collectors;\n\npublic class UserService {\n    private final List<String> databaseUsers;\n\n    public UserService(List<String> users) {\n        this.databaseUsers = users;\n    }\n\n    public List<String> searchUsersByPrefix(String prefix) {\n        return databaseUsers.stream()\n            .filter(user -> user.toLowerCase().startsWith(prefix.toLowerCase()))\n            .collect(Collectors.toList());\n    }\n}`,
        quiz: {
            question: "Which of the following is NOT an access modifier in Java?",
            options: [
                { text: "public", isCorrect: false },
                { text: "internal", isCorrect: true },
                { text: "protected", isCorrect: false },
                { text: "private", isCorrect: false }
            ]
        }
    },
    springboot: {
        category: "Backend",
        title: "Spring Boot: Production APIs & Microservices",
        description: "Spring Boot makes it easy to create stand-alone, production-grade Spring based applications that you can 'just run'. It provides auto-configuration, starter packages, embedded servers, dependency injection (DI), and powerful ORM mapping with JPA.",
        tags: ["REST Controllers", "Dependency Injection", "JPA & Hibernate", "Spring Security"],
        themeColor: "#10b981",
        filename: "CourseController.java",
        code: `<span class="hl-keyword">package</span> com.stackacademy.controller;

<span class="hl-keyword">import</span> org.springframework.web.bind.annotation.*;
<span class="hl-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;

<span class="hl-meta">@RestController</span>
<span class="hl-meta">@RequestMapping</span>(<span class="hl-string">"/api/v1/courses"</span>)
<span class="hl-keyword">public class</span> <span class="hl-type">CourseController</span> {

    <span class="hl-meta">@GetMapping</span>
    <span class="hl-keyword">public</span> <span class="hl-type">ResponseEntity</span>&lt;<span class="hl-type">List</span>&lt;<span class="hl-type">Course</span>&gt;&gt; <span class="hl-function">getAllCourses</span>() {
        <span class="hl-type">List</span>&lt;<span class="hl-type">Course</span>&gt; courses = courseService.findAll();
        <span class="hl-keyword">return</span> <span class="hl-type">ResponseEntity</span>.ok(courses);
    }
}`,
        rawCode: `package com.stackacademy.controller;\n\nimport org.springframework.web.bind.annotation.*;\nimport org.springframework.beans.factory.annotation.Autowired;\n\n@RestController\n@RequestMapping("/api/v1/courses")\npublic class CourseController {\n\n    @GetMapping\n    public ResponseEntity<List<Course>> getAllCourses() {\n        List<Course> courses = courseService.findAll();\n        return ResponseEntity.ok(courses);\n    }\n}`,
        quiz: {
            question: "Which annotation is used to designate a class as a Spring REST Controller?",
            options: [
                { text: "@Controller", isCorrect: false },
                { text: "@RestController", isCorrect: true },
                { text: "@ResponseBody", isCorrect: false },
                { text: "@Service", isCorrect: false }
            ]
        }
    },
    sql: {
        category: "Backend",
        title: "SQL: Relational Databases & Schema Optimization",
        description: "Structured Query Language (SQL) is the standard language for relational database management systems. Writing efficient SQL queries involves mastering JOINs, indexes, aggregate functions, transactional isolation levels, and normalizing databases.",
        tags: ["Inner / Outer Joins", "DB Normalization", "Query Indexes", "ACID Transactions"],
        themeColor: "#3b82f6",
        filename: "queries.sql",
        code: `<span class="hl-comment">-- Select courses joined with student enrollment counts</span>
<span class="hl-keyword">SELECT</span> 
  c.id, 
  c.title, 
  c.difficulty, 
  <span class="hl-function">COUNT</span>(e.student_id) <span class="hl-keyword">AS</span> total_enrolled
<span class="hl-keyword">FROM</span> courses c
<span class="hl-keyword">LEFT JOIN</span> enrollments e <span class="hl-keyword">ON</span> c.id = e.course_id
<span class="hl-keyword">GROUP BY</span> c.id, c.title, c.difficulty
<span class="hl-keyword">HAVING</span> <span class="hl-function">COUNT</span>(e.student_id) &gt; <span class="hl-string">5</span>
<span class="hl-keyword">ORDER BY</span> total_enrolled <span class="hl-keyword">DESC</span>;`,
        rawCode: `-- Select courses joined with student enrollment counts\nSELECT \n  c.id, \n  c.title, \n  c.difficulty, \n  COUNT(e.student_id) AS total_enrolled\nFROM courses c\nLEFT JOIN enrollments e ON c.id = e.course_id\nGROUP BY c.id, c.title, c.difficulty\nHAVING COUNT(e.student_id) > 5\nORDER BY total_enrolled DESC;`,
        quiz: {
            question: "Which SQL clause is used to filter records after aggregate calculations in a GROUP BY statement?",
            options: [
                { text: "WHERE", isCorrect: false },
                { text: "HAVING", isCorrect: true },
                { text: "FILTER", isCorrect: false },
                { text: "LIMIT", isCorrect: false }
            ]
        }
    }
};

let currentTopicKey = 'html';

function loadTopic(key) {
    const topic = topics[key];
    if (!topic) return;
    
    currentTopicKey = key;
    
    // Update container border and text colors via custom properties
    const container = document.getElementById('sandboxContainer');
    container.style.setProperty('--theme-color', topic.themeColor);
    
    // Update simple fields
    document.getElementById('sandboxCategory').innerText = topic.category;
    document.getElementById('sandboxTitle').innerText = topic.title;
    document.getElementById('sandboxDesc').innerText = topic.description;
    document.getElementById('codeFilename').innerText = topic.filename;
    document.getElementById('codeDisplay').innerHTML = topic.code;
    
    // Update concepts list
    const tagsContainer = document.getElementById('conceptsTags');
    tagsContainer.innerHTML = '';
    topic.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'concept-tag';
        span.innerText = tag;
        tagsContainer.appendChild(span);
    });
    
    // Load Interactive Quiz
    loadQuiz(topic.quiz);
}

function loadQuiz(quiz) {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <div class="quiz-question">${quiz.question}</div>
        <div class="quiz-options">
            ${quiz.options.map((opt, i) => `
                <button class="quiz-option" data-correct="${opt.isCorrect}" onclick="selectQuizOption(this)">
                    ${opt.text}
                </button>
            `).join('')}
        </div>
    `;
}

function selectQuizOption(btn) {
    const parent = btn.parentElement;
    const options = parent.querySelectorAll('.quiz-option');
    
    // Disable further clicking
    options.forEach(opt => {
        opt.setAttribute('disabled', 'true');
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        if (isCorrect) {
            opt.classList.add('correct');
        } else if (opt === btn) {
            opt.classList.add('wrong');
        }
    });
}

function copyCode() {
    const topic = topics[currentTopicKey];
    if (!topic) return;
    
    navigator.clipboard.writeText(topic.rawCode).then(() => {
        showToast("Code copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function loadNextTopic() {
    const keys = Object.keys(topics);
    let nextIndex = keys.indexOf(currentTopicKey) + 1;
    if (nextIndex >= keys.length) {
        nextIndex = 0;
    }
    loadTopic(keys[nextIndex]);
}

function showToast(message) {
    const toast = document.getElementById('copyToast');
    const toastText = document.getElementById('toastText');
    toastText.innerText = message;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Course View State
let currentCourseData = null;
let currentCourseTopicIndex = 0;

async function openCourseView(langKey) {
    try {
        // Try fetching from res/
        const response = await fetch(`res/${langKey}.json`);
        if (!response.ok) {
            // Fallback to old sandbox behavior if JSON not found
            console.warn(`No JSON found for ${langKey}. Falling back to sandbox.`);
            loadTopic(langKey);
            document.getElementById('sandbox').scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        currentCourseData = await response.json();
        
        // Hide landing page, show course view
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('courseView').style.display = 'flex';
        
        // Hide global nav and reset hamburger icon (for mobile)
        const navMenu = document.querySelector('.nav');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        const hamburger = document.getElementById('hamburgerMenu');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
        }
        
        // Populate Sidebar with Collapsible Accordion Sections
        const sidebarList = document.getElementById('courseSidebarList');
        sidebarList.innerHTML = '';
        
        document.getElementById('courseSidebarTitle').innerText = currentCourseData.language;
        
        // Set CSS variable for theme
        document.getElementById('courseView').style.setProperty('--theme-color', currentCourseData.themeColor);
        
        // Group topics by section
        const sectionsMap = new Map();
        currentCourseData.topics.forEach((topic, index) => {
            const secName = topic.section || "General Topics";
            if (!sectionsMap.has(secName)) {
                sectionsMap.set(secName, []);
            }
            sectionsMap.get(secName).push({ topic, index });
        });

        // Render sections with expandable headers & subtopic lists
        sectionsMap.forEach((items, secName) => {
            const sectionWrapper = document.createElement('li');
            sectionWrapper.className = 'sidebar-section'; // default collapsed
            
            const header = document.createElement('div');
            header.className = 'sidebar-section-header';
            header.innerHTML = `
                <span>${secName}</span>
                <svg class="section-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            `;
            header.onclick = (e) => {
                e.stopPropagation();
                
                // Close all other open sections for accordion effect
                const allSections = document.querySelectorAll('.sidebar-section');
                allSections.forEach(sec => {
                    if (sec !== sectionWrapper && sec.classList.contains('open')) {
                        sec.classList.remove('open');
                    }
                });
                
                sectionWrapper.classList.toggle('open');
            };
            
            const ul = document.createElement('ul');
            ul.className = 'sidebar-subtopics';
            
            items.forEach(({ topic, index }) => {
                const subLi = document.createElement('li');
                subLi.className = 'sidebar-item';
                
                const a = document.createElement('a');
                a.className = 'sidebar-link';
                a.setAttribute('data-index', index);
                a.innerText = topic.title;
                a.onclick = (e) => {
                    e.preventDefault();
                    loadCourseTopic(index, true);
                };
                
                subLi.appendChild(a);
                ul.appendChild(subLi);
            });
            
            sectionWrapper.appendChild(header);
            sectionWrapper.appendChild(ul);
            sidebarList.appendChild(sectionWrapper);
        });
        
        // Load first topic without expanding sections initially
        loadCourseTopic(0, false);
        window.scrollTo(0, 0);
        
    } catch (err) {
        console.error("Error loading course:", err);
    }
}

function loadCourseTopic(index, autoExpand = true) {
    if (!currentCourseData || !currentCourseData.topics[index]) return;
    currentCourseTopicIndex = index;
    
    const topic = currentCourseData.topics[index];
    document.getElementById('courseMainContent').innerHTML = topic.content;
    
    // Update active state in sidebar using data-index attribute
    const links = document.querySelectorAll('#courseSidebarList .sidebar-link');
    links.forEach((link) => {
        const linkIndex = parseInt(link.getAttribute('data-index'), 10);
        if (linkIndex === index) {
            link.classList.add('active');
            if (autoExpand) {
                // Expand parent section if requested
                const parentSection = link.closest('.sidebar-section');
                if (parentSection && !parentSection.classList.contains('open')) {
                    // Close all other sections first for accordion effect
                    const allSections = document.querySelectorAll('.sidebar-section');
                    allSections.forEach(sec => {
                        if (sec !== parentSection) {
                            sec.classList.remove('open');
                        }
                    });
                    
                    parentSection.classList.add('open');
                }
            }
        } else {
            link.classList.remove('active');
        }
    });
    
    // Close sidebar on mobile after selection
    const sidebar = document.querySelector('.course-sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        toggleCourseSidebar(); // Uses toggle to also handle overlay and hamburger states
    }
}

function loadNextTopicCourseView() {
    if (!currentCourseData) return;
    let nextIndex = currentCourseTopicIndex + 1;
    if (nextIndex >= currentCourseData.topics.length) {
        nextIndex = 0; // loop back to start
    }
    loadCourseTopic(nextIndex);
    window.scrollTo(0, 0);
}

function loadPrevTopicCourseView() {
    if (!currentCourseData) return;
    let prevIndex = currentCourseTopicIndex - 1;
    if (prevIndex < 0) {
        prevIndex = currentCourseData.topics.length - 1; // loop to last
    }
    loadCourseTopic(prevIndex);
    window.scrollTo(0, 0);
}

function closeCourseView(e) {
    if (e) e.preventDefault();
    document.getElementById('courseView').style.display = 'none';
    document.getElementById('landingPage').style.display = 'block';
    
    // Close sidebar if open
    const sidebar = document.querySelector('.course-sidebar');
    if (sidebar) sidebar.classList.remove('open');
    
    window.scrollTo(0, 0);
}

function toggleCourseSidebar() {
    const sidebar = document.querySelector('.course-sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburger = document.getElementById('hamburgerMenu');
    if (sidebar) {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('show');
        if (hamburger) hamburger.classList.toggle('active');
    }
}

// Initial setup on window load
window.addEventListener('DOMContentLoaded', () => {
    // Click events for interactive elements (Navbar and Quick Cards)
    const links = document.querySelectorAll('[data-topic]');
    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const topicKey = link.getAttribute('data-topic');
            await openCourseView(topicKey);
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Contact form submit interceptor
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (name && email && message) {
                showToast(`Thank you, ${name}! Your message has been sent.`);
                contactForm.reset();
            }
        });
    }
    
    // Hamburger Menu Toggle for Responsive Mode
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.querySelector('.nav');
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            const courseView = document.getElementById('courseView');
            if (courseView && courseView.style.display === 'flex') {
                // In Course View, toggle the side topics menu like GeeksforGeeks
                toggleCourseSidebar();
            } else {
                // On Landing page, toggle the main nav
                navMenu.classList.toggle('active');
                hamburgerMenu.classList.toggle('active');
            }
        });
    }
    
    // Close mobile menu when a data-topic link or anchor link is clicked
    const allLinks = document.querySelectorAll('.nav a');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's a dropdown header (has a chevron)
            if (link.querySelector('.chevron')) {
                // Let the hover/click CSS handle the dropdown expansion
                e.preventDefault();
                return;
            }
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Initialize sandbox with HTML topic
    loadTopic('html');
});

