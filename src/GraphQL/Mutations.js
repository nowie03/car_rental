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

export const ADD_CAR = gql`
  mutation createcar(
    $make: String!
    $model: String!
    $district: String!
    $state: String!
    $city: String!
    $year: String!
    $imgUrl: String!
    $kmsDriven: Int!
    $regNumber: String!
    $ownerId: Int!
    $pricePerKm: Float!
  ) {
    createcar(
      make: $make
      model: $model
      state: $state
      district: $district
      city: $city
      year: $year
      kmsDriven: $kmsDriven
      imgUrl: $imgUrl
      ownerId: $ownerId
      regNumber: $regNumber
      pricePerKm: $pricePerKm
    ) {
      id,
      make,
      pricePerKm,
      model,
      city,
      state,
      year,
      district,
      kmsDriven,
      pricePerKm,
      district,
      imgUrl,
      regNumber
    }
  }
`;

export const DELETE_CAR=gql`mutation
removeCar($id:Int!){
  removeCar(id:$id) {
    id
  }
}`

export const CREATE_COMMENT=gql`
mutation createComment($carId:Int!,$userId:Int!,$message:String!){
  createComment(carId: $carId,userId: $userId,message: $message) {
    id,
    forCar {
      id
    },message
  }
}
`
