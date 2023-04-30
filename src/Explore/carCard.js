import { Card, Col, Row, Button, Text, User, Grid } from "@nextui-org/react";
import { Icon, Flex } from "gestalt";
import React, { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

import "./CarCard.css";

export default function CarCard({ name, imageSource, price, onClickHandler }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const response = await fetch('car', {
  //             headers: {
  //                 'Authorization': `Bearer #1536188#@$!%`
  //             }

  //         });
  //         const data = await response.json();
  //         setData(data);
  //         console.log(data);
  //         setLoading(false);
  //     }

  //     fetchData();

  // }, []);

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
                {name}
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
              <Grid xs={3} justify="flex-end">
                <User
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  name="Ariana Wattson"
                  zoomed
                />
              </Grid>
              <Grid xs={3}>
                <Rating
                  value={5}
                  readOnly
                  cancel={false}
                  //style={{ marginLeft: "14px" }}
                />
              </Grid>
              <Grid xs={2}>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="black"
                >
                  TN 01 AG 342
                </Text>
              </Grid>
              <Grid xs={2}>
                <Text size={13} color="default" weight="bold">
                  <Icon icon="saved" accessibilityLabel="Pin" color="default" />
                  43
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
                    {price}
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