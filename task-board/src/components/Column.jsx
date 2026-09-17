import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <section className="rounded-xl bg-gray-200 p-4">

      {/* Column header */}
      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-700">
          {tasks.length}
        </span>

      </div>


      {/* Tasks */}
      <div className="space-y-4">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}

      </div>

    </section>
  );
}

export default Column;