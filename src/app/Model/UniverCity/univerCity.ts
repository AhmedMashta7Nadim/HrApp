import { Employee } from "../employee/employee";

export class UniverCity {
    public id: string | undefined;
    public name: string | undefined;
    public employees: Employee[] = [];
  
    constructor(id?: string, name?: string, employees?: Employee[]) {
      this.id = id;
      this.name = name;
      this.employees = employees || [];
    }
  }
  