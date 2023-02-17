import { PageProps, graphql, navigate } from 'gatsby'

import { useReducer, useState } from 'react'

import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import { BsCartPlus } from 'react-icons/bs'
import { MdSell } from 'react-icons/md'
import { OptionValueSnake } from 'swell-js/types/product/snake'
import { shallow } from 'zustand/shallow'

import { Layout } from '../../components'
import { useCartStore } from '../../components/cart/cart.store'
import { ISelectedOption } from '../../components/cart/cart.types'
import * as styles from './product.module.scss'

function ProductPage({ data }: PageProps<{ product: IProduct }>) {
  const [index, changeIndex] = useReducer((c: number, offset: number) => (c + offset) % data.product.images.length, 0)
  const [openCart, updateCart] = useCartStore((state) => [state.open, state.updateCart], shallow)
  const [selectedOption, setSelectedOption] = useState<null | ISelectedOption>(null)

  async function addToCartCommon() {
    if (!selectedOption) return
    updateCart({ productId: data.product.id, selectedOption })
  }
  async function addToCart() {
    addToCartCommon()
    openCart()
  }
  async function buyNow() {
    addToCartCommon()
    navigate('/checkout')
  }

  function selectOption(optionValue: OptionValueSnake, optionName?: string) {
    if (!optionName) return
    setSelectedOption({ optionValue, optionName })
  }

  const finalPrice = data.product.price + (selectedOption?.optionValue.price ?? 0)

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
            <Button variant='outlined' onClick={() => changeIndex(-1)} disabled={index === 0}>
              Previous
            </Button>
            <Button
              variant='outlined'
              onClick={() => changeIndex(1)}
              disabled={index === data.product.images.length - 1}
            >
              Next
            </Button>
          </div>
        </figure>
        <main>
          <h1 className={styles.title}>{data.product.name}</h1>
          <div className={styles.price}>{finalPrice + data.product.currency}</div>

          {data.product.options
            ?.filter((o) => o.active)
            .map((option) => {
              return (
                <div key={option.id} className={styles.productItem__option}>
                  <p className={styles.productItem__optionName}>{option.name}:</p>
                  {option.values?.map((optionValue) => {
                    return (
                      <Button
                        key={optionValue.id}
                        variant={optionValue.id === selectedOption?.optionValue.id ? 'contained' : 'outlined'}
                        onClick={() => selectOption(optionValue, option.id)}
                      >
                        {optionValue.name} {!!optionValue.price && `(+${optionValue.price}${data.product.currency})`}
                      </Button>
                    )
                  })}
                </div>
              )
            })}

          <div className={styles.actions}>
            <Button
              startIcon={<MdSell />}
              variant='contained'
              onClick={buyNow}
              disabled={!selectedOption || !data.product.options?.length}
            >
              Buy Now
            </Button>
            <Button
              startIcon={<BsCartPlus />}
              onClick={addToCart}
              disabled={!selectedOption || !data.product.options?.length}
            >
              Add to cart
            </Button>
          </div>
          <div className={styles.separator} />

          <div className={styles.description} dangerouslySetInnerHTML={{ __html: data.product.description }}></div>
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
      attributes {
        color
        size
      }
      options {
        active
        attribute_id
        id
        input_type
        name
        required
        variant
        values {
          id
          name
          price
        }
      }
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

export const Head: ({ data }: { data: { product: IProduct } }) => JSX.Element = ({
  data,
}: {
  data: { product: IProduct }
}) => {
  return <title>{data.product.name} | Cats Street</title>
}
