import { Employee } from "../employee/employee";
export interface DepartmentResponse {
  item1: Department[]; // مصفوفة تحتوي على أقسام
  item2: Department[]; // مصفوفة تحتوي على أقسام أو أي نوع آخر إذا كان مختلفاً
}

export class Department {
    public id: string | undefined;
    public name_Department: string | undefined;
    public employees: Employee[] = [];
    public isActive: boolean = true;
    public isSelected?:boolean;

    constructor(id?: string, name_Department?: string, employees?: Employee[], isActive?: boolean,isSelect?:boolean) {
      this.id = id;
      this.name_Department = name_Department;
      this.employees = employees || [];
      this.isActive = isActive !== undefined ? isActive : true;
      this.isSelected=isSelect;
    }
  }
  