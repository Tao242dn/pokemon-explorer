const USERS_STORAGE_KEY = 'poke-explore-users'
const SESSION_STORAGE_KEY = 'poke-explore-session'

const SEED_USERS = [
  {
    email: 'ash@poke.test',
    username: 'Ash',
    password: 'pikachu123',
  },
  {
    email: 'misty@poke.test',
    username: 'Misty',
    password: 'starmie123',
  },
]

const canUseLocalStorage = () => typeof window !== 'undefined' && window.localStorage

const readJson = (key, fallback) => {
  if (!canUseLocalStorage()) {
    return fallback
  }

  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeJson = (key, value) => {
  if (!canUseLocalStorage()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export const ensureSeedUsers = () => {
  const users = readJson(USERS_STORAGE_KEY, null)

  if (Array.isArray(users) && users.length > 0) {
    return users
  }

  writeJson(USERS_STORAGE_KEY, SEED_USERS)
  return SEED_USERS
}

export const getStoredSession = () => {
  const users = ensureSeedUsers()
  const session = readJson(SESSION_STORAGE_KEY, null)

  if (!session?.email) {
    return null
  }

  const user = users.find((item) => item.email === session.email)
  return user ? { email: user.email, username: user.username } : null
}

export const loginWithEmailAndPassword = ({ email, password }) => {
  const users = ensureSeedUsers()
  const normalizedEmail = email.trim().toLowerCase()
  const user = users.find(
    (item) => item.email.toLowerCase() === normalizedEmail && item.password === password,
  )

  if (!user) {
    throw new Error('Invalid email or password.')
  }

  const session = { email: user.email, username: user.username }
  writeJson(SESSION_STORAGE_KEY, session)

  return session
}

export const logoutStoredSession = () => {
  if (!canUseLocalStorage()) {
    return
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY)
}
