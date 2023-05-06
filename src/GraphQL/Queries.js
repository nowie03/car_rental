import { gql, useQuery } from "@apollo/client";

export const GET_CARS = gql`
  query {
    cars {
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
  }
`;

export const GET_LISTINGS = gql`
  query {
    ownedCars(userId: 1) {
      id
      make
      model
      city
      state
      year
      district
      kmsDriven
      pricePerKm
      rating
      district
      imgUrl
      regNumber
      owner {
        id
      }
      bookings {
        id
      }
      comments {
        id
        message
      }
    }
  }
`;

export const GET_BOOKINGS = gql`
  query userBookings($userId: Int!) {
    userBookings(userId: $userId) {
      id,
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

export const GET_USER_BY_MAIL = gql`
  query user($email: String!) {
    user(email: $email) {
      id,
      email
      password
    }
  }
`;

export const SIGNIN=gql`query
signin($email:String!,$password:String!){
signIn(email: $email,password:$password) 
}`;


