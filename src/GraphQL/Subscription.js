import { gql } from "@apollo/client";

export const ON_BOOKING_DELETE = gql`
  subscription onBookingDelete($userId: Int!) {
    onBookingDelete(userId: $userId) {
      id
    }
  }
`;

export const ON_BOOKING_CREATE = gql`
  subscription onBookingCreate($userId: Int!) {
    onBookingCreate(userId: $userId) {
      id
      startDate
      endDate
      bookedCar {
        id
        make
        model
        imgUrl
        regNumber
        state
        pricePerKm
        state
        district
        kmsDriven
        owner {
          id
          email
          phoneNumber
        }
      }
    }
  }
`;

export const ON_CAR_CREATE=gql`
subscription onCarCreate($userId:Int!){
  onCarCreate(userId: $userId) {
     id
      make
      model
      city
      state
      year
      district
      kmsDriven
      imgUrl
      regNumber
      owner {
        id
        email
      }
      comments {
        message
        createdAt
        fromUser {
          id
          email
        }
      }
      pricePerKm
      bookings {
        id
      }
  }
}`;

export const ON_CAR_DELETE=gql`
subscription onCarDelete($userId:Int!){
  onCarDelete(userId:$userId) {
    id
  }
}
`;
