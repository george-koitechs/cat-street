import { create } from 'zustand'

import { swellService } from '../../services/swell.service'
import { ICart, ISetCartOptions } from './cart.types'

interface ICartState {
  isOpened: boolean
  open: () => void
  close: () => void
  setShippingCost: (shippingCost: string) => void
  shippingCost: string | null
  discount: number
  setDiscount: (d: number) => void
  cart: null | ICart
  initCart: (cart: ICart | null) => void
  updateCart: (options: ISetCartOptions) => void
  increaseLocal: (itemId: string) => void
  increase: (itemId: string, quantity: number) => void
  decreaseLocal: (itemId: string) => void
  decrease: (itemId: string, quantity: number) => void
  applyCoupon: (couponCode: string) => void
  removeCoupon: (couponCode: string) => void
}

function makeIntermediateCart(state: ICartState, itemId: string, action: 'increase' | 'decrease') {
  return {
    ...state.cart,
    items: state.cart?.items?.map((el) => {
      if (el.id === itemId) {
        return {
          ...el,
          quantity: action === 'increase' ? ++el.quantity! : --el.quantity!,
          price: el.price!,
        }
      }
      return el
    }),
  } as ICart
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
  initCart: (cart) => set({ cart }),
  updateCart: async (options) => {
    const cartData = await swellService.addItem(options)
    set({ cart: cartData })
  },
  increaseLocal: async (itemId: string) => {
    set((state) => ({ cart: makeIntermediateCart(state, itemId, 'increase') }))
  },
  increase: async (itemId: string, quantity: number) => {
    const cartData = await swellService.increase(itemId, quantity)
    set({ cart: cartData })
  },
  decreaseLocal: async (itemId: string) => {
    set((state) => ({ cart: makeIntermediateCart(state, itemId, 'decrease') }))
  },
  decrease: async (itemId: string, quantity: number) => {
    const cartData = await swellService.decrease(itemId, quantity)
    set({ cart: cartData })
  },
  applyCoupon: async (couponCode: string) => {
    const cartData = await swellService.applyCoupon(couponCode)
    set({ cart: cartData })
  },
  removeCoupon: async (couponCode: string) => {
    const cartData = await swellService.removeCoupon(couponCode)
    set({ cart: cartData })
  },
}))
