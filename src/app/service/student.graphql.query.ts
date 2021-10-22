import { gql } from "apollo-angular";
import { StudentDetails } from "../models/student.model";

export const UPDATE_STUDENT = (studentDetails: StudentDetails) => {
  return gql`
      mutation{
        updateStudent ( student: {
          id:${studentDetails.id}
          name:"${studentDetails.name}"
          dateOfBirth: "${studentDetails.dob}"
          email: "${studentDetails.email}"
        }) {
          id
          name
          age
          dateOfBirth
          email
        }
      }
    `;
};

export const DELETE_STUDENT = (id: number) => {
  return gql`
  mutation{
    removeStudent(id: ${id}){
      name
  }
}`;
};

export const LIST_STUDENTS = gql`
  query {
    getFindAllStudent {
      id
      name
      dateOfBirth
      email
      age
    }
  }
`;
