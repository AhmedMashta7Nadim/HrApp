export class Penalties {
    public id: string | undefined;
    public employeeId: string | undefined;
    public date_Penalties: Date | undefined;
    public path_file: string | undefined;
    public price_Penalties: number | undefined;
    public reason_Penalties: string | undefined;
  
    constructor(
      id?: string,
      employeeId?: string,
      date_Penalties?: Date,
      path_file?: string,
      price_Penalties?: number,
      reason_Penalties?: string
    ) {
      this.id = id;
      this.employeeId = employeeId;
      this.date_Penalties = date_Penalties;
      this.path_file = path_file;
      this.price_Penalties = price_Penalties;
      this.reason_Penalties = reason_Penalties;
    }
  }
  