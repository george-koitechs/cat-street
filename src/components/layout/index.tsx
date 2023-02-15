import { Link } from 'gatsby'

import { PropsWithChildren } from 'react'

import { BiUser } from 'react-icons/bi'

import * as styles from './styles.module.scss'

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <Link to='/'>
            <img className={styles.header__logo} src='/images/catstreet-logo.svg' alt='catstreet' />
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
