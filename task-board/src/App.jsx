import Board from "./components/Board";
import AddTaskForm from "./components/AddTaskForm";
import FilterBar from "./components/FilterBar";

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-700 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h1 className="text-3xl font-bold text-white">
            Task Board
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Redux Toolkit Kanban Board
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <AddTaskForm />
        <FilterBar />
        <Board />
      </main>
    </div>
  );
}

export default App;