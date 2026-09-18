import { useState } from "react";
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

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description
  );

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

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
    };

    dispatch(updateTask(updatedTask));

    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="flex h-75 flex-col rounded-lg bg-gray-700 p-5 shadow-md">
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white outline-none focus:border-gray-400"
        />

        <textarea
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          className="mt-3 w-full resize-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white outline-none focus:border-gray-400"
          rows="4"
        />

        <div className="mt-auto">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-gray-950 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={handleCancel}
            disabled={saving}
            className="mt-2 w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-75 flex-col rounded-lg bg-gray-700 p-5 shadow-md">
      <h3 className="text-lg font-semibold text-white">
        {task.title}
      </h3>

      <p className="mt-2 flex-1 overflow-hidden text-sm leading-6 text-gray-300">
        {task.description}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-medium capitalize text-gray-200">
          {task.priority}
        </span>

        <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-medium text-gray-200">
          {task.status}
        </span>
      </div>

      <button
        onClick={() => {
          setIsEditing(true);
        }}
        disabled={saving}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Edit Task
      </button>

      <button
        onClick={handleMoveNext}
        disabled={saving}
        className="mt-2 w-full rounded-lg bg-gray-950 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : getButtonText(task.status)}
      </button>

      <button
        onClick={handleDelete}
        disabled={saving}
        className="mt-2 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Deleting..." : "Delete Task"}
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