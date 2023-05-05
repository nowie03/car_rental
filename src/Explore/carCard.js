import { Card, Col, Row, Button, Text, User, Grid } from "@nextui-org/react";
import { Icon, Flex } from "gestalt";
import React, { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

import "./CarCard.css";
import BasicRating from "../MyBookings/Rating";

export default function CarCard({ name, imageSource, price, onClickHandler,model,kms,state,reg,owner,bookings }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  return (
    <>
      {" "}
      {loading ? (
        <p>Loading</p>
      ) : (
        <Card
          isPressable
          isHoverable
          css={{ w: "100%", h: "400px", margin: "30px" }}
        >
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                New
              </Text>
              <Text h3 color="white">
                {name}{ " "+model}
              </Text>
            </Col>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={imageSource}
              width="100%"
              height="100%"
              objectFit="cover"
              alt="Card example background"
            />
          </Card.Body>
          <Card.Footer
            isBlurred
            css={{
              position: "absolute",
              bgBlur: "#ffffff66",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
              bottom: 0,
              zIndex: 1,
              padding: "10px",
            }}
          >
            <Grid.Container>
              <Grid xs={3} justify="flex-start">
                <User
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  name={owner.email.split("@")[0]}
                  zoomed
                />
              </Grid>
              <Grid xs={3}>
                <BasicRating/>
              </Grid>
              <Grid xs={2}>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="black"
                >
                  {state.split(" ")[0][0]+state.split(" ")[1][0]+ " "}{reg}
                </Text>
              </Grid>
              <Grid xs={2}>
                <Text size={13} color="default" weight="bold">
                  <Icon icon="saved" accessibilityLabel="Pin" color="default" />
                  {bookings}
                </Text>
              </Grid>

              <Grid xs={2}>
                <Button
                  flat
                  auto
                  rounded
                  color="secondary"
                  onClick={() => onClickHandler()}
                  //   css={{ marginRight: "10px" }}
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    {"$ "+price}
                  </Text>
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </Card>
      )}
    </>
  );
}
