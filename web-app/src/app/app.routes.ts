import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { DepartmentsComponent } from './screens/departments/departments.component';
import { EmployeeHomeComponent } from './screens/employee/employee-home.component';
import { EmployeeFormComponent } from './screens/employee/employeeForm/employee-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'departments', component: DepartmentsComponent },
  { path: 'employees', component: EmployeeHomeComponent },
  { path: 'employee/employee-form', component: EmployeeFormComponent }

];