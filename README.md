 *** React Task Dashboard

A modular React application demonstrating multiple UI and state-management tasks such as Todo List, Advanced Countdown Timer, Search with Highlight & Result Count, Form Handling with Password Toggle, and Dynamic Progress Bar.
This project focuses on clean UI, reusable components, and readable, maintainable code.

 *** Steps to Run the Project Locally
 
 *** Prerequisites

Make sure you have the following installed on your system:

Node.js: v18.x or later (recommended)

npm: v9.x or later (comes with Node.js)

To check versions:

node -v
npm -v

***  Installation Steps

Clone the repository

git clone <https://github.com/umaGannamani/react-intern-assignment.git>


Navigate into the project folder

cd react-task-dashboard


Install dependencies

npm install

*** Start the Project

Run the development server:

npm start


The app will be available at:

http://localhost:3000

*** Assumptions Made

*** Design Decisions

Used functional components with React Hooks (useState, useEffect, useRef) for modern React practices.

Centralized styling in index.css for consistency and easier maintenance.

Used responsive CSS (media queries) to ensure mobile compatibility.

UI components are designed to be independent and reusable.

Countdown Timer state is persisted using localStorage to survive page refreshes.

***  Libraries Used

react-icons for consistent, scalable icons (play, pause, reset, delete).

No UI framework (like MUI or Bootstrap) to demonstrate pure CSS skills.

*** Limitations / Trade-offs

No backend integration (data is managed locally or via localStorage).

No global state management (Redux/Zustand) since the app scope is limited.

Accessibility improvements (ARIA roles) can be enhanced further.

Error handling is minimal as this is a UI-focused task.

*** Code Quality Expectations (How This Project Meets Them)

*** Modularity

Each feature is broken into separate components:

TodoItem

CountdownTimer

Search

Form

MultiProgressBar

Components are single-responsibility focused.

Logic is separated from UI wherever possible.

*** Readability

Clean, consistent formatting across all files.

Logical grouping of hooks, handlers, and JSX.

Inline comments added where logic may not be obvious.

Consistent indentation and spacing.

*** Proper Naming

Descriptive variable names (timeLeft, initialTime, status)

Meaningful function names (start, pause, resume, reset)

Component names reflect responsibility (CountdownTimer, TodoItem)

CSS class names follow a readable structure (timer-display, todo-item, form-card)

*** Responsive Design

Mobile-specific fixes applied using media queries.

Countdown timer font scales properly on small screens.

Buttons stack vertically on mobile where required.

Scrollbars applied only where necessary (e.g., search result list).

*** Tech Stack

React.js

JavaScript (ES6+)

CSS3

React Icons

LocalStorage API

*** Live URL Link

https://react-intern-assignment-chi.vercel.app/

*** Git Repo

https://github.com/umaGannamani/react-intern-assignment.git

*** Summary

This project demonstrates:

Strong understanding of React fundamentals

Clean component architecture

Thoughtful UI/UX decisions

Responsive design handling

Maintainable and readable codebase
