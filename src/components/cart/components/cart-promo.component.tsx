import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { shallow } from 'zustand/shallow'

import { useCartStore } from '../cart.store'
import { DiscountType, ICart, IMappedDiscount } from '../cart.types'
import './cart-promo.styles.scss'

export const CartPromo = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState<IMappedDiscount[] | undefined>(undefined)
  const [cart, applyCoupon, removeCoupon] = useCartStore(
    (state) => [state.cart, state.applyCoupon, state.removeCoupon],
    shallow
  )

  function handleTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value)
  }
  async function addTag() {
    if (!tag) return
    try {
      await applyCoupon(tag)
      setTag('')
    } catch (e) {
      alert('Coupon error!')
    }
  }
  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') addTag()
  }
  async function removeTag(tag: string) {
    try {
      await removeCoupon(tag)
    } catch (e) {}
  }
  function start() {
    setIsActive(true)
  }
  function mapDiscounts(cart: ICart) {
    return cart.discounts?.map((d) => {
      const [type, id] = d.type.split('-') as [DiscountType, string | undefined]
      const promotion = cart.promotions?.results.find((promotion) => promotion.id === id)

      return {
        ...d,
        exactType: type,
        exactId: type === 'promo' ? id : cart.couponId,
        name: type === 'promo' ? promotion?.name : cart.couponCode,
      } as IMappedDiscount
    })
  }

  useEffect(() => {
    if (isActive) inputRef.current?.focus()
  }, [isActive])

  useEffect(() => {
    if (cart) {
      const discounts = mapDiscounts(cart)
      setIsActive(!!discounts.length)
      setTags(discounts)
    }
  }, [cart])

  return (
    <div className='cartPromo'>
      {isActive ? (
        <>
          <div className='cartPromo__form'>
            <input
              type='text'
              ref={inputRef}
              placeholder='Coupon Code'
              value={tag}
              onChange={handleTag}
              onKeyUp={handleKeyUp}
            />
            <button type='button' disabled={!tag} onClick={addTag}>
              Apply
            </button>
          </div>
          {!!tags?.length && (
            <div className='cartPromo__tags'>
              {tags.map((tag) => {
                const isPromo = tag.exactType === 'promo'
                return (
                  <div
                    key={tag.id}
                    className={classNames('cartPromo__tag', { cartPromo__tag_disabled: isPromo })}
                    onClick={isPromo ? undefined : () => removeTag(tag.id)}
                  >
                    {tag.name}
                    {isPromo ? null : <div>+</div>}
                  </div>
                )
              })}
            </div>
          )}
        </>
      ) : (
        <p className='cartPromo__start' onClick={start}>
          Promo Code? <span>Enter Code</span>
        </p>
      )}
    </div>
  )
}
