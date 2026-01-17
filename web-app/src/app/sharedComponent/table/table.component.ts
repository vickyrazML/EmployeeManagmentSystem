import { Component, EventEmitter, input, Input, Output,  } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { column } from '../../interfaces/feild.interface';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-table',
  imports: [MatTableModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() dataSource: any=[];
  @Input() columns: column[] = [];
  @Output() onedit = new EventEmitter<any>();
  @Output() ondelete = new EventEmitter<any>();

  get displayedColumns(): string[] {
    return this.columns.map(c => c.id);
  } 

  onEdit(rowData: any) {
    this.onedit.emit(rowData);
  }

  onDelete(rowData: any) {
    this.ondelete.emit(rowData);
  }
}