import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, TemplateRef, ViewChild , OnInit} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../interfaces/feild.interface';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-departments',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent implements OnInit, AfterViewInit {

  private httpservice = inject(HttpService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'Action'];
  dataSource = new MatTableDataSource<Department>([]);
  filterForm!: FormGroup;
  departmentForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('addDepartmentDialog') addDepartmentDialog!: TemplateRef<any>;
  dialogRef: any;
  iseditMode: boolean = false;
  selectedIdforUpdate: any = 0;
  ngOnInit() {
    this.initializeForms();
    this.getDepartments();
    this.setupFilterListener();
  }

  initializeForms() {
    // Filter form
    this.filterForm = this.fb.group({
      filterControl: ['']
    });

    // Department form for add/edit
    this.departmentForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  setupFilterListener() {
    this.filterForm.get('filterControl')?.valueChanges.subscribe((filterValue) => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  getDepartments() {
    this.httpservice.GetAllDepartments()
      .subscribe(departments => {
        console.log("departments", departments);
        this.dataSource.data = departments;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editDepartment(row: Department) {
    console.log('Edit department', row);
    this.departmentForm.patchValue(row);
    this.selectedIdforUpdate = Number(row.id);
    this.iseditMode = true;
    this.openDepartmentDialog();
    // TODO: open edit dialog or navigate to edit form
  }


  deleteDepartment(row: Department) {
    console.log('Delete department', row);
    if (confirm('Are you sure you want to delete this department?')) {
      this.httpservice.DeleteDepartment(Number(row.id)).subscribe(() => {
        this.getDepartments(); // Refresh the list
        alert('Department deleted successfully');
      });
    }
  }

  openDepartmentDialog() {
    this.departmentForm.reset();
    this.dialogRef = this.dialog.open(this.addDepartmentDialog, {
      width: '600px',
      //height: '200px',
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.iseditMode = false;
    });
  }

  onAddSubmit() {
    if (this.departmentForm.valid) {
      const department = this.departmentForm.value;
      console.log('Submitting department:', department);
      // TODO: Call service to add department
      const objDepartment = {
        name: department.name
      };
      this.httpservice.AddDepartment(objDepartment).subscribe(() => {
        this.getDepartments(); // Refresh the list
        alert('Department added successfully');
        this.dialogRef.close();
      }); 
    }
  }

  onEditSubmit() {
    if (this.departmentForm.valid) {
      const department = this.departmentForm.value;
      const objDepartment = {
        name: department.name
      };
      this.httpservice.UpdateDepartment(this.selectedIdforUpdate, objDepartment).subscribe(() => {
        this.getDepartments(); // Refresh the list
        alert('Department updated successfully');

        this.dialogRef.close();
      });

    }
  }
}