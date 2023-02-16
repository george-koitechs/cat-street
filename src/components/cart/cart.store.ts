import swell from 'swell-js'
import { create } from 'zustand'

import { ICartItem } from './cart.types'

interface ICartState {
  isOpened: boolean
  open: () => void
  close: () => void
  setShippingCost: (shippingCost: string) => void
  items: ICartItem[]
  addItem: (item: ICartItem) => void
  removeItem: (item: ICartItem) => void
  shippingCost: string | null
  discount: number
  setDiscount: (d: number) => void
  cart: null | swell.Cart
  setCart: (cart: swell.Cart) => void
}

export const useCartStore = create<ICartState>((set) => ({
  isOpened: false,
  open: () => set({ isOpened: true }),
  close: () => set({ isOpened: false }),
  discount: 0,
  setDiscount: (discount) => set({ discount: discount * 3.14 }),
  shippingCost: null,
  setShippingCost: (shippingCost) => set({ shippingCost }),
  cart: null,
  setCart: (cart) => set({ cart }),
  items: [],
  addItem: (item) =>
    set((state) => {
      const isItemExist = !!state.items.find((el) => el.id === item.id)
      return {
        items: isItemExist
          ? state.items.map((el) => (el.id === item.id ? { ...el, quantity: el.quantity + 1 } : el))
          : [...state.items, item],
      }
    }),

  removeItem: (item) =>
    set((state) => {
      const quantity = state.items.find((el) => el.id === item.id)?.quantity
      const isLast = quantity === 1
      return {
        items: isLast
          ? state.items.filter((el) => el.id !== item.id)
          : state.items.map((el) => (el.id === item.id ? { ...el, quantity: el.quantity - 1 } : el)),
      }
    }),
}))
