import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { HttpService } from '../../services/http.service';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { TableComponent } from "../../sharedComponent/table/table.component";
import { column, employee } from "../../interfaces/feild.interface";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeFormComponent } from "./employeeForm/employee-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-employee-home',
    imports: [CommonModule, TableComponent, MatCardModule, MatButtonModule],
    templateUrl: './employee-home.component.html'
})
export class EmployeeHomeComponent {

    private httpService = inject(HttpService);
    private dialog = inject(MatDialog);
    private router = inject(Router);
    dialogRef: any;

    departmentsCount: number = 0;
    employeeList: employee[] = [];
    displayedColumns: column[] = [
        { id: 'emp_Id', name: 'Emp Number' },
        { id: 'emp_Name', name: 'Employee Name' },
        { id: 'email_Id', name: 'Email' },
        { id: 'departmentId', name: 'Department ID' },
        {id: 'Action', name: 'Action'}
    ];
    dataSource = this.employeeList;

    ngOnInit() {
        console.log('EmployeeHomeComponent initialized');
        this.getAllEmployees();
    }

    getAllEmployees() {

        this.httpService.GetAllEmployees().subscribe({
            next: (employees) => {
                this.employeeList = employees;
                this.dataSource = this.employeeList;
                console.log('Employees fetched:', this.employeeList);
            },
            error: (err) => {
                console.error('Error fetching employees list:', err);
            }
        });
    }

    openDialog() {
        this.router.navigate(['/employee/employee-form']);

    }

    onEdit(rowData: any) {
        console.log('Edit row:', rowData);
        this.router.navigate(['/employee/employee-form'], { queryParams: { empNo: rowData.emp_Id } });
    }
    onDelete(rowData: any) {
        this.httpService.DeleteEmployee(rowData.emp_Id).subscribe({
            next: (response) => {
                console.log('Employee deleted successfully:', response);
                alert('Employee deleted successfully');
                this.getAllEmployees(); // Refresh the employee list
            },
            error: (err) => {
                console.error('Error deleting employee:', err);
            }
        });
    }


}