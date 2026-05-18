import { useMemo, useState } from 'react'
import { POKEMON_TOTAL_PAGES } from './constants/pagination'
import CartNotification from './components/CartNotification'
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import Pagination from './components/Pagination'
import PokemonResults from './components/PokemonResults'
import ShoppingCart from './components/ShoppingCart'
import { useAuth } from './hooks/useAuth'
import { useCart } from './hooks/useCart'
import { usePokemon } from './hooks/usePokemon'
import { useTheme } from './hooks/useTheme'
import { useUrlState } from './hooks/useUrlState'
import { filterPokemon } from './utils/pokemon'

const App = () => {
  const [page, setPage] = useUrlState('page', 1, 'number')
  const [searchTerm, setSearchTerm] = useUrlState('search', '', 'string')
  const [selectedType, setSelectedType] = useUrlState('type', 'all', 'string')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const {
    addToCart,
    cartItems,
    cartNotification,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCart()
  const { isDarkTheme, theme, toggleTheme } = useTheme()
  const { login, logout, user } = useAuth()
  const { errorMessage, failedCount, pokemon, retry, status } = usePokemon(page)
  const pageNumbers = useMemo(
    () => Array.from({ length: POKEMON_TOTAL_PAGES }, (_, index) => index + 1),
    [],
  )

  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemon, searchTerm, selectedType)
  }, [pokemon, searchTerm, selectedType])

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), POKEMON_TOTAL_PAGES))
  }

  return (
    <main
      className={`min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-50 ${theme}`}
    >
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Header
          isDarkTheme={isDarkTheme}
          searchTerm={searchTerm}
          selectedType={selectedType}
          user={user}
          onCartOpen={() => setIsCartOpen(true)}
          onLoginOpen={() => setIsLoginOpen(true)}
          onLogout={logout}
          onSearchTermChange={setSearchTerm}
          onThemeToggle={toggleTheme}
          onTypeChange={setSelectedType}
        />

        <PokemonResults
          currentPage={page}
          errorMessage={errorMessage}
          failedCount={failedCount}
          pokemon={filteredPokemon}
          retry={retry}
          status={status}
          totalPages={POKEMON_TOTAL_PAGES}
          onAddToCart={addToCart}
        />

        {status === 'success' && (
          <Pagination
            currentPage={page}
            pageNumbers={pageNumbers}
            totalPages={POKEMON_TOTAL_PAGES}
            onPageChange={goToPage}
          />
        )}
      </section>

      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={login} />
      )}

      {isCartOpen && (
        <ShoppingCart
          cartItems={cartItems}
          user={user}
          onClearCart={clearCart}
          onClose={() => setIsCartOpen(false)}
          onDecreaseQuantity={decreaseQuantity}
          onIncreaseQuantity={increaseQuantity}
          onLoginRequired={() => setIsLoginOpen(true)}
          onRemoveItem={removeFromCart}
        />
      )}

      <CartNotification
        notification={cartNotification}
      />
    </main>
  )
}

export default App
