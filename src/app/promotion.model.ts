import { Product } from './product.model';

export class Promotion {
  constructor(public id: number, public name: string, public image: string, public discount: number) {}

  linkName() {
    var newName = "";
    this.name.split("").forEach(letter => {
      newName += letter.toLowerCase();
    })
    return newName.replace(/\s/g, "-").replace(/[/]/g, "&")
  }
}
