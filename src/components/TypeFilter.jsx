import { POKEMON_TYPES } from '../constants/pokemonTypes'

const TypeFilter = ({ selectedType, onTypeChange }) => {
  return (
    <div>
      <label
        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
        htmlFor="pokemon-type-filter"
      >
        Filter by type
      </label>
      <div className="relative mt-2">
        <select
          id="pokemon-type-filter"
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:focus:ring-emerald-900"
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="all">All Types</option>
          {Object.keys(POKEMON_TYPES).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </div>
  )
}

export default TypeFilter
