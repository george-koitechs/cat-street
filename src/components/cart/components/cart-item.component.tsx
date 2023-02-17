import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import swell from 'swell-js'
import { shallow } from 'zustand/shallow'

import { numberWithCommas } from '../../../helpers'
import { useDebounce } from '../../../helpers/use-debounce'
import { useCartStore } from '../cart.store'
import './cart-item.styles.scss'

interface CartItemProps {
  item: swell.CartItem
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [increase, decrease, increaseLocal, decreaseLocal] = useCartStore(
    (state) => [state.increase, state.decrease, state.increaseLocal, state.decreaseLocal],
    shallow
  )
  const [finalQuantity, setFinalQuantity] = useState<null | number>(null)
  const debouncedQuantity = useDebounce(finalQuantity)

  async function updateCart(action: 'add' | 'remove') {
    if (!item.id || !item.quantity) return
    setFinalQuantity((prev) => {
      const prevValue = prev ?? 0
      return action === 'add' ? prevValue + 1 : prevValue - 1
    })
    action === 'add' ? increaseLocal(item.id) : decreaseLocal(item.id)
  }

  useEffect(() => {
    if (finalQuantity !== null && item.id && item.quantity !== undefined) {
      finalQuantity > 0 ? increase(item.id, item.quantity) : decrease(item.id, item.quantity)
    }
    setFinalQuantity(null)
  }, [debouncedQuantity])

  if (!item?.product || !item.price || !item.quantity) return null

  return (
    <div className='cartItem'>
      <img src={item.product.images?.[0]?.file?.url} alt={item.product.name} className='cartItem__image' />
      <div className='cartItem__content'>
        <h6 className='cartItem__name'>{item.product.name}</h6>
        <div className='cartItem__options'>
          {(item.options as IOption[])?.map((option) => (
            <small>
              <b>{option.name}: </b>
              {option.value}
            </small>
          ))}
        </div>
        <div className='cartItem__info'>
          <div className={classNames('cartItem__quantityBox')}>
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
