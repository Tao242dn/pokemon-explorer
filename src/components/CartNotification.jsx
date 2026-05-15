const CartNotification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const isDestructive = notification.type === 'clear' || notification.type === 'remove'

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-60 w-[min(calc(100vw-2rem),22rem)] rounded-lg border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900"
      role="status"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            isDestructive
              ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
          }`}
        >
          <i
            aria-hidden="true"
            className={`fa-solid ${
              isDestructive ? 'fa-trash' : 'fa-cart-plus'
            }`}
          ></i>
        </div>

        <div className="min-w-0 flex-1 mt-2">
          <p className="text-sm font-bold text-slate-950 dark:text-slate-50">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartNotification
