import { HeadFC, Link, PageProps, graphql } from 'gatsby'

import * as React from 'react'

import { Card, CardContent, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import { Layout } from '../components'
import * as styles from './index.module.scss'

type IProductsQuery = { allProduct: { nodes: IProduct[] } }

const IndexPage: React.FC<PageProps<IProductsQuery>> = ({ data }) => {
  console.log('data.allProduct.nodes', data.allProduct.nodes)
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>Buy now</span> and have a great time forever :)
        </h1>
        <div className={styles.productsList}>
          {data.allProduct.nodes.map((product) => {
            const publicImg = product.images?.[0].file?.url
            const image = product.images?.[0].file
            return (
              <Link to={`/products/${product.slug}`} key={product.id}>
                <Card className={styles.card}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <motion.img src={publicImg} style={{ aspectRatio: (image.width / image.height).toString() }} />

                    <Typography sx={{ mt: 'auto' }}>{product.name}</Typography>
                    <p>
                      {product.price}
                      {product.currency}
                    </p>
                  </CardContent>
                </Card>
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
        image {
          id
          publicURL
          childImageSharp {
            gatsbyImageData(width: 350, formats: [AUTO, WEBP, AVIF])
          }
        }
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
        _locale {
          de {
            name
          }
          fr {
            name
          }
          uk {
            name
          }
        }
      }
    }
  }
`
export default IndexPage

export const Head: HeadFC = () => <title>Home | Cats Street</title>
