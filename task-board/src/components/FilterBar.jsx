import { useDispatch, useSelector } from "react-redux";

import {
  setSearch,
  setPriority,
  selectSearch,
  selectPriority,
} from "../features/tasks/filters/filtersSlice";

function FilterBar() {
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);

  const priority = useSelector(selectPriority);

  return (
    <div className="mb-8 rounded-xl bg-gray-800 p-6 shadow-lg">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => {
            dispatch(
              setSearch(event.target.value)
            );
          }}
          className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-gray-400"
        />

        <select
          value={priority}
          onChange={(event) => {
            dispatch(
              setPriority(event.target.value)
            );
          }}
          className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-gray-400"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;