import React from 'react'
import BookingCard from './UpcomingBookingCard'
import PreviousBookingCard from "./PreviousBookingCard"
import {Collapse,Text,Grid}  from "@nextui-org/react";
import { useQuery } from '@apollo/client';
import { GET_BOOKINGS } from '../GraphQL/Queries';

const userId=1;

const seggregateBookings=(bookings)=>{
    const upcomingBookings=[],previousBookings=[]

    bookings.map(booking=>{
        console.log(new Date()<booking.endDate)
        if(booking.endDate<new Date())upcomingBookings.push(booking);
        else previousBookings.push(booking)
    })
    return {previousBookings,upcomingBookings};
}

const MyBooking = () => {
    const {loading,error,data,refetch}=useQuery(GET_BOOKINGS,{
        variables:{
            userId:userId
        }
    });

    if(loading )return <p>Loading...</p>
    
    if (error) return `Error ${error.message}`;


    const {previousBookings,upcomingBookings}=seggregateBookings(data.userBookings);
    console.log(previousBookings,upcomingBookings)
    
  return (
    <Collapse.Group splitted>
      <Collapse title="Upcoming Bookings" >
       <Grid.Container>
        {!loading && upcomingBookings.map(booking=>
        <Grid xs={12} css={{margin:"10px"}}>
            <BookingCard car={booking.bookedCar} startDate={booking.startDate} endDate={booking.endDate}/>
        </Grid>
        )}
       </Grid.Container>
      </Collapse>
      <Collapse title="Previous Bookings">
        <Grid.Container>
        {!loading && previousBookings.map(booking=>
        <Grid xs={12} css={{margin:"10px"}}>
            <PreviousBookingCard car={booking.bookedCar} startDate={booking.startDate} endDate={booking.endDate}/>
        </Grid>
        )}
        </Grid.Container>
      </Collapse>
      
    </Collapse.Group>
  )
}

export default MyBooking
