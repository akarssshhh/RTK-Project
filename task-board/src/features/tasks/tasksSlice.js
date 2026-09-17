import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

// GET - Fetch all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const response = await fetch("http://localhost:3001/tasks");

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return response.json();
  }
);

// POST - Add a new task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask) => {
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    return response.json();
  }
);

// PUT - Update / Move task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask) => {
    const response = await fetch(
      `http://localhost:3001/tasks/${updatedTask.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return response.json();
  }
);

// DELETE - Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    const response = await fetch(
      `http://localhost:3001/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    return taskId;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  saving: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ADD TASK
      .addCase(addTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.saving = false;
        state.items.push(action.payload);
      })

      .addCase(addTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      })

      // UPDATE TASK
      .addCase(updateTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.saving = false;

        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(updateTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      })

      // DELETE TASK
      .addCase(deleteTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.saving = false;

        state.items = state.items.filter(
          (task) => task.id !== action.payload
        );
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      });
  },
});

/*
  SELECTORS
*/

// Get all tasks
export const selectAllTasks = (state) => state.tasks.items;

// Get task loading status
export const selectTaskStatus = (state) => state.tasks.status;

// Get task error
export const selectTaskError = (state) => state.tasks.error;

// Get saving status
export const selectTaskSaving = (state) => state.tasks.saving;


/*
  MEMOIZED FILTERED TASKS SELECTOR

  This selector receives:
  1. All tasks
  2. Filters

  It recalculates only when tasks or filters change.
*/

export const selectFilteredTasks = createSelector(
  [
    selectAllTasks,
    (state) => state.filters.search,
    (state) => state.filters.priority,
  ],

  (tasks, search, priority) => {
    const searchText = search.toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText);

      const matchesPriority =
        priority === "all" ||
        task.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }
);


// Get To Do tasks
export const selectTodoTasks = createSelector(
  [selectFilteredTasks],
  (tasks) => tasks.filter((task) => task.status === "todo")
);


// Get In Progress tasks
export const selectInProgressTasks = createSelector(
  [selectFilteredTasks],
  (tasks) =>
    tasks.filter((task) => task.status === "in-progress")
);


// Get Done tasks
export const selectDoneTasks = createSelector(
  [selectFilteredTasks],
  (tasks) => tasks.filter((task) => task.status === "done")
);

export default tasksSlice.reducer;