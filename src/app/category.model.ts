export class Category {
  constructor(public id: number, public name: String, public image: String, public hasSets: Boolean) {}

  linkName() {
    var newName = "";
    this.name.split("").forEach(letter => {
      newName += letter.toLowerCase();
    })
    return newName.replace(/\s/g, "-").replace(/[/]/g, "&")
  }

  encodeUrl() {
    var newName = "";
    this.name.split("").forEach(letter => {
      newName += letter.toLowerCase();
    })
    console.log(newName.replace(/\s/g, "-").replace(/\//g, "&"))
    return encodeURIComponent(newName.replace(/\s/g, "-").replace(/\//g, "&"))
  }

  decodeUrl() {

  }

  set() {
    return this.hasSets ? "/sets" : ''
  }
}
