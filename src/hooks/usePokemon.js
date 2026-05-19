import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchPokemonList } from '../api/pokemon'

export const usePokemon = (page) => {
  const [pokemon, setPokemon] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [failedCount, setFailedCount] = useState(0)
  const controllerRef = useRef(null)

  const fetchWithController = useCallback(async (controller, nextPage) => {
    try {
      const result = await fetchPokemonList(nextPage, controller.signal)

      if (controller.signal.aborted) {
        return
      }

      setPokemon(result.pokemon)
      setFailedCount(result.failedCount)
      setStatus('success')
    } catch (error) {
      if (error.name === 'AbortError') {
        return
      }

      setErrorMessage(error.message)
      setStatus('error')
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null
      }
    }
  }, [])

  const loadPokemon = useCallback((nextPage = page) => {
    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    setStatus('loading')
    setErrorMessage('')
    setFailedCount(0)

    fetchWithController(controller, nextPage)

    return controller
  }, [fetchWithController, page])

  useEffect(() => {
    const controller = loadPokemon(page)

    return () => controller.abort()
  }, [loadPokemon, page])

  return {
    errorMessage,
    failedCount,
    pokemon,
    retry: loadPokemon,
    status,
  }
}
