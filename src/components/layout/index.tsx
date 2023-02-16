import { Link } from 'gatsby'

import { PropsWithChildren } from 'react'

import { IconButton } from '@mui/material'
import { BiCart } from 'react-icons/bi'

import { useCartStore } from '../cart/cart.store'
import { Cart } from '../cart/components/cart.component'
import * as styles from './styles.module.scss'

function Layout({ children }: PropsWithChildren) {
  const openCart = useCartStore((state) => state.open)

  return (
    <>
      <Cart />
      <div className={styles.container}>
        <header className={styles.header}>
          <nav>
            <Link to='/'>
              <img className={styles.header__logo} src='/images/catstreet-logo.svg' alt='catstreet' />
            </Link>
          </nav>

          <IconButton sx={{ border: '1px solid #ccc' }} onClick={openCart}>
            <BiCart />
          </IconButton>
        </header>
        {children}
      </div>
    </>
  )
}

export { Layout }
