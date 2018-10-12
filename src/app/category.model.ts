export class Category {
  constructor(public id: number, public name: String, public image: String) {}

  linkName() {
    var newName = "";
    this.name.split("").forEach(letter => {
      newName += letter.toLowerCase();
    })
    return newName.replace(/\s/g, "-").replace(/[/]/g, "&")
  }
}
