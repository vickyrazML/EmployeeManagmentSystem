import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Department } from '../interfaces/feild.interface';
import { environment } from '../../environments/environment';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  http = inject(HttpClient);

  constructor() { }

  GetAllDepartments() {
    return this.http.get<Department[]>(`${baseUrl}/Department/GetAllDepartments`);
  } 
  AddDepartment(objDepartment: any) {
    return this.http.post(`${baseUrl}/Department/AddDepartment`, objDepartment);
  }
  UpdateDepartment(id: number, objDepartment: any) {
    return this.http.put(`${baseUrl}/Department/UpdateDepartment/${id}`, objDepartment);
  }
  DeleteDepartment(id: number) {
    return this.http.delete(`${baseUrl}/Department/DeleteDepartment/${id}`);
  }

  // Employee Controller APIs
  GetAllEmployees() {
      return this.http.get<any[]>(`${baseUrl}/Employee/GetAllEmployees`);
  }
  GetEmployeeById(id: any) {
      return this.http.get<any>(`${baseUrl}/Employee/GetEmployeeById/${id}`);
  }
  AddEmployee(objEmployee: any) {
      return this.http.post(`${baseUrl}/Employee/AddEmployee`, objEmployee);
  }
  UpdateEmployee(id: number, objEmployee: any): any {
      return this.http.put<any>(`${baseUrl}/Employee/UpdateEmployee/${id}`, objEmployee);
  }
  DeleteEmployee(id: number) {
      return this.http.delete(`${baseUrl}/Employee/DeleteEmployee/${id}`);
  } 

}
