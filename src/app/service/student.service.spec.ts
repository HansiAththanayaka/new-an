import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { StudentDetails } from '../models/student.model';
import {
  DELETE_STUDENT,
  LIST_STUDENTS,
  UPDATE_STUDENT,
} from '../service/student.graphql.query';
import { StudentService } from '../service/student.service';

describe('Student Service Unit Testing', () => {
  let service: StudentService;
  let apolloController: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [StudentService],
    });
    service = TestBed.inject(StudentService);
    apolloController = TestBed.inject(ApolloTestingController);
  });

  it('Should be Initialized Properly', () => {
    expect(service).toBeTruthy();
  });

  it('Should return List of Students', () => {
    const expectedResult: any = [
      {
        id: 1,
        name: 'Olivia',
        dob: new Date('1993-07-14T00:00:00.000Z'),
        email: 'Olivia@gmail.com',
        age: 28,
      },
      {
        id: 2,
        name: 'Emma',
        dob: new Date('1991-07-31T00:00:00.000Z'),
        email: 'Olivia@gmail.com',
        age: 30,
      },
    ];
    service.getFindAllStudent().subscribe((actualResult) => {
      expect(actualResult).toEqual(expectedResult);
    });
  });

  it('It Should Call getFindAllStudent Function', () => {
    const spy = spyOn(service, 'getFindAllStudent');
    service.getFindAllStudent();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('It Should Call deleteStudent Function', () => {
    service.remove(1).then((actualResult) => {
      let isDeleted: any = actualResult;
      expect(isDeleted.removeStudent).toEqual({
        name: 'Olivia',
      });
    });
    apolloController.expectOne(DELETE_STUDENT(1)).flush({
      data: {
        removeStudent: {
          name: 'Olivia',
        }
      }
    });
  });

  it('Should Update the Student Matched with Given ID and return student object', () => {
    const updatedData: StudentDetails = {
      id: 1,
      name: 'Olivia',
      dob: new Date(7 / 14 / 1993),
      email: 'Olivia@gmail.com',
    };
    service.updateStudent(updatedData).subscribe((actualResult) => {
      const spy = spyOn(service, 'updateStudent');
      expect(spy).toEqual({
        StudentDetails,
      });
    });
  });

  it('Should Delete Student By Given ID and Return student object When Delete Completes', () => {
    service.deleteStudent(1).subscribe((actualResult) => {
      let isDeleted: any = actualResult.data;
      expect(isDeleted.removeStudent).toEqual({
        name: 'Olivia',
      });
    });
    apolloController.expectOne(DELETE_STUDENT(1)).flush({
      data: {
        removeStudent: {
          name: 'Olivia',
        }
      }
    });
  });

  it('It Should Call updateStudent Function', () => {
    const updatedData: StudentDetails = {
      id: 1,
      name: 'Olivia',
      dob: new Date(7 / 14 / 1993),
      email: 'Olivia@gmail.com',
    };
    const spy = spyOn(service, 'updateStudent');
    service.updateStudent(updatedData);
    expect(spy).toHaveBeenCalledTimes(1);

    service.save(updatedData).then((actualResult) => {
      let isUpdated: any = actualResult;
      expect(isUpdated.removeVehicle).toEqual({
        name: 'Olivia',
      });
    });

  });
});
