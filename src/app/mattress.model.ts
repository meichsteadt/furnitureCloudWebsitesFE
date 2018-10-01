export class Mattress {
  constructor(public id: number, public name: string, public comfort: string, public image: string, public description: string, public warranty: number, public brand_id: number, public price: number, public setName: string) {}

  comfortImage() {
    switch(this.comfort) {
      case "plush":
        return "/assets/plush.png"
      case "medium":
        return "medium.png";
    }
  }
}
