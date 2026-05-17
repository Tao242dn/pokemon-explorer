const SearchBox = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div>
      <label
        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
        htmlFor="pokemon-search"
      >
        Search by name, id, or type
      </label>
      <input
        id="pokemon-search"
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:ring-emerald-900"
        placeholder="Raichu, 25, grass"
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBox
