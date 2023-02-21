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
import { ISelectedOptions } from '../../components/cart/cart.types'
import * as styles from './product.module.scss'

function ProductPage({ data }: PageProps<{ product: IProduct }>) {
  const [index, changeIndex] = useReducer((c: number, offset: number) => (c + offset) % data.product.images.length, 0)
  const [openCart, updateCart, addToCartLocal] = useCartStore(
    (state) => [state.open, state.updateCart, state.addToCartLocal],
    shallow
  )
  const [selectedOptions, setSelectedOptions] = useState<null | ISelectedOptions>(null)

  async function addToCartCommon() {
    if (!selectedOptions) return
    updateCart({ productId: data.product.id, selectedOptions })
  }
  async function addToCart() {
    if (!selectedOptions) return
    const price = data.product.price + Object.values(selectedOptions).reduce((a, c) => a + (c.price ?? 0), 0)
    const cartShortInfo = {
      currency: 'AUD',
      sub_total: price,
      grand_total: price,
      discount_total: 0,
      items: [{ ...data.product, price, product: data.product, quantity: 1 }],
      discounts: [],
    }
    // addToCartLocal(cartShortInfo)
    addToCartCommon()
    openCart()
  }
  async function buyNow() {
    addToCartCommon()
    navigate('/checkout')
  }

  function selectOption(optionValue: OptionValueSnake, optionId?: string) {
    if (!optionId) return
    setSelectedOptions((prev) => {
      if (!prev) {
        return { [optionId]: optionValue }
      }
      return { ...prev, [optionId]: optionValue }
    })
  }
  const optionValuesPrice = selectedOptions ? Object.values(selectedOptions).reduce((a, c) => a + (c.price ?? 0), 0) : 0
  const finalPrice = data.product.price + optionValuesPrice
  const canBuy = Object.keys(selectedOptions ?? {}).length === data.product.options?.length

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
                        variant={optionValue.id === selectedOptions?.[option.id!]?.id ? 'contained' : 'outlined'}
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
              disabled={!canBuy || !data.product.options?.length}
            >
              Buy Now
            </Button>
            <Button startIcon={<BsCartPlus />} onClick={addToCart} disabled={!canBuy || !data.product.options?.length}>
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
