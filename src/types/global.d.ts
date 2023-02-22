import swell from 'swell-js'

interface File {
  url: string
  width: number
  height: number
  id: string
}

interface Image {
  id: string
  file: File
}

declare global {
  interface IProduct {
    id: string
    date_created: Date
    bundle: null | boolean
    currency: string
    active: boolean
    date_updated: Date
    delivery: string
    name: string
    description: string
    images: Image[]
    price: number
    slug: string
    type: string
    // attributes: Attributes
    image: { id: string; publicURL: string }
    options: swell.Product['options']
    attributes: swell.Product['attributes']
  }
  interface IOption {
    id: string
    name: string
    value: string
    valueId: string
    variant: boolean
  }
}
export {}
