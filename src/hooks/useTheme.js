import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'poke-explore-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  } catch {
    return 'light'
  }
}

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDarkTheme = theme === 'dark'

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch(e) {
      console.error(e)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return {
    isDarkTheme,
    theme,
    toggleTheme,
  }
}
