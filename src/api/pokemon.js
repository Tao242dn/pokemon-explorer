import { normalizePokemonDetail } from '../utils/pokemon'

const POKEMON_PAGE_SIZE = 100
const POKEMON_TOTAL_ITEMS = 1000
export const POKEMON_TOTAL_PAGES = POKEMON_TOTAL_ITEMS / POKEMON_PAGE_SIZE

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

const getPokemonListUrl = (page) => {
  const offset = (page - 1) * POKEMON_PAGE_SIZE
  const url = new URL(API_URL)
  url.searchParams.set('limit', String(POKEMON_PAGE_SIZE))
  url.searchParams.set('offset', String(offset))

  return url.toString()
}

const throwIfAborted = (signal) => {
  if (!signal.aborted) {
    return
  }

  const error = new Error('Aborted')
  error.name = 'AbortError'
  throw error
}

const fetchPokemonDetail = async (item, signal) => {
  const response = await fetch(item.url, { signal })

  if (!response.ok) {
    throw new Error(`Could not load ${item.name}.`)
  }

  return normalizePokemonDetail(await response.json())
}

export const fetchPokemonList = async (page, signal) => {
  const response = await fetch(getPokemonListUrl(page), { signal })

  if (!response.ok) {
    throw new Error('Could not load pokemon list.')
  }

  const data = await response.json()
  throwIfAborted(signal)

  const results = await Promise.allSettled(
    data.results.map((item) => fetchPokemonDetail(item, signal)),
  )
  throwIfAborted(signal)

  const pokemon = results
    .filter((result) => result.status === 'fulfilled' && result.value)
    .map((result) => result.value)

  const failedCount = results.length - pokemon.length

  if (pokemon.length === 0) {
    throw new Error('Pokemon list loaded, but no detail records were usable.')
  }

  return {
    failedCount,
    pokemon,
    totalCount: results.length,
  }
}
