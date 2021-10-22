import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../service/student.service';
import { UploadFilesService } from '../service/upload-files.service';
import { GatewayService } from '../service/gateway.service';
import { StudentComponent } from '../student/student.component';
import { io } from 'socket.io-client';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  private readonly notifier: NotifierService;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  title = 'app';
  incomingmsg = [];
  msg = 'First Protocol';
  fileInfos: Observable<any>;

  constructor(
    private uploadService: UploadFilesService,
    private studentComponent: StudentComponent,
    private socketService: GatewayService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.socketService.getMessage().subscribe(async (msg: any) => {
      const { status } = msg;

      if (status === 1) {
        this.notifier.notify('success', 'Successfully added your file!');
        await this.studentComponent.studentGridLoad();
      } else {
        this.notifier.notify('failed', 'File upload failed!');
      }
    });

    this.studentComponent.studentGridLoad();
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;

    this.currentFile = this.selectedFiles.item(0);
  }

  refresh(): void {
    window.location.reload();
  }

  upload() {
    const formData = new FormData();
    formData.append('file', this.currentFile);
    this.uploadService.uploadFile(formData);
    this.studentComponent.studentGridLoad();
  }
}
