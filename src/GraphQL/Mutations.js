import { gql } from "@apollo/client"

export const CREATE_USER=gql`
mutation createUser($email:String!,$phoneNumber:String!,$password:String!,$imgUrl:String!){
    createUser(email:$email,phoneNumber: $phoneNumber,password:$password,imgUrl: $imgUrl) {
      id,email,password
    }
  }
`