import React from "react";
import { Card, Row, Button, Text, Grid,Avatar } from "@nextui-org/react";

const BookingCard = () => {
  return (
    <Card css={{margin:"20px"}}>
      <Card.Header>
      <Avatar
      squared
          alt="nextui logo"
          src="https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80"
          width="44px"
          height="44px"
        />
      <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12} css={{margin:"10px"}}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              TN 62 9846
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>25-04-2023 to 27-04-2023</Text>
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
          <Button  css={{marginRight:"$2"}}size="sm" light>
            Contact Owner
          </Button>
          <Button shadow color="error" size="sm">Cancel</Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BookingCard;
