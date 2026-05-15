import { primaryButtonClassName } from '../constants/classNames'

const CartLoginGate = ({ onLoginClick }) => {
  return (
    <div className="p-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950">
        <h3 className="text-lg font-bold text-amber-950 dark:text-amber-100">
          Please login to view your cart
        </h3>
        <p className="mt-2 text-sm leading-6 text-amber-800 dark:text-amber-200">
          Cart products are only visible after you login to your account.
        </p>
        <button
          className={`mt-5 ${primaryButtonClassName}`}
          type="button"
          onClick={onLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default CartLoginGate
