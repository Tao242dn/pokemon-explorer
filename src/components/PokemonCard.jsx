import { formatPokemonId } from '../utils/pokemon'
import { TYPE_CLASS_NAMES } from '../constants/pokemonTypeStyles'

const getTypeClassName = (type) => TYPE_CLASS_NAMES[type] ?? 'bg-gray-100 text-gray-800'

const PokemonCard = ({ pokemon }) => {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
            {formatPokemonId(pokemon.id)}
          </p>
          <h3 className="mt-1 text-xl font-bold capitalize text-slate-950 dark:text-slate-50">
            {pokemon.name}
          </h3>
        </div>

        {pokemon.image ? (
          <img
            className="h-20 w-20 rounded-lg bg-slate-50 object-contain dark:bg-slate-800"
            src={pokemon.image}
            alt={pokemon.name}
            decoding="async"
            height="80"
            loading="lazy"
            width="80"
          />
        ) : (
          <div
            aria-label={`No image available for ${pokemon.name}`}
            className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-50 text-xs font-bold uppercase text-slate-400 dark:bg-slate-800 dark:text-slate-500"
            role="img"
          >
            No image
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${getTypeClassName(type)}`}
          >
            {type}
          </span>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md bg-slate-50 p-2 dark:bg-slate-800">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">HP</dt>
          <dd className="text-sm font-bold text-slate-950 dark:text-slate-50">{pokemon.hp}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-2 dark:bg-slate-800">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">Attack</dt>
          <dd className="text-sm font-bold text-slate-950 dark:text-slate-50">
            {pokemon.attack}
          </dd>
        </div>
        <div className="rounded-md bg-slate-50 p-2 dark:bg-slate-800">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">Speed</dt>
          <dd className="text-sm font-bold text-slate-950 dark:text-slate-50">{pokemon.speed}</dd>
        </div>
      </dl>
    </article>
  )
}

export default PokemonCard
