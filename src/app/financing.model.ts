export class Financing {
  constructor(public name: string, public logo: string, public creditNeeded: boolean, public length: string, public bankAccount: boolean, public url: string) {}

  icon(boolean) {
    return (boolean ? "check" : "clear")
  }
}
