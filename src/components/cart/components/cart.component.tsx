import { navigate } from 'gatsby'

import { useEffect, useState } from 'react'

import { Skeleton } from '@mui/material'
import { useLocation } from '@reach/router'
import classNames from 'classnames'
import swell from 'swell-js'
import { shallow } from 'zustand/shallow'

import { swellService } from '../../../services/swell.service'
import { Button } from '../../__ui-kit/button/button.component'
import { useCartStore } from '../cart.store'
import { CartAd } from './cart-ad.component'
import { CartItem } from './cart-item.component'
import { CartPromo } from './cart-promo.component'
import { CartTotal } from './cart-total.component'
import './cart.styles.scss'

export const Cart = () => {
  const location = useLocation()
  const isCheckoutPage = location.pathname === '/checkout'
  const [cartLoading, setCartLoading] = useState(false)
  const [isOpened, close, cart, initCart] = useCartStore(
    (state) => [state.isOpened, state.close, state.cart, state.initCart],
    shallow
  )

  function goToCheckout() {
    close()
    navigate('/checkout')
  }

  async function getCart() {
    setCartLoading(true)
    const cartData = await swellService.getCart()
    setCartLoading(false)
    if (cartData) initCart(cartData)
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <div className={classNames('cart', { cart_active: isOpened })}>
      <div className={classNames('cart__overlay', { cart__overlay_active: isOpened })} onClick={close}></div>
      <div className={classNames('cart__sidebar', { cart__sidebar_active: isOpened })}>
        <Button onClick={async () => await swell.cart.setItems([])}>Clear</Button>
        <div className='cart__head'>
          <button className='cart__close' onClick={close}>
            <span></span>
            <span></span>
          </button>
          <h6 className='cart__title'>Your Cart</h6>
        </div>
        {cartLoading ? (
          <>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
          </>
        ) : !!cart?.items?.length ? (
          <>
            <div className='cart__content'>
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <CartPromo />
              {isCheckoutPage && <CartAd className='cart__ad' />}
            </div>
            <CartTotal className='cart__total' />
            <Button variant='v2' className='cart__checkoutNow' onClick={goToCheckout}>
              Checkout now
            </Button>
          </>
        ) : (
          <p className='cart__empty'>There’s nothing for your poor cat in your cart!</p>
        )}
      </div>
    </div>
  )
}
