import swell from 'swell-js'
import { OptionValueSnake } from 'swell-js/types/product/snake'

export interface ICartItem {
  id: number
  image: string
  name: string
  quantity: number
  price: string
}

export interface ISelectedOption {
  optionValue: OptionValueSnake
  optionName: string
}

export interface ISetCartOptions {
  productId: string
  selectedOption: ISelectedOption
}

export interface ICart extends Omit<swell.Cart, 'promotions'> {
  promotions?: {
    count: number
    results: IPromotionsResult[]
    page: number
  }
}

interface IPromotionsResult {
  name: string
  description: string
  dateStart: string
  dateEnd: null | string
  id: string
}
