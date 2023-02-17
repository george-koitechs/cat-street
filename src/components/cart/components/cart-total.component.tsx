import React from 'react'

import classNames from 'classnames'
import { shallow } from 'zustand/shallow'

import { numberWithCommas } from '../../../helpers'
import { useCartStore } from '../cart.store'
import './cart-total.styles.scss'

interface CartTotalProps extends React.HTMLProps<HTMLDivElement> {
  withMT?: boolean
}

export const CartTotal: React.FC<CartTotalProps> = (props) => {
  const [shippingCost, cart] = useCartStore((state) => [state.shippingCost, state.cart], shallow)

  if (!cart || !cart.subTotal || !cart.grandTotal || cart.discountTotal === undefined) return null

  return (
    <div className={classNames('cartTotal', props.className)}>
      <div className='cartTotal__row'>
        <p className='cartTotal__title'>Subtotal</p>
        <p className='cartTotal__content'>${numberWithCommas(cart.subTotal)}</p>
      </div>

      <div className='cartTotal__row'>
        <p className='cartTotal__title'>Shipping</p>
        <p className='cartTotal__content'>{shippingCost === null ? 'calculated next step' : `$${shippingCost}`}</p>
      </div>

      {!!cart.discountTotal && (
        <div className='cartTotal__row'>
          <p className='cartTotal__title'>Discounts</p>
          <p className='cartTotal__content'>-${numberWithCommas(cart.discountTotal)}</p>
        </div>
      )}

      <div className={classNames('cartTotal__row', { cartTotal__row_total: props.withMT })}>
        <p className='cartTotal__title cartTotal__title_big'>TOTAL</p>
        <p className='cartTotal__content'>
          <span className='cartTotal__currency'>AUD</span>
          <span className='cartTotal__total'>${numberWithCommas(cart.grandTotal)}</span>
        </p>
      </div>
    </div>
  )
}
