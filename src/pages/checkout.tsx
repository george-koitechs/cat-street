import type { HeadFC } from 'gatsby'

import * as React from 'react'
import { useEffect } from 'react'

import { CheckoutPage } from '../components/checkout/checkout.page'

const PageCheckout = () => {
  useEffect(() => {
    document.body.scrollIntoView()
  }, [])

  return <CheckoutPage />
}

export default PageCheckout

export const Head: HeadFC = () => <title>Checkout Page</title>
