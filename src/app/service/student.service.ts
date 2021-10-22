import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import axios from 'axios';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentDetails } from '../models/student.model';
import {
  DELETE_STUDENT,
  LIST_STUDENTS,
  UPDATE_STUDENT,
} from './student.graphql.query';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
 
  constructor(private apollo: Apollo) {}

  private data: any[] = [];

  updateStudent(studentDetails: StudentDetails): Observable<StudentDetails> {
    
    return this.apollo
      .mutate({
        mutation: UPDATE_STUDENT(studentDetails),
      })
      .pipe(
        map((result: any) => result?.data?.updateStudent),
        map((result: any) => {
          
          return result;
        })
      );
  }

  deleteStudent(id: number) {
    
    return this.apollo
      .mutate({
        mutation: DELETE_STUDENT(id),
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map((result: any) => result?.data?.removeStudent),
        map((result: any) => {
         
          return result;
        })
      );
  }

  public async save(data: any) {
    await this.updateStudent(data);
  }

  public async remove(id: number) {
    this.reset();

    await this.deleteStudent(id);
  }

  private reset() {
    this.data = [];
  }

  getFindAllStudent(): Observable<StudentDetails[]> {
   
    return this.apollo
      .query({
        query: LIST_STUDENTS,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map((result: any) => result?.data?.getFindAllStudent),
        map((result: any) => {
        
          return result?.map(
            (data: any) =>
              ({
                id: data.id,
                name: data.name,
                dob: data.dateOfBirth,
                email: data.email,
                age: data.age,
              } as StudentDetails)
          );
        })
      );
  }
}
