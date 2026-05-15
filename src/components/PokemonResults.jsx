import PokemonCard from './PokemonCard'

const PokemonResults = ({
  currentPage,
  errorMessage,
  failedCount,
  pokemon,
  retry,
  status,
  totalPages,
  onAddToCart,
}) => {
  if (status === 'loading') {
    return (
      <>
        <p className="sr-only" role="status">
          Loading Pokemon from PokeAPI.
        </p>
        <div
          aria-hidden="true"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="h-64 animate-pulse rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              key={index}
            />
          ))}
        </div>
      </>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        <h2 className="text-lg font-bold">Unable to fetch Pokemon</h2>
        <p className="mt-2 text-sm">{errorMessage}</p>
        <button
          className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900"
          type="button"
          onClick={retry}
        >
          Try again
        </button>
      </div>
    )
  }

  if (status !== 'success') {
    return null
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex flex-col gap-1 text-sm text-slate-500 dark:text-slate-400 sm:items-end">
          <p>Source: pokeapi.co</p>
          {failedCount > 0 && (
            <p className="font-medium text-amber-700 dark:text-amber-300">
              {failedCount} detail records could not be loaded.
            </p>
          )}
        </div>
      </div>

      {pokemon.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokemon.map((item) => (
            <li key={item.id}>
              <PokemonCard pokemon={item} onAddToCart={onAddToCart} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-950 dark:text-slate-50">
            No Pokemon found
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Try a different name, id, or type.
          </p>
        </div>
      )}
    </>
  )
}

export default PokemonResults
