export class Vacation {
    public id: string | undefined;
    public employeeId: string | undefined;
    public start_Vacation: Date | undefined;
    public end_Vacation: Date | undefined;
    public leave: string | undefined; // Replace with appropriate enum type
    public noteBad: string | undefined;
    public acceptance: boolean | undefined;
  
    constructor(
      id?: string,
      employeeId?: string,
      start_Vacation?: Date,
      end_Vacation?: Date,
      leave?: string,
      noteBad?: string,
      acceptance?: boolean
    ) {
      this.id = id;
      this.employeeId = employeeId;
      this.start_Vacation = start_Vacation;
      this.end_Vacation = end_Vacation;
      this.leave = leave;
      this.noteBad = noteBad;
      this.acceptance = acceptance;
    }
  }
  