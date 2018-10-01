export class Review {
  constructor(public name: string, public review: string, public stars: number) { }

  half() {
    if(this.stars % 1 !== 0 ) {
      return true;
    }
    else {
      return false;
    }
  }

  starArray() {
    if (this.stars) {
      return Array(Math.floor(this.stars)).fill(null).map((x,i)=>i);
    }
  }
}
