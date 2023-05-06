import React from "react";
import { Card, Row, Button, Text, Avatar,Grid } from "@nextui-org/react";
import BasicRating from "./Rating";

const BookingCard = ({id,car,startDate,endDate}) => {
  return (
    <Card css={{margin:"20px"}}>
      <Card.Header>
      <Avatar
      squared
          alt="nextui logo"
          src={car.imgUrl}
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
            <Text css={{ color: "$accents8" }}>{startDate.split('T')[0]} to {endDate.split('T')[0]}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: "$10" }}>
        <Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Text>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row justify="flex-end">
          <BasicRating/>
          <Button shadow color="success" size="sm">Rent Again</Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BookingCard;
