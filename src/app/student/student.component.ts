import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditService } from '../edit.service';
import { StudentService } from '../service/student.service';
import { StudentDetails } from '../models/student.model';
import { io } from 'socket.io-client';
import { GatewayService } from '../service/gateway.service';
import * as moment from 'moment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Color } from '@progress/kendo-drawing';

const POPUPCOLUMNS: {
  field: string;
  title: string;
  format?: string;
  type: 'text' | 'numeric' | 'boolean' | 'date';
}[] = [
  { field: 'name', type: 'text', title: 'Student Name' },
  { field: 'dob', type: 'text', title: 'Date Of Birth' },
  { field: 'age', type: 'text', title: 'Age' },
  { field: 'email', type: 'text', title: 'Email' },
];

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  public studentGridDataList: StudentDetails[] = [];
  public studentGridData: StudentDetails;

  public popupcolumns: {
    field: string;
    title: string;
    format?: string;
    type: 'text' | 'numeric' | 'boolean' | 'date';
  }[] = POPUPCOLUMNS;

  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public formGroup: FormGroup;

  private editService: EditService;
  private editedRowIndex: number;
  isSuccess: boolean;
  private socket: any;
  public data: any;
  file: File;

  constructor(
    private _studentService: StudentService,
    private socketService: GatewayService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.socketService.getMessage().subscribe((msg) => {});
    this.studentGridLoad();
  }

  public onStateChange(state: State) {
    this.gridState = state;
  }

  public editHandler({ sender, rowIndex, dataItem, isNew }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      name: new FormControl(dataItem.name),
      dob: new FormControl(
        new Date(dataItem.dob),
        Validators.compose([Validators.required])
      ),
      email: new FormControl(dataItem.email),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);

    this.studentGridData = this.formGroup.value;
  }

  async updateStudentDetails(studentDetails) {
    this._studentService
      .updateStudent(studentDetails)
      .subscribe((updatedStudent: any) => {
        if (updatedStudent.error) {
          alert('Failed to load data: ' + updatedStudent.error);
          return;
        }
        if (updatedStudent != null) {
          this.isSuccess = true;
        }

        if (this.isSuccess === true) {
          this.studentGridLoad();
        }
      });
  }

  async deleteStudentDetails(studentId) {
    this._studentService
      .deleteStudent(studentId)
      .subscribe(async (updatedStudentName: string) => {
        if (updatedStudentName != null) {
          this.isSuccess = true;
        }

        if (this.isSuccess === true) {
          await this.studentGridLoad();
        }
      });
  }

  public async saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const studentDetails: StudentDetails = formGroup.value;

    this.updateStudentDetails(studentDetails);
    sender.closeRow(rowIndex);
  }

  public async removeHandler({ dataItem }) {
    const studentId = dataItem.id;

    this.openDialog(studentId);
  }

  openDialog(studentId) {
    const dialogRef = this.dialog.open(RemoveConfirmation, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((remove) => {
      if (remove) {
        this.deleteStudentDetails(studentId);
      }
    });
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public async studentGridLoad() {
    await this._studentService
      .getFindAllStudent()
      .subscribe((studentObj: any) => {
        for (let i = 0; i < studentObj.length; i++) {
          studentObj[i].dob = moment(studentObj[i].dob).format('MM/DD/YYYY');
        }
        if (studentObj.error) {
          alert('Failed to load data: ' + studentObj.error);
          return;
        }
        this.studentGridDataList = studentObj;
      });
  }
}
@Component({
  selector: 'confirmation-dialog',
  templateUrl: './student.dialog.html',
})
export class RemoveConfirmation {
  constructor(public dialogRef: MatDialogRef<RemoveConfirmation>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
