export class EmployeeDepartment {
    public id: string | undefined;
    public employeeId: string | undefined;
    public departmentId: string | undefined;
    public createdAt: Date = new Date();
    public endAt: Date | undefined;
    public is_available: boolean = true;
    public is_manager: boolean = false;
    // public listDep:string[]|undefined;
    public path_File: string | undefined;
  
    constructor(
      id?: string,
      employeeId?: string,
      departmentId?: string,
      createdAt?: Date,
      endAt?: Date,
      is_available?: boolean,
      is_manager?: boolean,
      path_File?: string,
      // listDep?:string[]
    ) {
      this.id = id;
      this.employeeId = employeeId;
      this.departmentId = departmentId;
      this.createdAt = createdAt || new Date();
      this.endAt = endAt;
      this.is_available = is_available !== undefined ? is_available : true;
      this.is_manager = is_manager !== undefined ? is_manager : false;
      // this.path_File = path_File;
      // this.listDep=listDep;
    }

    


    onEmployeeChange(event: Event): void {
      const selectedValue = (event.target as HTMLSelectElement).value;
      console.log('Selected Employee ID:', selectedValue);
    }

  }
  