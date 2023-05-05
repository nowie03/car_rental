import {
  Card,
  Grid,
  Input,
  Row,
  Col,
  Collapse,
  Button,
} from "@nextui-org/react";
import { Icon, Flex } from "gestalt";
import React, { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

export default function ListingCarCard({
  toast,
  rating,
  district,
  name,
  imageSource,
  price,
  owner,
  year,
  model,
  state,
  reg,
  bookings,
  kms,
}) {
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
        <Card css={{ w: "100%", margin: "30px" }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={imageSource}
              objectFit="cover"
              width="100%"
              height={140}
              alt={name}
            />
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Collapse css={{ width: "100%" }} title={name}>
              <Grid.Container gap={3}>
                <Grid xs={12}>
                  <Row>
                    <Col>
                      <Input
                        underlined
                        label="Make"
                        color="default"
                        initialValue={name}
                      />
                    </Col>
                    <Col>
                      <Input
                        underlined
                        label="Model"
                        color="default"
                        initialValue={model}
                      />
                    </Col>
                  </Row>
                </Grid>
                <Grid xs={12}>
                  <Row>
                    <Col>
                      <Input
                        underlined
                        label="State"
                        color="default"
                        initialValue={state}
                      />
                    </Col>
                    <Col>
                      <Input
                        underlined
                        label="District"
                        color="default"
                        initialValue={district}
                      />
                    </Col>
                  </Row>
                </Grid>
                <Grid xs={12}>
                  <Row>
                    <Col>
                      <Input
                        underlined
                        label="Price"
                        color="default"
                        initialValue={price}
                      />
                    </Col>
                    <Col>
                      <Input
                        underlined
                        label="Image url"
                        color="default"
                        initialValue={imageSource}
                      />
                    </Col>
                  </Row>
                </Grid>
                <Grid>
                  <Row>
                    <Col>
                      <Button flat color="success" css={{marginRight:"$11"}} auto>
                        Save
                      </Button>
                    </Col>
                    <Col>
                    <Button flat color="error" auto>
                        cancel
                      </Button></Col>
                  </Row>
                </Grid>
              </Grid.Container>
            </Collapse>
          </Card.Footer>
        </Card>
      )}
    </>
  );
}
