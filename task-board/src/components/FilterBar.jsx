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
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

      <div className="grid gap-4 md:grid-cols-2">

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => {
            dispatch(
              setSearch(event.target.value)
            );
          }}
          className="rounded-lg border border-gray-300 px-4 py-2"
        />


        {/* Priority */}
        <select
          value={priority}
          onChange={(event) => {
            dispatch(
              setPriority(event.target.value)
            );
          }}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >

          <option value="all">
            All Priorities
          </option>

          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>

        </select>

      </div>

    </div>
  );
}

export default FilterBar;