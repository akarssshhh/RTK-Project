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

    if (!title.trim() || !description.trim()) {
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      status: "todo",
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <section className="mb-8 rounded-xl bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">
        Add New Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-gray-400"
        />

        <select
          value={priority}
          onChange={(event) => {
            setPriority(event.target.value);
          }}
          className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-gray-400"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-lg bg-gray-950 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Task"}
        </button>
      </form>
    </section>
  );
}

export default AddTaskForm;