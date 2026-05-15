import CartEmptyState from './CartEmptyState'
import CartItem from './CartItem'
import CartLoginGate from './CartLoginGate'
import CartSummary from './CartSummary'
import Modal from './Modal'

const ShoppingCart = ({
  cartItems,
  onClearCart,
  onClose,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onLoginRequired,
  onRemoveItem,
  user,
}) => {
  const isLoggedIn = Boolean(user)
  const hasItems = cartItems.length > 0
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleLoginClick = () => {
    onClose()
    onLoginRequired()
  }

  return (
    <Modal
      eyebrow="Store"
      panelClassName="flex max-h-[90vh] max-w-lg flex-col"
      title="Shopping Cart"
      titleId="shopping-cart-title"
      onClose={onClose}
    >
      {isLoggedIn ? (
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          {hasItems ? (
            <ul className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item.pokemon.id}
                  onDecreaseQuantity={onDecreaseQuantity}
                  onIncreaseQuantity={onIncreaseQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </ul>
          ) : (
            <CartEmptyState />
          )}

          <CartSummary
            hasItems={hasItems}
            totalQuantity={totalQuantity}
            onClearCart={onClearCart}
          />
        </div>
      ) : (
        <CartLoginGate onLoginClick={handleLoginClick} />
      )}
    </Modal>
  )
}

export default ShoppingCart
