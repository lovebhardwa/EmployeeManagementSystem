import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee } from '../../employee';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-list-employee',
  imports: [ReactiveFormsModule, MatIconModule,FormsModule ,MatSlideToggleModule, MatCardModule, MatPaginatorModule ,MatTableModule],
  templateUrl: './list-employee.html',
  styleUrl: './list-employee.css'
})
export class ListEmployee implements OnInit,AfterViewInit {
   modaltitle = 'Add Employee';
  modalbutton = 'Add'
  employeeIdForUpdate = '';
  dataSource!: MatTableDataSource<employeeinterface>;
  istable: boolean=true

 employeeData: any[] = [];           // All employees
  filteredEmployees: any[] = [];
  dataService: any;

 displayedColumns: string[] = ['employeeId', 'fullname', 'email', 'phone','gender','employeeType','salary','departmentname','Action'];
 addemployee = new FormGroup({
    employeeId: new FormControl(''),
    fullname: new FormControl(''),
    email: new FormControl('@gmail.com'),
    phone: new FormControl(),
    gender: new FormControl('male'),
    employeeType: new FormControl(''),
    salary: new FormControl(),
    departmentname: new FormControl(''),

  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
    }
  }
  constructor(private employee: Employee) { }
  ngOnInit(): void {
    this.getEmployeeList();

    }
    //fetch all employee from api
    getEmployeeList(){
      this.employee.getAllEmployee().subscribe((allData: any) => {
      this.employeeData = allData;
      this.filteredEmployees = allData;
      
      this.dataSource = new MatTableDataSource<employeeinterface>(allData);
      this.dataSource.paginator = this.paginator;
    }); 

  }
//delete employee by id
  deleteemployee(employeeId: any) {
    this.employeeIdForUpdate = employeeId

  }
//after deletion save to database
  deleteemployeefromdatabase() {
    this.employee.deleteEmployee(this.employeeIdForUpdate).subscribe((result) => {
      this.ngOnInit()
    })
  }
//add new employee
  SaveData() {
    console.log(this.addemployee.value)
    this.employee.saveEmployeeData(this.addemployee.value).subscribe((result) => {
      this.addemployee.reset();

      this.ngOnInit();      
    });
  }
  //fill data for editing
  updatedata(id: string) {
    this.modalbutton = 'Edit'
    this.modaltitle = 'Update Employee';
    this.employee.updatedata(id).subscribe((result: any) => {
      this.employeeIdForUpdate = result.id;
      this.addemployee.setValue({
        employeeId: result.employeeId,
        fullname: result.fullname,
        email: result.email,
        phone: result.phone,
        gender: result.gender,
        employeeType: result.employeeType,
        salary: result.salary,
        departmentname: result.departmentname

      })  
    })
  }

//send updated employee to api
  updateToDatabase() {
    this.employee.updatedatatodatabase(this.employeeIdForUpdate, this.addemployee.value).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
      this.addemployee.reset();
    })
  }

  changeButton() {
    this.modalbutton = 'Add'
    this.modaltitle = 'Add Employee'
  }
      // decides wheather to save or update on model button
  condition() {
    if (this.modalbutton == 'Add') {
      this.SaveData();
    }
    else {
      this.updateToDatabase();
    }
  }

    
  filterByDepartment(event: Event): void {
    const selectedDept = (event.target as HTMLSelectElement).value;
    if (selectedDept === '') {
      this.filteredEmployees = this.employeeData; 
    } else {
      this.filteredEmployees = this.employeeData.filter(emp =>
        emp.departmentname.toLowerCase() === selectedDept.toLowerCase()
      );
    }
  }
  searchEmployee(event: Event): void {
    event.preventDefault();
    if (this.searchedString === '') {
      this.filteredEmployees = this.employeeData; 
    } else {
      this.filteredEmployees = this.employeeData.filter(emp =>
        emp.departmentname.toLowerCase() === this.searchedString.toLowerCase()||
        emp.fullname.toLowerCase() === this.searchedString.toLowerCase()||
        emp.gender.toLowerCase() === this.searchedString.toLowerCase()
      );
    }
  }
  searchedString:string = '';
  table(){
    this.istable=true
  }
  card(){
    this.istable=false
  }

}
export interface employeeinterface {
 employeeId: string,
      fullname: string,
      email: string,
      phone: number,
      gender: string,
      employeeType: string,
      salary: number,
      departmentname: string
}