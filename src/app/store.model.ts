export class Store {
  constructor(
    public authToken: string,
    public id: number,
    public name: string,
    public logo: string,
    public favicon: string,
    public yelp: string,
    public facebook: string,
    public instagram: string,
    public twitter: string,
    public googleReviewsId: string,
    public yellowPages: string,
    public googleMaps: string,
    public email: string,
  ) { }
}
