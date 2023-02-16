import React from 'react'

import { Button } from '../__ui-kit/button/button.component'
import { useCartStore } from '../cart/cart.store'
import { CartAd } from '../cart/components/cart-ad.component'
import { CartItem } from '../cart/components/cart-item.component'
import { CartPromo } from '../cart/components/cart-promo.component'
import { CartTotal } from '../cart/components/cart-total.component'
import './checkout.styles.scss'

export const Checkout = () => {
  const cart = useCartStore((state) => state.cart)

  return (
    <>
      <form onSubmit={() => {}} className='checkout'>
        <div className='checkout__form'>checkout__form</div>
        <div className='checkout__aside'>
          <h6 className='checkout__title checkout__title_order'>Your Order</h6>
          <div className='checkout__order'>
            {cart?.items?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <CartPromo />
            <CartTotal withMT />
          </div>
          <Button variant='v3' type='submit' className='checkout__payNow'>
            Pay now
          </Button>

          <CartAd />
        </div>
      </form>
      <footer className='footer'>
        <p>Secured & Encrypted Checkout</p>
        <img src='/images/checkout-footer.png' alt='' />
      </footer>
    </>
  )
}
