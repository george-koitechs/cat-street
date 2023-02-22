import swell from 'swell-js'

import { ICart, ISetCartOptions } from '../components/cart/cart.types'

swell.init('csau', 'pk_5ocZPhVU8ddxjraDCMskKst124QEV5mZ')

async function getCart() {
  return (await swell.cart.get()) as ICart | null
}

async function addItem(options: ISetCartOptions) {
  // const requestOptions = Object.entries(options.selectedOptions).map(([optionId, optionValue]) => ({
  //   name: optionId,
  //   value: optionValue.name,
  // }))

  return (await swell.cart.addItem({
    product_id: options.productId,
    quantity: 1,
    // options: requestOptions as [object],
  })) as ICart
}

async function increase(itemId: string, quantity: number) {
  return (await swell.cart.updateItem(itemId, { quantity })) as ICart
}

async function decrease(itemId: string, quantity: number) {
  if (quantity === 0) {
    return (await swell.cart.removeItem(itemId)) as ICart
  }
  return (await swell.cart.updateItem(itemId, { quantity })) as ICart
}

async function applyCoupon(coupon: string) {
  return (await swell.cart.applyCoupon(coupon)) as ICart
}
async function removeCoupon(coupon: string) {
  return (await swell.cart.removeCoupon(coupon)) as ICart
}

export const swellService = { getCart, addItem, increase, decrease, applyCoupon, removeCoupon }
