import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "./Column";

import {
  fetchTasks,
  selectTaskStatus,
  selectTaskError,
  selectTodoTasks,
  selectInProgressTasks,
  selectDoneTasks,
} from "../features/tasks/tasksSlice";

function Board() {
  const dispatch = useDispatch();

  // Read data using named selectors
  const status = useSelector(selectTaskStatus);

  const error = useSelector(selectTaskError);

  const todoTasks = useSelector(selectTodoTasks);

  const inProgressTasks = useSelector(
    selectInProgressTasks
  );

  const doneTasks = useSelector(selectDoneTasks);


  // Fetch tasks when Board loads
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  // Loading state
  if (status === "loading") {
    return (
      <main className="mx-auto flex max-w-7xl justify-center px-6 py-12">
        <p>Loading tasks...</p>
      </main>
    );
  }


  // Error state
  if (status === "failed") {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-red-600">
          {error}
        </p>
      </main>
    );
  }


  // Display board
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">

      <div className="grid gap-6 md:grid-cols-3">

        <Column
          title="To Do"
          tasks={todoTasks}
        />

        <Column
          title="In Progress"
          tasks={inProgressTasks}
        />

        <Column
          title="Done"
          tasks={doneTasks}
        />

      </div>

    </main>
  );
}

export default Board;