import Board from "./components/Board";
import AddTaskForm from "./components/AddTaskForm";
import FilterBar from "./components/FilterBar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Task Board
          </h1>

          <p className="mt-1 text-sm text-gray-500">
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