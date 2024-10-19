export class Salary {
    public date_Salarys: Date | undefined;
    public employeeId: string | undefined;
    public receipt_Date: Date | undefined;
    public issue_Date: Date | undefined;
  
    constructor(
     
      date_Salarys?: Date,
      employeeId?: string,
      receipt_Date?: Date,
      issue_Date?: Date
    ) {
      this.date_Salarys = date_Salarys;
      this.employeeId = employeeId;
      this.receipt_Date = receipt_Date;
      this.issue_Date = issue_Date;
    }
  
    public get month(): number | undefined {
      return this.date_Salarys ? this.date_Salarys.getMonth() + 1 : undefined;
    }
  
    public get year(): number | undefined {
      return this.date_Salarys ? this.date_Salarys.getFullYear() : undefined;
    }
  }
  