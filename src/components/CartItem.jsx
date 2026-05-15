import { MAX_CART_ITEM_QUANTITY } from '../constants/cart'
import { formatPokemonId } from '../utils/pokemon'

const quantityButtonClassName =
  'flex h-8 w-8 items-center justify-center text-sm font-bold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-700'

const CartItem = ({
  item,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveItem,
}) => {
  const { pokemon, quantity } = item

  return (
    <li className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
      {pokemon.image ? (
        <img
          className="h-16 w-16 rounded-lg bg-white object-contain dark:bg-slate-900"
          src={pokemon.image}
          alt={pokemon.name}
          height="64"
          width="64"
        />
      ) : (
        <div
          aria-label={`No image available for ${pokemon.name}`}
          className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-xs font-bold uppercase text-slate-400 dark:bg-slate-900 dark:text-slate-500"
          role="img"
        >
          No image
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          {formatPokemonId(pokemon.id)}
        </p>
        <h3 className="truncate text-base font-bold capitalize text-slate-950 dark:text-slate-50">
          {pokemon.name}
        </h3>
        <div className="mt-2 flex w-fit items-center rounded-lg bg-white dark:bg-slate-900">
          <button
            aria-label={`Decrease ${pokemon.name} quantity`}
            className={`${quantityButtonClassName} rounded-l-lg`}
            disabled={quantity === 1}
            type="button"
            onClick={() => onDecreaseQuantity(pokemon.id)}
          >
            <i aria-hidden="true" className="fa-solid fa-minus"></i>
          </button>
          <span className="min-w-9 px-2 text-center text-sm font-black text-slate-950 dark:text-slate-50">
            {quantity}
          </span>
          <button
            aria-label={`Increase ${pokemon.name} quantity`}
            className={`${quantityButtonClassName} rounded-r-lg`}
            disabled={quantity === MAX_CART_ITEM_QUANTITY}
            type="button"
            onClick={() => onIncreaseQuantity(pokemon.id)}
          >
            <i aria-hidden="true" className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <button
        aria-label={`Remove ${pokemon.name} from cart`}
        className="rounded-lg px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 cursor-pointer dark:text-red-300 dark:hover:bg-red-950 dark:focus:ring-red-900"
        type="button"
        onClick={() => onRemoveItem(pokemon.id, pokemon.name)}
      >
        <i aria-hidden="true" className="fa-solid fa-trash"></i>
      </button>
    </li>
  )
}

export default CartItem
