import React from 'react';
import { Link } from 'gatsby';

import { Checkout } from './checkout.component';

import './checkout.page.styles.scss';

export const CheckoutPage = () => {
  return (
    <div className='checkoutPage'>
      <div className='container'>
        <Link to='/' className='checkoutPage__link'>
          <img src='/images/catstreet-logo.svg' alt='Cat st.' />
        </Link>
        <h1 className='checkoutPage__title'>Checkout</h1>
        <Checkout />
      </div>
    </div>
  );
};
