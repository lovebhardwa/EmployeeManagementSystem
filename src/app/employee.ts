import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Employee {

  url = 'http://localhost:3000/Employee/'
  constructor(private http: HttpClient){}
  getAllEmployee(){
     return this.http.get(this.url);
  }

  saveEmployeeData(data:any){
    return this.http.post(this.url, data);
  }

  deleteEmployee(employeeId: any){
    return this.http.delete(`${this.url}${employeeId}`)
  }

  updatedata(id:string){
    return this.http.get(`${this.url}${id}`)
  }
  updatedatatodatabase(id:string, data:any){
    return this.http.put(`${this.url}${id}`,data);
  }
}
