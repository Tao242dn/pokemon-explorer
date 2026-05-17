import {
  iconButtonClassName,
  primaryButtonClassName,
} from '../constants/classNames'
import SearchBox from './SearchBox'
import TypeFilter from './TypeFilter'
import UserMenu from './UserMenu'

const Header = ({
  isDarkTheme,
  onCartOpen,
  onLoginOpen,
  onLogout,
  onSearchTermChange,
  onThemeToggle,
  onTypeChange,
  searchTerm,
  selectedType,
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
            className={`border border-slate-300 ${iconButtonClassName}`}
            type="button"
            onClick={onCartOpen}
          >
            <i aria-hidden="true" className="fa-solid fa-cart-shopping"></i>
          </button>

          <button
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
            className={`border border-slate-300 ${iconButtonClassName}`}
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
              className={primaryButtonClassName}
              type="button"
              onClick={onLoginOpen}
            >
              Login
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <SearchBox
              searchTerm={searchTerm}
              onSearchTermChange={onSearchTermChange}
            />
          </div>
          <div className="w-full sm:w-48">
            <TypeFilter
              selectedType={selectedType}
              onTypeChange={onTypeChange}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
