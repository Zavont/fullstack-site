export const topics = {
    html: {
        category: "Frontend",
        title: "HTML5: Semantic Structure",
        description: "HTML5 is the standard markup language for documents designed to be displayed in a web browser. Modern HTML focuses on semantic elements, accessibility (a11y), and proper page structure to support search engine optimization and assistive technologies.",
        tags: ["Semantic HTML", "SEO Best Practices", "Forms & Validation", "Accessibility"],
        themeColor: "#06b6d4",
        filename: "index.html",
        code: `<span class="hl-comment">&lt;!-- Semantic Page Layout --&gt;</span>\n<span class="hl-tag">&lt;header</span> <span class="hl-attr">class</span>=<span class="hl-string">"site-header"</span><span class="hl-tag">&gt;</span>\n  <span class="hl-tag">&lt;nav</span> <span class="hl-attr">aria-label</span>=<span class="hl-string">"Main Navigation"</span><span class="hl-tag">&gt;</span>\n    <span class="hl-tag">&lt;a</span> <span class="hl-attr">href</span>=<span class="hl-string">"/"</span> <span class="hl-attr">class</span>=<span class="hl-string">"logo"</span><span class="hl-tag">&gt;</span>StackAcademy<span class="hl-tag">&lt;/a&gt;</span>\n  <span class="hl-tag">&lt;/nav&gt;</span>\n<span class="hl-tag">&lt;/header&gt;</span>\n\n<span class="hl-tag">&lt;main&gt;</span>\n  <span class="hl-tag">&lt;article</span> <span class="hl-attr">class</span>=<span class="hl-string">"course-article"</span><span class="hl-tag">&gt;</span>\n    <span class="hl-tag">&lt;h1&gt;</span>Learn Frontend Development<span class="hl-tag">&lt;/h1&gt;</span>\n    <span class="hl-tag">&lt;p&gt;</span>Build structures that scale.<span class="hl-tag">&lt;/p&gt;</span>\n  <span class="hl-tag">&lt;/article&gt;</span>\n<span class="hl-tag">&lt;/main&gt;</span>`,
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
        code: `<span class="hl-comment">/* Modern Glassmorphic CSS Grid */</span>\n<span class="hl-keyword">:root</span> {\n  <span class="hl-attr">--blur-intensity</span>: 16px;\n  <span class="hl-attr">--border-glass</span>: rgba(255, 255, 255, 0.08);\n}\n\n<span class="hl-keyword">.grid-container</span> {\n  <span class="hl-attr">display</span>: grid;\n  <span class="hl-attr">grid-template-columns</span>: repeat(auto-fit, minmax(250px, 1fr));\n  <span class="hl-attr">gap</span>: 1.5rem;\n}\n\n<span class="hl-keyword">.glass-card</span> {\n  <span class="hl-attr">backdrop-filter</span>: blur(var(--blur-intensity));\n  <span class="hl-attr">border</span>: 1px solid var(--border-glass);\n  <span class="hl-attr">transition</span>: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}`,
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
        code: `<span class="hl-comment">// Fetching and updating user interface asynchronously</span>\n<span class="hl-keyword">async function</span> <span class="hl-function">loadDashboardData</span>(<span class="hl-type">userId</span>) {\n  <span class="hl-keyword">try</span> {\n    <span class="hl-keyword">const</span> response = <span class="hl-keyword">await</span> <span class="hl-function">fetch</span>(\`/api/users/\${userId}\`);\n    <span class="hl-keyword">if</span> (!response.ok) <span class="hl-keyword">throw new</span> <span class="hl-type">Error</span>(<span class="hl-string">'Network failed'</span>);\n    \n    <span class="hl-keyword">const</span> data = <span class="hl-keyword">await</span> response.<span class="hl-function">json</span>();\n    <span class="hl-function">updateUI</span>(data);\n  } <span class="hl-keyword">catch</span> (err) {\n    console.<span class="hl-function">error</span>(<span class="hl-string">'Dashboard Error:'</span>, err.message);\n  }\n}`,
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
        code: `<span class="hl-keyword">import</span> React, { useState, useEffect } <span class="hl-keyword">from</span> <span class="hl-string">'react'</span>;\n\n<span class="hl-keyword">export default function</span> <span class="hl-function">Dashboard</span>() {\n  <span class="hl-keyword">const</span> [stats, setStats] = <span class="hl-function">useState</span>(<span class="hl-keyword">null</span>);\n\n  <span class="hl-function">useEffect</span>(() =&gt; {\n    <span class="hl-comment">// Track component lifecycle</span>\n    <span class="hl-function">fetchStats</span>().<span class="hl-function">then</span>(data =&gt; <span class="hl-function">setStats</span>(data));\n  }, []);\n\n  <span class="hl-keyword">return</span> (\n    <span class="hl-tag">&lt;div</span> <span class="hl-attr">className</span>=<span class="hl-string">"dashboard-container"</span><span class="hl-tag">&gt;</span>\n      <span class="hl-tag">&lt;h2&gt;</span>Active Sessions<span class="hl-tag">&lt;/h2&gt;</span>\n      {stats ? <span class="hl-tag">&lt;p&gt;</span>{stats.activeCount}<span class="hl-tag">&lt;/p&gt;</span> : <span class="hl-tag">&lt;p&gt;</span>Loading...<span class="hl-tag">&lt;/p&gt;</span>}\n    <span class="hl-tag">&lt;/div&gt;</span>\n  );\n}`,
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
        code: `<span class="hl-keyword">package</span> com.stackacademy.service;\n\n<span class="hl-keyword">import</span> java.util.List;\n<span class="hl-keyword">import</span> java.util.stream.Collectors;\n\n<span class="hl-keyword">public class</span> <span class="hl-type">UserService</span> {\n    <span class="hl-keyword">private final</span> <span class="hl-type">List</span>&lt;<span class="hl-type">String</span>&gt; databaseUsers;\n\n    <span class="hl-keyword">public</span> <span class="hl-function">UserService</span>(<span class="hl-type">List</span>&lt;<span class="hl-type">String</span>&gt; users) {\n        <span class="hl-keyword">this</span>.databaseUsers = users;\n    }\n\n    <span class="hl-keyword">public</span> <span class="hl-type">List</span>&lt;<span class="hl-type">String</span>&gt; <span class="hl-function">searchUsersByPrefix</span>(<span class="hl-type">String</span> prefix) {\n        <span class="hl-keyword">return</span> databaseUsers.stream()\n            .filter(user -&gt; user.toLowerCase().startsWith(prefix.toLowerCase()))\n            .collect(<span class="hl-type">Collectors</span>.toList());\n    }\n}`,
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
        code: `<span class="hl-keyword">package</span> com.stackacademy.controller;\n\n<span class="hl-keyword">import</span> org.springframework.web.bind.annotation.*;\n<span class="hl-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;\n\n<span class="hl-meta">@RestController</span>\n<span class="hl-meta">@RequestMapping</span>(<span class="hl-string">"/api/v1/courses"</span>)\n<span class="hl-keyword">public class</span> <span class="hl-type">CourseController</span> {\n\n    <span class="hl-meta">@GetMapping</span>\n    <span class="hl-keyword">public</span> <span class="hl-type">ResponseEntity</span>&lt;<span class="hl-type">List</span>&lt;<span class="hl-type">Course</span>&gt;&gt; <span class="hl-function">getAllCourses</span>() {\n        <span class="hl-type">List</span>&lt;<span class="hl-type">Course</span>&gt; courses = courseService.findAll();\n        <span class="hl-keyword">return</span> <span class="hl-type">ResponseEntity</span>.ok(courses);\n    }\n}`,
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
        code: `<span class="hl-comment">-- Select courses joined with student enrollment counts</span>\n<span class="hl-keyword">SELECT</span> \n  c.id, \n  c.title, \n  c.difficulty, \n  <span class="hl-function">COUNT</span>(e.student_id) <span class="hl-keyword">AS</span> total_enrolled\n<span class="hl-keyword">FROM</span> courses c\n<span class="hl-keyword">LEFT JOIN</span> enrollments e <span class="hl-keyword">ON</span> c.id = e.course_id\n<span class="hl-keyword">GROUP BY</span> c.id, c.title, c.difficulty\n<span class="hl-keyword">HAVING</span> <span class="hl-function">COUNT</span>(e.student_id) &gt; <span class="hl-string">5</span>\n<span class="hl-keyword">ORDER BY</span> total_enrolled <span class="hl-keyword">DESC</span>;`,
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
