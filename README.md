# FullStackNotes 🚀

FullStackNotes is a high-fidelity, interactive educational platform designed for mastering the Full Stack ecosystem. Originally built with vanilla HTML/JS/CSS, it has been completely refactored into a modern, component-driven **React** application powered by **Vite**.

## ✨ Features

- **Premium UI/UX:** Stunning glassmorphism design, smooth transitions, and ambient glowing backgrounds built entirely with CSS.
- **Interactive Sandbox:** Dynamic code blocks with live-updating themes depending on the active topic (React, Spring Boot, SQL, etc.).
- **Component-Driven Architecture:** Clean, modular React code utilizing Context API for scalable global state management.
- **Dynamic Routing:** Client-side routing via `react-router-dom` to deliver specialized course pages without full page reloads.
- **Copy-to-Clipboard Functionality:** Unified toast notifications for effortlessly grabbing code snippets.

## 🛠️ Technology Stack

- **Frontend Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Styling:** Vanilla CSS & CSS Variables
- **Icons:** Native SVG paths (Zero bloat)

## 📁 Project Structure

```text
fullstack-website/
├── public/                 
│   └── data/               # JSON files containing detailed course syllabus (html.json, java.json, etc.)
├── src/                    
│   ├── assets/             # Global stylesheets and static assets (main.css)
│   ├── components/         
│   │   ├── layout/         # Structural components (Navbar, Footer)
│   │   └── ui/             # Reusable UI elements (CodeBlock, QuickAccessCard)
│   ├── context/            # React Context (CourseContext.jsx for global topic state)
│   ├── data/               # Core data structures (topics.js)
│   ├── pages/              # Main route views (LandingPage.jsx, CoursePage.jsx)
│   ├── App.jsx             # Root layout and Route definitions
│   └── main.jsx            # React application entry point
├── index.html              # Base HTML template
└── package.json            # Project dependencies and scripts
```

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fullstack-notes.git
   cd fullstack-notes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 💡 Architecture & Design Patterns

During the React migration, the following patterns were implemented:
- **Provider Pattern:** `CourseContext.jsx` provides global state (active topic, course data loading) eliminating prop-drilling.
- **Separation of Concerns (SoC):** Heavy DOM manipulation and hardcoded HTML strings were decoupled. Detailed course data was migrated to asynchronous `.json` endpoints hosted in `public/data`.
- **Composition:** Complex pages like `LandingPage.jsx` are constructed by assembling modular components (`QuickAccessCard`, `CodeBlock`).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
