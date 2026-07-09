# Project Tracker – Week 4 Starter

This is the **Week 4 Starter** project for the Software Development Bootcamp.

It is used during the guided build session.

## What This Project Does

The Project Tracker is the same application built in Week 3.

It includes:

- Navigation links
- Add Task section (type a task name and click Add Task)
- Project board with To Do, In Progress, and Done columns
- Project Summary section
- About section

At the start of the guided build, all of the content and behaviour lives inside a single component called `App`.

During the session, you will extract sections into separate, reusable components.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`) in your browser.

## Project Structure

```text
src/
├── App.jsx             The root component. All content starts here.
├── main.jsx            Entry point. Connects React to the page.
├── components/         This folder is ready for your components.
│   └── (empty)         You will create files here during the guided build.
└── styles/
    └── style.css       Styles for the application.
```

## What You Will Do During the Guided Build

**Core steps:**

1. Explore the React project structure
2. Extract the header into `Header.jsx`
3. Extract the board into `Board.jsx`
4. Extract a task card into `TaskCard.jsx`
5. Reuse `TaskCard` for every card on the board
6. Pass title, description, and status using props
7. Extract the add task form into `AddTaskForm.jsx` — preserves the Add Task feature
8. Organise the application

**Optional extension:**

- Extract the project summary into `Summary.jsx`
- Extract the about section into `About.jsx`
