import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { EditService } from './edit.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public formGroup: FormGroup;

  private editService: EditService;
  private editedRowIndex: number;

  constructor(@Inject(EditService) editServiceFactory: any) {
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {}
}
