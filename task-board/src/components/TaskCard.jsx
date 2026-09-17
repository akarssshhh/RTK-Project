import { useDispatch, useSelector } from "react-redux";

import {
  updateTask,
  deleteTask,
} from "../features/tasks/tasksSlice";

function TaskCard({ task }) {
  const dispatch = useDispatch();

  const saving = useSelector(
    (state) => state.tasks.saving
  );

  // Move task to next status
  const handleMoveNext = () => {
    let nextStatus;

    if (task.status === "todo") {
      nextStatus = "in-progress";
    } else if (task.status === "in-progress") {
      nextStatus = "done";
    } else {
      nextStatus = "todo";
    }

    const updatedTask = {
      ...task,
      status: nextStatus,
    };

    dispatch(updateTask(updatedTask));
  };

  // Delete task
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">

      <h3 className="text-lg font-semibold text-gray-900">
        {task.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {task.description}
      </p>

      <div className="mt-4 flex items-center gap-2">

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
          {task.priority}
        </span>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {task.status}
        </span>

      </div>

      {/* Move Button */}
      <button
        onClick={handleMoveNext}
        disabled={saving}
        className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : getButtonText(task.status)}
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={saving}
        className="mt-2 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving
          ? "Deleting..."
          : "Delete Task"}
      </button>

    </article>
  );
}

function getButtonText(status) {
  if (status === "todo") {
    return "Move to In Progress";
  }

  if (status === "in-progress") {
    return "Move to Done";
  }

  return "Move to To Do";
}

export default TaskCard;