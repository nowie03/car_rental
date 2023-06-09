import React, { useEffect, useRef } from "react";
import BookingCard from "./UpcomingBookingCard";
import PreviousBookingCard from "./PreviousBookingCard";
import {
  Collapse,
  Text,
  Grid,
  Modal,
  Textarea,
  Button,
  Row,
  Checkbox,
  useInput,
} from "@nextui-org/react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_BOOKINGS } from "../GraphQL/Queries";
import {
  ON_BOOKING_CREATE,
  ON_BOOKING_DELETE,
  OnBookingDelete,
} from "../GraphQL/Subscription";
import { Toast } from "primereact/toast";
import { CREATE_COMMENT } from "../GraphQL/Mutations";

const seggregateBookings = (bookings) => {
  const upcomingBookings = [],
    previousBookings = [];

  bookings.map((booking) => {
    if (new Date(booking.endDate) >= Date.now()) upcomingBookings.push(booking);
    else previousBookings.push(booking);
  });
  return { previousBookings, upcomingBookings };
};

const MyBooking = () => {
  const toast = useRef(null);
  const { subscribeToMore, loading, error, data, refetch } = useQuery(
    GET_BOOKINGS,
    {
      variables: {
        userId: parseInt(localStorage.getItem("userId")),
      },
    }
  );

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };



  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
 

  useEffect(() => {
    const subscribeToDelete = subscribeToMore({
      document: ON_BOOKING_DELETE,
      variables: {
        userId: parseInt(localStorage.getItem("userId")),
      },
      updateQuery: (prev, { subscriptionData }) => {
        const updatedBookings = prev.userBookings.filter(
          (item) => item.id !== subscriptionData.data.onBookingDelete.id
        );
        return { userBookings: updatedBookings };
      },
    });

    const subscribeToAdd = subscribeToMore({
      document: ON_BOOKING_CREATE,
      variables: {
        userId: parseInt(localStorage.getItem("userId")),
      },
      updateQuery: (prev, { subscriptionData }) => {
        const updatedBookings = [
          ...prev.userBookings,
          subscriptionData.data.onBookingCreate,
        ];
        return { userBookings: updatedBookings };
      },
    });

    return () => {
      subscribeToDelete();
      subscribeToAdd();
    };
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;

  if (error) return `Error ${error.message}`;

  const { previousBookings, upcomingBookings } = seggregateBookings(
    data.userBookings
  );

  return (
    <Collapse.Group splitted>
      <Toast ref={toast}></Toast>
      <Collapse title="Upcoming Bookings">
        <Grid.Container>
          {!loading &&
            upcomingBookings.map((booking) => (
              <Grid Grid xs={12} css={{ margin: "10px" }}>
                <BookingCard
                  refetch={refetch}
                  id={booking.id}
                  car={booking.bookedCar}
                  startDate={booking.startDate}
                  endDate={booking.endDate}
                  toast={toast}
                />
              </Grid>
            ))}
        </Grid.Container>
      </Collapse>
      <Collapse title="Previous Bookings">
        <Grid.Container>
          {!loading &&
            previousBookings.map((booking) => (
              <Grid xs={12} css={{ margin: "10px" }}>
                <PreviousBookingCard
                  id={booking.id}
                  refetch={refetch}
                  car={booking.bookedCar}
                  startDate={booking.startDate}
                  endDate={booking.endDate}
                  onPress={handler}
                  closeHandler={closeHandler}
                  visible={visible}
                  toast={toast}
                />
              </Grid>
            ))}
        </Grid.Container>
      </Collapse>
    </Collapse.Group>
  );
};

export default MyBooking;
