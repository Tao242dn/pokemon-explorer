import { create } from 'zustand'
import { MAX_CART_ITEM_QUANTITY } from '../constants/cart'
import { toTitleCase } from '../utils/string'

const NOTIFICATION_DURATION = 2500

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

export const useCartStore = create((set, get) => ({
  cartItemsByStorageKey: {},
  cartNotification: null,
  notificationTimeoutId: null,

  getItems: (storageKey) => {
    if (!storageKey) return []
    const cached = get().cartItemsByStorageKey[storageKey]
    if (cached !== undefined) {
      return cached
    }
    return readStoredCart(storageKey)
  },

  initializeCart: (storageKey) => {
    if (!storageKey) return

    const { notificationTimeoutId } = get()
    if (notificationTimeoutId) {
      window.clearTimeout(notificationTimeoutId)
    }

    const state = get()
    const cachedItems = state.cartItemsByStorageKey[storageKey]
    const items = cachedItems !== undefined ? cachedItems : readStoredCart(storageKey)

    set((state) => ({
      cartNotification: null,
      notificationTimeoutId: null,
      cartItemsByStorageKey: {
        ...state.cartItemsByStorageKey,
        [storageKey]: items,
      },
    }))
  },

  notify: (message, type) => {
    const { notificationTimeoutId } = get()
    if (notificationTimeoutId) {
      window.clearTimeout(notificationTimeoutId)
    }

    const timeoutId = window.setTimeout(() => {
      set({ cartNotification: null, notificationTimeoutId: null })
    }, NOTIFICATION_DURATION)

    set({
      cartNotification: {
        id: Date.now(),
        message,
        type,
      },
      notificationTimeoutId: timeoutId,
    })
  },

  addToCart: (storageKey, pokemonToAdd) => {
    if (!storageKey) return

    const currentItems = get().getItems(storageKey)
    const existingItem = currentItems.find(
      (item) => item.pokemon.id === pokemonToAdd.id,
    )

    let nextItems
    if (existingItem) {
      nextItems = currentItems.map((item) =>
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
    } else {
      nextItems = [...currentItems, { pokemon: pokemonToAdd, quantity: 1 }]
    }

    window.localStorage.setItem(storageKey, JSON.stringify(nextItems))

    set((state) => ({
      cartItemsByStorageKey: {
        ...state.cartItemsByStorageKey,
        [storageKey]: nextItems,
      },
    }))

    get().notify(`${toTitleCase(pokemonToAdd.name)} added to cart`, 'add')
  },

  removeFromCart: (storageKey, pokemonId, pokemonName) => {
    if (!storageKey) return

    const currentItems = get().getItems(storageKey)
    const nextItems = currentItems.filter((item) => item.pokemon.id !== pokemonId)

    window.localStorage.setItem(storageKey, JSON.stringify(nextItems))

    set((state) => ({
      cartItemsByStorageKey: {
        ...state.cartItemsByStorageKey,
        [storageKey]: nextItems,
      },
    }))

    get().notify(`${toTitleCase(pokemonName)} removed from cart`, 'remove')
  },

  clearCart: (storageKey) => {
    if (!storageKey) return

    const nextItems = []
    window.localStorage.setItem(storageKey, JSON.stringify(nextItems))

    set((state) => ({
      cartItemsByStorageKey: {
        ...state.cartItemsByStorageKey,
        [storageKey]: nextItems,
      },
    }))

    get().notify('Shopping cart cleared', 'clear')
  },

  increaseQuantity: (storageKey, pokemonId) => {
    if (!storageKey) return

    const currentItems = get().getItems(storageKey)
    const nextItems = currentItems.map((item) =>
      item.pokemon.id === pokemonId
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, MAX_CART_ITEM_QUANTITY),
          }
        : item,
    )

    window.localStorage.setItem(storageKey, JSON.stringify(nextItems))

    set((state) => ({
      cartItemsByStorageKey: {
        ...state.cartItemsByStorageKey,
        [storageKey]: nextItems,
      },
    }))
  },

  decreaseQuantity: (storageKey, pokemonId) => {
    if (!storageKey) return

    const currentItems = get().getItems(storageKey)
    const nextItems = currentItems.map((item) => {
      if (item.pokemon.id !== pokemonId || item.quantity === 1) {
        return item
      }
      return { ...item, quantity: item.quantity - 1 }
    })

    window.localStorage.setItem(storageKey, JSON.stringify(nextItems))

    set((state) => ({
      cartItemsByStorageKey: {
        ...state.cartItemsByStorageKey,
        [storageKey]: nextItems,
      },
    }))
  },
}))
