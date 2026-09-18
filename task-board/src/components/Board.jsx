import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "./Column";
import {
  fetchTasks,
  selectAllTasks,
  selectTaskStatus,
  selectTaskError,
} from "../features/tasks/tasksSlice";

function Board() {
  const dispatch = useDispatch();

  const tasks = useSelector(selectAllTasks);
  const status = useSelector(selectTaskStatus);
  const error = useSelector(selectTaskError);

  const search = useSelector(
    (state) => state.filters.search
  );

  const priority = useSelector(
    (state) => state.filters.priority
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText);

    const matchesPriority =
      priority === "all" ||
      task.priority === priority;

    return matchesSearch && matchesPriority;
  });

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );

  const doneTasks = filteredTasks.filter(
    (task) => task.status === "done"
  );

  if (status === "loading") {
    return (
      <main className="mx-auto flex max-w-7xl justify-center px-6 py-12">
        <p className="text-gray-300">
          Loading tasks...
        </p>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-red-400">
          {error}
        </p>
      </main>
    );
  }

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