const ShoppingCart = ({ onClose, onLoginRequired, user }) => {
  const isLoggedIn = Boolean(user)

  const handleLoginClick = () => {
    onClose()
    onLoginRequired()
  }

  return (
    <div
      aria-labelledby="shopping-cart-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
      role="dialog"
    >
      <section className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-slate-800">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Store
            </p>
            <h2
              id="shopping-cart-title"
              className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-50"
            >
              Shopping Cart
            </h2>
          </div>

          <button
            aria-label="Close shopping cart"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {isLoggedIn ? (
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-950">
              <h3 className="text-lg font-bold text-slate-950 dark:text-slate-50">
                Your cart is empty
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Products added to the cart will appear here after the cart
                logic is implemented.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 text-sm dark:border-slate-800">
              <p className="font-semibold text-slate-600 dark:text-slate-300">Subtotal</p>
              <p className="text-right font-black text-slate-950 dark:text-slate-50">$0.00</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950">
              <h3 className="text-lg font-bold text-amber-950 dark:text-amber-100">
                Please login to view your cart
              </h3>
              <p className="mt-2 text-sm leading-6 text-amber-800 dark:text-amber-200">
                Cart products are only visible after you login to your account.
              </p>
              <button
                className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 cursor-pointer dark:focus:ring-emerald-900"
                type="button"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default ShoppingCart
