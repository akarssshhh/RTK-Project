import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";

function AddTaskForm() {
  const dispatch = useDispatch();

  const saving = useSelector(
    (state) => state.tasks.saving
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      title: title,
      description: description,
      status: "todo",
      priority: priority,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Add New Task
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        {/* Title */}
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
          required
        />

        {/* Description */}
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
          required
        />

        {/* Priority */}
        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-4 rounded-lg bg-gray-900 px-5 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Add Task"}
      </button>
    </form>
  );
}

export default AddTaskForm;