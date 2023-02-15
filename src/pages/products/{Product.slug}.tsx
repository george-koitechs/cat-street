import { PageProps, graphql } from 'gatsby'

import { Layout } from '../../components'

function ProductPage({ data }: PageProps<{ product: IProduct }>) {
  return (
    <Layout>
      <pre>{JSON.stringify(data.product, null, 2)}</pre>
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
