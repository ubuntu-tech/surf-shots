export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  photographerId: string
  sessionId: string
}

export interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  isInCart: (itemId: string) => boolean
  clearCart: () => void
  total: number
} 