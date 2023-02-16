import React, { useState } from 'react'

import classNames from 'classnames'
import swell from 'swell-js'

import { useCartStore } from '../cart.store'
import './cart-item.styles.scss'
import { numberWithCommas } from './cart-total.component'

interface CartItemProps {
  item: swell.CartItem
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const setCart = useCartStore((state) => state.setCart)
  const [loading, setLoading] = useState(false)

  async function updateCart(action: 'add' | 'remove') {
    if (!item.id || !item.quantity || loading) return
    setLoading(true)
    const updatedCart = action === 'add' ? await add() : await remove()
    setCart(updatedCart)
    setLoading(false)
  }

  async function add() {
    return await swell.cart.updateItem(item.id!, { quantity: item.quantity! + 1 })
  }
  async function remove() {
    if (item.quantity === 1) {
      return await swell.cart.removeItem(item.id!)
    }
    return await swell.cart.updateItem(item.id!, { quantity: item.quantity! - 1 })
  }

  if (!item?.product || !item.price || !item.quantity) return null

  return (
    <div className='cartItem'>
      <img src={item.product.images?.[0]?.file?.url} alt={item.product.name} className='cartItem__image' />
      <div className='cartItem__content'>
        <h6 className='cartItem__name'>{item.product.name}</h6>
        <div className='cartItem__info'>
          <div className={classNames('cartItem__quantityBox', { cartItem__quantityBox_disabled: loading })}>
            <span
              className='cartItem__quantity cartItem__quantity_action cartItem__quantity_remove'
              onClick={() => updateCart('remove')}
            >
              -
            </span>
            <span className='cartItem__quantity'>{item.quantity}</span>
            <span
              className='cartItem__quantity cartItem__quantity_action cartItem__quantity_add'
              onClick={() => updateCart('add')}
            >
              +
            </span>
          </div>
          <div className='cartItem__price'>{numberWithCommas(item.price * item.quantity)}</div>
        </div>
      </div>
    </div>
  )
}
