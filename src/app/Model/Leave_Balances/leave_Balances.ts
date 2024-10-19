export class Leave_Balances {
    public id: string | undefined;
    public employeeId: string | undefined;
    public remaining_Balance: number | undefined;
    public total_Balance: number | undefined;
    public carryover_Balance: number | undefined;
  
    constructor(
      id?: string,
      employeeId?: string,
      remaining_Balance?: number,
      total_Balance?: number,
      carryover_Balance?: number
    ) {
      this.id = id;
      this.employeeId = employeeId;
      this.remaining_Balance = remaining_Balance;
      this.total_Balance = total_Balance;
      this.carryover_Balance = carryover_Balance;
    }
  }
  