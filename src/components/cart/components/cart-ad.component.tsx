import React from 'react'

import classNames from 'classnames'

import { Button } from '../../__ui-kit/button/button.component'
import './cart-ad.styles.scss'

export const CartAd: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div className={classNames('cartAd', props.className)}>
      <h6 className='cartAd__title'>Only For Cool Cats...</h6>
      <div className='cartAd__body'>
        {/*<img src='/images/cat-street-hero-olive_2000.webp' alt='' className='cartAd__image' />*/}
        <div className='cartAd__content'>
          <p className='cartAd__text'>Add the “Catnip” cover to your order and save 5%</p>
          <div className='cartAd__prices'>
            <p className='cartAd__price'>$122.50</p>
            <p className='cartAd__price cartAd__price_old'>$129.00</p>
          </div>
          <Button type='button' variant='v1'>
            Add now
          </Button>
        </div>
      </div>
    </div>
  )
}
