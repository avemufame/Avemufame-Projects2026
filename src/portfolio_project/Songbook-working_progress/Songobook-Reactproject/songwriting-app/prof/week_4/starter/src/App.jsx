// App.jsx
// =====================================================
// Project Tracker – Week 4 Starter
// =====================================================
//
// This is the Week 4 starting point.
// It contains the Week 3 Project Tracker application in React.
//
// All the Week 3 capability is preserved:
//   - navigation links
//   - Add Task section with input, button, and feedback
//   - project board with three columns
//   - project summary
//   - about section
//
// React needs somewhere to remember the current list of tasks.
// useState gives this component a simple piece of memory.
// When the tasks list changes, React updates the page automatically.
//
// During the guided build, we will extract sections into components.
//
//   Core guided build:
//     Part 2 – Extract header into Header.jsx
//     Part 3 – Extract the board into Board.jsx
//     Part 4 – Extract a task card into TaskCard.jsx
//     Part 5 – Reuse TaskCard for every card
//     Part 6 – Pass title, description, and status using props
//     Part 7 – Extract the add task form into AddTaskForm.jsx
//
//   Optional extension:
//     Summary.jsx
//     About.jsx
//

import { useState } from 'react'
import Header from './components/Header'


// The starting tasks for the board.
// Each task has an id, title, description, and status.
const initialTasks = [
  { id: 1, title: 'Create Header Component',      description: 'Extract the header into its own component file.',    status: 'todo' },
  { id: 2, title: 'Create TaskCard Component',    description: 'Extract a task card into a reusable component.',     status: 'todo' },
  { id: 3, title: 'Pass Information Using Props', description: 'Customise each card by passing different props.',     status: 'todo' },
  { id: 4, title: 'Organise The Application',     description: 'Move components into the components folder.',        status: 'in-progress' },
  { id: 5, title: 'Reuse Components',             description: 'Use the same component in multiple places.',         status: 'in-progress' },
  { id: 6, title: 'Create repository',            description: 'Set up the GitHub repository for the project.',      status: 'done' },
  { id: 7, title: 'Write README',                 description: 'Document the project purpose and setup steps.',      status: 'done' },
  { id: 8, title: 'Plan project backlog',         description: 'Write out the initial list of tasks.',               status: 'done' },
]

function App() {
  // React needs somewhere to remember the current list of tasks.
  // useState gives this component a simple piece of memory.
  const [tasks, setTasks] = useState(initialTasks)

  // Local state for the add task form
  const [inputValue, setInputValue] = useState('')
  const [statusMessage, setStatusMessage] = useState('Ready to add a task.')

  // Prepare a separate list for each board column.
  // App.jsx does this work up front so the board rendering stays simple.
  const todoTasks       = tasks.filter(function (task) { return task.status === 'todo' })
  const inProgressTasks = tasks.filter(function (task) { return task.status === 'in-progress' })
  const doneTasks       = tasks.filter(function (task) { return task.status === 'done' })

  // Add a new task to the To Do column
  function handleAddTask() {
    if (inputValue.trim() === '') {
      setStatusMessage('No task entered. Please type a task name.')
      return
    }
    const newTask = {
      id: tasks.length + 1,
      title: inputValue.trim(),
      description: 'Added during the session.',
      status: 'todo',
    }
    setTasks([...tasks, newTask])
    setStatusMessage('Task added: ' + inputValue.trim())
    setInputValue('')
  }

  return (
    <div className="app">

      {/* -------------------------------------------------- */}
      {/* TODO: Guided Build Part 2                           */}
      {/* Extract this header block into:                     */}
      {/*   src/components/Header.jsx                         */}
      {/* Then replace with: <Header />                       */}
      {/* -------------------------------------------------- */}
      <Header />

      <main>

        {/* -------------------------------------------------- */}
        {/* TODO: Guided Build Part 7                          */}
        {/* Preserve the Add Task feature with a component.    */}
        {/* Extract this form section into:                    */}
        {/*   src/components/AddTaskForm.jsx                   */}
        {/* -------------------------------------------------- */}
        <section className="page-section" id="add-task" aria-label="Add a task">
          <h2>Add a Task</h2>

         
          <p className="task-count">Total tasks: {tasks.length}</p>
        </section>

        {/* -------------------------------------------------- */}
        {/* TODO: Guided Build Parts 3–6                       */}
        {/*                                                    */}
        {/* Part 3 – Extract the board into Board.jsx          */}
        {/* Part 4 – Extract a task card into TaskCard.jsx     */}
        {/* Part 5 – Reuse TaskCard for every card             */}
        {/* Part 6 – Pass title, description, status as props  */}
        {/* -------------------------------------------------- */}
        <section className="page-section" id="board" aria-label="Project board">
          <h2>Dashboard</h2>
          <div className="board">

            <div className="column">
              <h3>To Do</h3>
              {/* This line creates one card for each task in the To Do list.    */}
              {/* We will understand this pattern more fully as we practise React. */}
              {todoTasks.map(function (task) {
                return (
                  <article key={task.id} className="card">
                    <p className="card-title">{task.title}</p>
                    <p className="card-description">{task.description}</p>
                    <span className="card-status">To Do</span>
                  </article>
                )
              })}
            </div>

            <div className="column">
              <h3>In Progress</h3>
              {inProgressTasks.map(function (task) {
                return (
                  <article key={task.id} className="card">
                    <p className="card-title">{task.title}</p>
                    <p className="card-description">{task.description}</p>
                    <span className="card-status">In Progress</span>
                  </article>
                )
              })}
            </div>

            <div className="column">
              <h3>Done</h3>
              {doneTasks.map(function (task) {
                return (
                  <article key={task.id} className="card">
                    <p className="card-title">{task.title}</p>
                    <p className="card-description">{task.description}</p>
                    <span className="card-status">Done</span>
                  </article>
                )
              })}
            </div>

          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* Optional extension: Extract into Summary.jsx        */}
        {/* -------------------------------------------------- */}
        <section className="page-section" id="summary">
          <h2>Project Summary</h2>
          <p>The Project Tracker helps plan and visualise work across three stages.</p>
          <h3>Current Progress</h3>
          <p>Total tasks on the board: <strong>{tasks.length}</strong></p>
          <h3>Next Milestone</h3>
          <p>Continue organising the application and exploring React components.</p>
        </section>

        {/* -------------------------------------------------- */}
        {/* Optional extension: Extract into About.jsx          */}
        {/* -------------------------------------------------- */}
        <section className="page-section" id="about">
          <h2>About This Project</h2>
          <p>The Project Tracker is a teaching reference app for the bootcamp.</p>
          <p>In Week 3, it introduced JavaScript and basic interactivity.</p>
          <p>In Week 4, the same application has been reorganised into React components.</p>
          <p>The visible capability is the same. The organisation is better.</p>
        </section>

      </main>

      <footer>
        <p>Project Tracker – Week 4 Starter.</p>
      </footer>

    </div>
  )
}

export default App
