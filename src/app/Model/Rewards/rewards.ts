export class Rewards {
  public id?: string;
  public employeeId?: string;
  public date_Rewards?: Date;
  public path_file?: string;
  public price_Rewards?: number;
  public reason_Reward?: string;

  constructor(
    id?: string,
    employeeId?: string,
    date_Rewards?: Date,
    path_file?: string,
    price_Rewards?: number,
    reason_Reward?: string
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.date_Rewards = date_Rewards;
    this.path_file = path_file;
    this.price_Rewards = price_Rewards;
    this.reason_Reward = reason_Reward;
  }
}
