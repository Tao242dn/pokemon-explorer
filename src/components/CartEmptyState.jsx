const CartEmptyState = () => {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-950">
      <h3 className="text-lg font-bold text-slate-950 dark:text-slate-50">
        Your cart is empty
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        Add Pokemon from the explorer to see them here.
      </p>
    </div>
  )
}

export default CartEmptyState
