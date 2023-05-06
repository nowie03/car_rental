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
