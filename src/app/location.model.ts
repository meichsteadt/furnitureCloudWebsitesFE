export class Location {
  constructor(public name: string, public address: string, public city: string, public state: string, public zip: number, public phone: string, public email: string, public hours: string) { }

  splitHours() {
    return this.hours.split(",")
  }

  fullAddress() {
    return this.address + " " + this.city + ", " + this.state + " " + this.zip
  }
}
