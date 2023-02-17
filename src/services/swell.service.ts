import swell from 'swell-js'

import { ICart, ISetCartOptions } from '../components/cart/cart.types'

swell.init('koi-test', 'pk_YPIa1LSEvM56M8sH9VB3mMomCE92F4Yo', {
  useCamelCase: true,
})

async function getCart() {
  return (await swell.cart.get()) as ICart | null
}

async function addItem(options: ISetCartOptions) {
  return (await swell.cart.addItem({
    product_id: options.productId,
    quantity: 1,
    options: [{ name: options.selectedOption?.optionName, value: options.selectedOption?.optionValue.name }],
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
async function removeCoupon() {
  return (await swell.cart.removeCoupon('')) as ICart
}

export const swellService = { getCart, addItem, increase, decrease, applyCoupon, removeCoupon }
