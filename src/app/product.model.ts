export class Product {
  constructor(
    public id: number,
    public name: string,
    public images: String[],
    public description: string,
    public thumbnail: string,
    public price: number,
    public setName: string,
    public promoPrice: number,
    public promoDiscount: number,
    public onPromo: boolean,
    public quantityInCart: number = 0,
  ) {}
}
