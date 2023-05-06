import React from "react";
import { Card, Row, Button, Text, Grid,Avatar } from "@nextui-org/react";
import { useMutation } from "@apollo/client";
import { CANCEL_BOOKING } from "../GraphQL/Mutations";

const BookingCard = ({id,car,startDate,endDate,toast}) => {

  const [cancelBooking,{called,loading,data}]=useMutation(CANCEL_BOOKING);

  const handleCancelBooking=()=>{
    cancelBooking({variables:{id:id}})
    toast.current.show({
      severity: "success",
      summary: "Cancelled Booking",
    });
  }

  return (
    <Card css={{margin:"20px"}}>
      <Card.Header>
      <Avatar
      squared
          alt="nextui logo"
          src={car.imgurl}
          width="44px"
          height="44px"
        />
      <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12} css={{margin:"10px"}}>
            <Text h4 css={{ lineHeight: "$xs" }}>
            {car.state.split(' ')[0][0]+car.state.split(' ')[1][0]+" "+car.regNumber}
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>{startDate.split('T')[0]} to {endDate.split('T')[0]} </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Divider />
      
      <Card.Footer>
        <Row justify="flex-end">
          <Button  css={{marginRight:"$2"}}size="sm" light>
            Contact Owner
          </Button>
          <Button shadow color="error" size="sm" onClick={handleCancelBooking}>Cancel</Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BookingCard;
