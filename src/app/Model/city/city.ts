export class City {
  public id: string | undefined;
  public city: string;

  constructor(id?: string, city: string = '') {
    this.id = id;
    this.city = city;
  }
}
