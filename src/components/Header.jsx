import SearchBox from './SearchBox'
import UserMenu from './UserMenu'

const iconButtonClassName =
  'rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-700'

const Header = ({
  isDarkTheme,
  onCartOpen,
  onLoginOpen,
  onLogout,
  onSearchTermChange,
  onThemeToggle,
  searchTerm,
  user,
}) => {
  return (
    <header className="flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
          PokeAPI
        </p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-slate-50 sm:text-5xl">
          Pokemon Explorer
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          Pikachu, I choose you
        </p>
      </div>

      <div className="flex w-full max-w-md flex-col gap-5">
        <div className="flex items-center justify-start gap-3 sm:justify-end">
          <button
            aria-label="Open shopping cart"
            className={iconButtonClassName}
            type="button"
            onClick={onCartOpen}
          >
            <i aria-hidden="true" className="fa-solid fa-cart-shopping"></i>
          </button>

          <button
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
            className={iconButtonClassName}
            type="button"
            onClick={onThemeToggle}
          >
            <i
              aria-hidden="true"
              className={`fa-solid ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`}
            ></i>
          </button>


          {user ? (
            <UserMenu onLogout={onLogout} user={user} />
          ) : (
            <button
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 cursor-pointer dark:focus:ring-emerald-900"
              type="button"
              onClick={onLoginOpen}
            >
              Login
            </button>
          )}
        </div>

        <SearchBox
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
        />
      </div>
    </header>
  )
}

export default Header
