import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $phoneNumber: String!
    $password: String!
    $imgUrl: String!
  ) {
    createUser(
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      imgUrl: $imgUrl
    ) {
      id
      email
      password
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation createBooking(
    $userId: Int!
    $carId: Int!
    $startDate: String!
    $endDate: String!
  ) {
    createBooking(
      userId: $userId
      carId: $carId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      bookedBy {
        id
        email
      }
      bookedCar {
        id
        make
        model
      }
      startDate
      endDate
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation deleteBooking($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`;
