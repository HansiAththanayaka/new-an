import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UploadFilesService {
  constructor() {}

  async uploadFile(fileData) {
    try {
      const { data } = await axios.post(
        'http://localhost:3001/bulk/student',
        fileData
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
