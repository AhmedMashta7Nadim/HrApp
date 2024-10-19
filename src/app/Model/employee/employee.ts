import { City } from "../city/city";
import { Department } from "../Department/department";
import { Leave_Balances } from "../Leave_Balances/leave_Balances";
import { Penalties } from "../Penalties/penalties";
import { Rewards } from "../Rewards/rewards";
import { Salary } from "../Salary/salary";
import { UniverCity } from "../UniverCity/univerCity";
import { Vacation } from "../Vacation/vacation";

export class Employee {
  public id: string | undefined;
  public name: string | undefined;
  public father: string | undefined;
  public lastName: string | undefined;
  public mother: string | undefined; // Corrected spelling
  public birthDate: Date | undefined;
  public date_of_employment: Date | undefined;
  public age: number | undefined;
  public gendar: string | undefined;
  public salary_basis: number | undefined;
  public functional_ID: string | undefined; // Replace with appropriate enum type if needed
  public isActive: boolean = true;
  public cityId: string | undefined;
  public univerCityId: string | undefined;
  public img?: string;
  constructor(
    id?: string,
    name?: string,
    father?: string,
    lastName?: string,
    mother?: string, // Corrected spelling
    birthDate?: Date,
    date_of_employment?: Date,
    salary_basis?: number,
    gendar?:string,
    functional_ID?: string,
    cityId?: string,
    univerCityId?: string,
    img?:string

  ) {
    this.id = id;
    this.name = name;
    this.father = father;
    this.lastName = lastName;
    this.mother = mother; // Corrected spelling
    this.birthDate = birthDate;
    this.gendar=gendar;
    this.date_of_employment = date_of_employment;
    this.salary_basis = salary_basis;
    this.functional_ID = functional_ID;
    this.cityId = cityId;
    this.univerCityId = univerCityId;
    this.img=img;

    // Calculating age based on birthDate
    if (birthDate) {
      const today = new Date();
      const m = today.getMonth() - birthDate.getMonth();
    
    }
  }
}
