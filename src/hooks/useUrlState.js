import { useEffect, useState } from 'react'

export const useUrlState = (key, defaultValue, type = 'string') => {
  const [state, setState] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const param = searchParams.get(key)

    if (param === null) {
      return defaultValue
    }

    if (type === 'number') {
      const parsed = Number(param)
      return Number.isNaN(parsed) ? defaultValue : parsed
    }

    return param
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    
    if (state === defaultValue) {
      searchParams.delete(key)
    } else {
      searchParams.set(key, String(state))
    }

    const newSearch = searchParams.toString()
    const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`
    window.history.replaceState(null, '', newUrl)
  }, [key, state, defaultValue])

  return [state, setState]
}
