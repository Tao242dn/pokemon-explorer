import { useMemo, useState } from 'react'
import { POKEMON_TOTAL_PAGES } from './api/pokemon'
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import Pagination from './components/Pagination'
import PokemonResults from './components/PokemonResults'
import ShoppingCart from './components/ShoppingCart'
import { useAuth } from './hooks/useAuth'
import { usePokemon } from './hooks/usePokemon'
import { useTheme } from './hooks/useTheme'
import { filterPokemon } from './utils/pokemon'

const App = () => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { isDarkTheme, theme, toggleTheme } = useTheme()
  const { login, logout, user } = useAuth()
  const { errorMessage, failedCount, pokemon, retry, status } = usePokemon(page)
  const pageNumbers = useMemo(
    () => Array.from({ length: POKEMON_TOTAL_PAGES }, (_, index) => index + 1),
    [],
  )

  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemon, searchTerm)
  }, [pokemon, searchTerm])

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
          user={user}
          onCartOpen={() => setIsCartOpen(true)}
          onLoginOpen={() => setIsLoginOpen(true)}
          onLogout={logout}
          onSearchTermChange={setSearchTerm}
          onThemeToggle={toggleTheme}
        />

        <PokemonResults
          currentPage={page}
          errorMessage={errorMessage}
          failedCount={failedCount}
          pokemon={filteredPokemon}
          retry={retry}
          status={status}
          totalPages={POKEMON_TOTAL_PAGES}
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
          user={user}
          onClose={() => setIsCartOpen(false)}
          onLoginRequired={() => setIsLoginOpen(true)}
        />
      )}
    </main>
  )
}

export default App
