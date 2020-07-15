import { Product } from './product.model';

export class Cart {
  constructor(public id: number, public visitId: string, public products: Product[]) {}
}
