import { PageProps, graphql } from 'gatsby'

import { useReducer } from 'react'

import { motion } from 'framer-motion'
import { BsCartPlus } from 'react-icons/bs'
import { MdSell } from 'react-icons/md'

import { Layout } from '../../components'
import * as styles from './product.module.scss'

function ProductPage({ data }: PageProps<{ product: IProduct }>) {
  const [index, changeIndex] = useReducer(
    (c: number, offset: number) => (c + offset) % data.product.images.length,
    0
  )
  return (
    <Layout>
      <div className={styles.container}>
        <figure>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={data.product.images[index].file.url}
            key={index}
          />
          <div className={styles.imagesCarousel}>
            <button onClick={() => changeIndex(-1)} disabled={index === 0}>
              Previous
            </button>
            <button
              onClick={() => changeIndex(1)}
              disabled={index === data.product.images.length - 1}
            >
              Next
            </button>
          </div>
        </figure>
        <main>
          <h1 className={styles.title}>{data.product.name}</h1>
          <div className={styles.price}>
            {data.product.price + data.product.currency}
          </div>
          <div className={styles.actions}>
            <button className={styles.buy}>
              <MdSell />
              <span>Buy Now</span>
            </button>
            <button className={styles.addToCart}>
              <BsCartPlus />
              <span>Add to cart</span>
            </button>
          </div>
          <div className={styles.separator} />

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.product.description }}
          ></div>
        </main>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String) {
    product(slug: { eq: $slug }) {
      id
      date_created
      currency
      active
      date_updated
      delivery
      name
      description
      image {
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
      type
    }
  }
`

export default ProductPage
