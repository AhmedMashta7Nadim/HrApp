import { Employee } from './../../Model/employee/employee';

export class Chat {
    Message!: string;
    UserName!: string;
    DateTime!: Date;
    ClientValue?: string;
    EmployeeId!: string;
    Employee?: Employee;
   
  constructor(
    message: string,
    userName: string,
    dateTime: Date,
    employeeId: string,
  ) {
    this.Message = message;
    this.UserName = userName;
    this.DateTime = dateTime;
    this.EmployeeId = employeeId;
  }

}