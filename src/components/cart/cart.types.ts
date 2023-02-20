import swell from 'swell-js'
import { OptionValueSnake } from 'swell-js/types/product/snake'

export interface ISelectedOptions extends Record<string, OptionValueSnake> {}

export interface ISetCartOptions {
  productId: string
  selectedOptions: ISelectedOptions
}

export interface ICart extends Omit<swell.Cart, 'promotions' | 'discounts'> {
  promotions?: {
    count: number
    results: IPromotionsResult[]
    page: number
  }
  discounts: IDiscount[]
}

export type DiscountType = 'promo' | 'coupon'

interface IPromotionsResult {
  name: string
  description: string
  dateStart: string
  dateEnd: null | string
  id: string
}
export interface IDiscount {
  amount: number
  id: string
  rule: Record<string, any>
  type: string
}
export interface IMappedDiscount extends IDiscount {
  exactType: DiscountType
  exactId: string
  name: string
}
