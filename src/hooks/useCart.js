import { useEffect, useState } from 'react'
import { MAX_CART_ITEM_QUANTITY } from '../constants/cart'
import { toTitleCase } from '../utils/string'

const NOTIFICATION_DURATION = 2500

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [cartNotification, setCartNotification] = useState(null)

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
    setCartItems((currentItems) => {
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
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.pokemon.id !== pokemonId),
    )
    notify(`${toTitleCase(pokemonName)} removed from cart`, 'remove')
  }

  const clearCart = () => {
    setCartItems([])
    notify('Shopping cart cleared', 'clear')
  }

  const increaseQuantity = (pokemonId) => {
    setCartItems((currentItems) =>
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
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.pokemon.id !== pokemonId || item.quantity === 1) {
          return item
        }

        return { ...item, quantity: item.quantity - 1 }
      }),
    )
  }

  const dismissNotification = () => {
    setCartNotification(null)
  }

  return {
    addToCart,
    cartItems,
    cartNotification,
    clearCart,
    decreaseQuantity,
    dismissNotification,
    increaseQuantity,
    removeFromCart,
  }
}
