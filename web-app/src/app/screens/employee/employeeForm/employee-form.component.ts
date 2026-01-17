import { Component, inject, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FieldConfig, TpageForm } from '../../../interfaces/feild.interface';
import { MatCardSubtitle, MatCardTitle, MatCard } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule, MatCardSubtitle, MatCardTitle, MatCard, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
    isEditMode: boolean = false;
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private httpService = inject(HttpService);

    @Input() pageForm!: TpageForm;
    arrformfieldConfig: FieldConfig[] = [
        // {
        //     type: 'number',
        //     label: 'Employee Number',
        //     name: 'empNo',
        //     placeholder: 'Enter Employee Number',
        //     vaidations: ['Employee Number is required.']
        // },
        {
            type: 'text',
            label: 'Employee Full Name',
            name: 'emp_Name',
            placeholder: 'Enter Employee Name',
            vaidations: ['Employee Name is required.']
        },
        {
            type: 'date',
            label: 'Date of Birth',
            name: 'dob',
            placeholder: 'Select Date of Birth',
            vaidations: ['Date of Birth is required.']
        },
        {
            type: 'email',
            label: 'Email Address',
            name: 'email_Id',
            placeholder: 'Enter Email Address',
            vaidations: ['Email Address is required.']
        },
        {
            type: 'select',
            label: 'Gender',
            name: 'gender',
            placeholder: 'Enter Gender',
            options: [
                { id: 'M', name: 'Male' },
                { id: 'F', name: 'Female' },
                { id: 'O', name: 'Other' }
            ],
            vaidations: ['Gender is required.']
        },
        {
            type: 'number',
            label: 'Phone Number',
            name: 'phoneNumber',
            placeholder: 'Enter Phone Number',
            vaidations: ['Phone Number is required.']
        },
        {
            type: 'text',
            label: 'Employee Role',
            name: 'jobTitle',
            placeholder: 'Enter Job Title',
            vaidations: ['Job Title is required']
        },
        {
            type: 'number',
            label: 'Salary',
            name: 'salary',
            placeholder: 'Enter Salary',
            vaidations: ['Salary details is required']
        },
        {
            type: 'textarea',
            label: 'Address',
            name: 'address',
            placeholder: 'Enter Address',
            vaidations: ['Address is required']
        },
        {
            type: 'select',
            label: 'Department',
            name: 'departmentId',
            placeholder: 'Enter Department',
            options: [],
            vaidations: ['Department is required']
        },
        {
            type: 'date',
            label: 'Date of Joining',
            name: 'joining_Date',
            placeholder: 'Select Date of Joining',
            vaidations: ['Joining Date is required']
        }
    ];

    employeeForm!: FormGroup;
    activatedRoute: any = inject(ActivatedRoute);
    editEmpNo: number | null = null;
    ngOnInit(): void {
        this.getdepartments();
        this.initializeForm();
        this.editEmpNo = this.activatedRoute.snapshot.queryParamMap.get('empNo');
        if (this.editEmpNo) {
            this.isEditMode = true;

            this.httpService.GetEmployeeById(this.editEmpNo).subscribe((employee: any) => {
                console.log('Employee data:', employee);
                this.employeeForm.patchValue(employee);
                this.employeeForm.updateValueAndValidity();
                this.employeeForm.get('gender')?.disable();
                this.employeeForm.get('dob')?.disable();
            });
        }
    }

    initializeForm(): void {
        this.employeeForm = this.fb.group({
            emp_Name: ['', [Validators.required]],
            dob: ['', Validators.required],
            email_Id: ['', [Validators.required]],
            gender: ['', Validators.required],
            phoneNumber: ['', [Validators.required]],
            jobTitle: ['', Validators.required],
            salary: ['', [Validators.required,]],
            address: ['', Validators.required],
            departmentId: ['', Validators.required],
            joining_Date: ['', Validators.required]
        });
    }

    getdepartments() {
        this.httpService.GetAllDepartments().subscribe((data: any) => {
            console.log('Departments Data:', data);
            this.arrformfieldConfig[8].options = data.map((dept: any) => ({ id: dept.id, name: dept.name }));
        });
    }

    onSubmit(): void {
        if (this.isEditMode && this.editEmpNo !== null) {
            this.updateEmployee(this.editEmpNo);
        } else {
            this.addEmployee();
        }
        
    }

    addEmployee(): void {
        if (this.employeeForm.valid) {
            console.log('Form Submitted:', this.employeeForm.value);
            let values = this.employeeForm.value;
            let obj = {
                emp_no: 0,
                emp_Name: values.emp_Name,
                dob: values.dob,
                email_Id: values.email_Id,
                gender: values.gender,
                phoneNumber: values.phoneNumber,
                jobTitle: values.jobTitle,
                salary: values.salary,
                address: values.address,
                departmentId: values.departmentId,
                joining_Date: values.joining_Date,
                created_Date: new Date()
            };
            this.httpService.AddEmployee(obj).subscribe({
                next: (employees) => {
                    console.log('Employee added successfully:', employees);
                    alert('Employee added successfully');
                    this.router.navigate(['/employees']);
                },
                error: (err) => {
                    console.error('Error fetching employees list:', err);
                }
            });
        }
    }

    updateEmployee(editEmpNo: number): void {
        if (this.employeeForm.valid) {
            this.httpService.UpdateEmployee(editEmpNo, this.employeeForm.value).subscribe({   
                next: (response: any) => {
                    alert('Employee updated successfully');
                    this.router.navigate(['/employees']);
                },
                error: (error: any) => {
                    console.error('Error updating employee:', error);
                }
            }); 
        }
    }

    onCancel(): void {
        this.employeeForm.reset();
        this.router.navigate(['/employees']);
    }
}