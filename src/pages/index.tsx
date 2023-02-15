import { Link, PageProps, graphql } from 'gatsby'

import * as React from 'react'

import { Layout } from '../components'
import * as styles from './index.module.scss'

type IProductsQuery = { allProduct: { nodes: IProduct[] } }

const IndexPage: React.FC<PageProps<IProductsQuery>> = ({ data }) => {
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Ink Your Ideas with Style - Shop{' '}
          <span className={styles.highlight}>The Best Pens</span> Online!
        </h1>
        <div className={styles.productsList}>
          {[
            ...data.allProduct.nodes,
            ...[...data.allProduct.nodes].reverse(),
            ...data.allProduct.nodes,
          ].map((product) => {
            const image = product.images[0].file
            return (
              <Link
                to={`/products/${product.slug}`}
                className={styles.product}
                key={product.id}
              >
                <img
                  src={image.url}
                  style={{
                    aspectRatio: (image.width / image.height).toString(),
                  }}
                />

                <h3>{product.name}</h3>
                <p>
                  {product.price}
                  {product.currency}
                </p>
              </Link>
            )
          })}
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allProduct {
      nodes {
        id
        currency
        name
        images {
          id
          file {
            url
            width
            height
            id
          }
        }
        price
        slug
      }
    }
  }
`
export default IndexPage
