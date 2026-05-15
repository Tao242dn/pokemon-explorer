import { dangerButtonClassName } from '../constants/classNames'

const CartSummary = ({ hasItems, totalQuantity, onClearCart }) => {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 text-sm dark:border-slate-800">
      <div className="grid grid-cols-2 gap-3">
        <p className="font-semibold text-slate-600 dark:text-slate-300">
          Total items
        </p>
        <p className="text-right font-black text-slate-950 dark:text-slate-50">
          {totalQuantity}
        </p>
      </div>

      {hasItems && (
        <button
          className={`flex w-full items-center justify-center gap-2 ${dangerButtonClassName}`}
          type="button"
          onClick={onClearCart}
        >
          <i aria-hidden="true" className="fa-solid fa-trash"></i>
          Clear cart
        </button>
      )}
    </div>
  )
}

export default CartSummary
