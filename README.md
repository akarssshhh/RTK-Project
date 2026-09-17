# RTK Kanban Task Board

A Kanban Task Board built with React and Redux Toolkit (RTK) for managing tasks using global state management and a REST API.

## Features

- View tasks in Kanban columns
- Add new tasks
- Move tasks between:
  - To Do
  - In Progress
  - Done
- Delete tasks
- Search tasks by title and description
- Filter tasks by priority
- Display task count for each column
- Redux Toolkit for global state management
- Async API operations using `createAsyncThunk`
- Memoized filtering using `createSelector`

## Tech Stack

- React
- Redux Toolkit
- React Redux
- Vite
- Tailwind CSS
- JSON Server
- JavaScript

## Project Structure

```text
src/
├── app/
│   └── store.js
│
├── components/
│   ├── AddTaskForm.jsx
│   ├── Board.jsx
│   ├── Column.jsx
│   ├── FilterBar.jsx
│   └── TaskCard.jsx
│
├── features/
│   └── tasks/
│       ├── filters/
│       │   └── filtersSlice.js
│       └── tasksSlice.js
│
├── App.jsx
├── main.jsx
└── index.css
