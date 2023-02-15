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

interface Attributes {
  by?: any
  color?: any
  size?: any
}

declare global {
  interface IProduct {
    id: string
    date_created: Date
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
    attributes: Attributes
    image: { id: string; publicURL: string }
  }
}
export {}
