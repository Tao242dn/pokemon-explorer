import { useEffect } from 'react'
import { useCartStore } from '../store/useCartStore'

const CART_STORAGE_KEY_PREFIX = 'poke-explore-cart'

const getCartStorageKey = (userEmail) =>
  userEmail ? `${CART_STORAGE_KEY_PREFIX}:${userEmail.toLowerCase()}` : null

const readStoredCart = (storageKey) => {
  if (!storageKey || typeof window === 'undefined') {
    return []
  }

  try {
    const storedCart = window.localStorage.getItem(storageKey)
    const parsedCart = storedCart ? JSON.parse(storedCart) : []

    return Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    return []
  }
}

const EMPTY_ARRAY = []

export const useCart = (userEmail) => {
  const storageKey = getCartStorageKey(userEmail)
  const initializeCart = useCartStore((state) => state.initializeCart)

  useEffect(() => {
    initializeCart(storageKey)
  }, [storageKey, initializeCart])

  const cachedItems = useCartStore((state) => {
    if (!storageKey) return EMPTY_ARRAY
    return state.cartItemsByStorageKey[storageKey]
  })

  const cartItems = cachedItems ?? (storageKey ? readStoredCart(storageKey) : EMPTY_ARRAY)

  const cartNotification = useCartStore((state) => state.cartNotification)
  const storeAddToCart = useCartStore((state) => state.addToCart)
  const storeRemoveFromCart = useCartStore((state) => state.removeFromCart)
  const storeClearCart = useCartStore((state) => state.clearCart)
  const storeIncreaseQuantity = useCartStore((state) => state.increaseQuantity)
  const storeDecreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const addToCart = (pokemonToAdd) => storeAddToCart(storageKey, pokemonToAdd)
  const removeFromCart = (pokemonId, pokemonName) => storeRemoveFromCart(storageKey, pokemonId, pokemonName)
  const clearCart = () => storeClearCart(storageKey)
  const increaseQuantity = (pokemonId) => storeIncreaseQuantity(storageKey, pokemonId)
  const decreaseQuantity = (pokemonId) => storeDecreaseQuantity(storageKey, pokemonId)

  return {
    addToCart,
    cartItems,
    cartNotification,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  }
}

