import { Link } from 'gatsby'

import { PropsWithChildren } from 'react'

import { BiUser } from 'react-icons/bi'
import { SiShopify } from 'react-icons/si'

import * as styles from './styles.module.scss'

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <Link to="/">
            <SiShopify />
          </Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.user}>
            <BiUser />
          </button>
        </div>
      </header>
      {children}
    </div>
  )
}

export { Layout }
