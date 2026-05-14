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

  const loadPokemon = useCallback(() => {
    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    setStatus('loading')
    setErrorMessage('')
    setFailedCount(0)

    fetchWithController(controller, page)
  }, [fetchWithController, page])

  useEffect(() => {
    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    queueMicrotask(() => {
      if (controller.signal.aborted) {
        return
      }

      setStatus('loading')
      setErrorMessage('')
      setFailedCount(0)

      fetchWithController(controller, page)
    })

    return () => controller.abort()
  }, [fetchWithController, page])

  return {
    errorMessage,
    failedCount,
    pokemon,
    retry: loadPokemon,
    status,
  }
}
