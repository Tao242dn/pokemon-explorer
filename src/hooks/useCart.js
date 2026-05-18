import { useEffect, useMemo, useState } from 'react'
import { MAX_CART_ITEM_QUANTITY } from '../constants/cart'
import { toTitleCase } from '../utils/string'

const NOTIFICATION_DURATION = 2500
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

export const useCart = (userEmail) => {
  const storageKey = getCartStorageKey(userEmail)
  const [cartItemsByStorageKey, setCartItemsByStorageKey] = useState({})
  const [cartNotification, setCartNotification] = useState(null)
  const cartItems = useMemo(() => {
    return storageKey
      ? cartItemsByStorageKey[storageKey] ?? readStoredCart(storageKey)
      : []
  }, [cartItemsByStorageKey, storageKey])

  useEffect(() => {
    queueMicrotask(() => {
      setCartNotification(null)
    })
  }, [storageKey])

  useEffect(() => {
    if (!storageKey) {
      return
    }

    window.localStorage.setItem(storageKey, JSON.stringify(cartItems))
  }, [cartItems, storageKey])

  const updateActiveCart = (updater) => {
    if (!storageKey) {
      return
    }

    setCartItemsByStorageKey((currentCarts) => {
      const currentItems = currentCarts[storageKey] ?? readStoredCart(storageKey)
      const nextItems =
        typeof updater === 'function' ? updater(currentItems) : updater

      return {
        ...currentCarts,
        [storageKey]: nextItems,
      }
    })
  }

  useEffect(() => {
    if (!cartNotification) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setCartNotification(null)
    }, NOTIFICATION_DURATION)

    return () => window.clearTimeout(timeoutId)
  }, [cartNotification])

  const notify = (message, type) => {
    setCartNotification({
      id: Date.now(),
      message,
      type,
    })
  }

  const addToCart = (pokemonToAdd) => {
    if (!storageKey) {
      return
    }

    updateActiveCart((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.pokemon.id === pokemonToAdd.id,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.pokemon.id === pokemonToAdd.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  MAX_CART_ITEM_QUANTITY,
                ),
              }
            : item,
        )
      }

      return [...currentItems, { pokemon: pokemonToAdd, quantity: 1 }]
    })
    notify(`${toTitleCase(pokemonToAdd.name)} added to cart`, 'add')
  }

  const removeFromCart = (pokemonId, pokemonName) => {
    if (!storageKey) {
      return
    }

    updateActiveCart((currentItems) =>
      currentItems.filter((item) => item.pokemon.id !== pokemonId),
    )
    notify(`${toTitleCase(pokemonName)} removed from cart`, 'remove')
  }

  const clearCart = () => {
    if (!storageKey) {
      return
    }

    updateActiveCart([])
    notify('Shopping cart cleared', 'clear')
  }

  const increaseQuantity = (pokemonId) => {
    if (!storageKey) {
      return
    }

    updateActiveCart((currentItems) =>
      currentItems.map((item) =>
        item.pokemon.id === pokemonId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, MAX_CART_ITEM_QUANTITY),
            }
          : item,
      ),
    )
  }

  const decreaseQuantity = (pokemonId) => {
    if (!storageKey) {
      return
    }

    updateActiveCart((currentItems) =>
      currentItems.map((item) => {
        if (item.pokemon.id !== pokemonId || item.quantity === 1) {
          return item
        }

        return { ...item, quantity: item.quantity - 1 }
      }),
    )
  }

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
