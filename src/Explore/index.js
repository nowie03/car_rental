import React, { useState, useEffect,useRef } from "react";
import {
  Grid,
  Input,
  Modal,
  Text,
  Link,
  Card,
  Button,
  Row,
  Col,
} from "@nextui-org/react";
import CarCard from "./carCard";
import { ScrollPanel } from "primereact/scrollpanel";
import Comment from "./Comment";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../GraphQL/Queries";
import StateDropdown from "./StateDropdown";
import KilometersRange from "./KilometersRange";
import { Typography } from "@mui/material";
import PaymentModal from "./PaymentModal";
import { Toast } from "primereact/toast";
import { ON_CAR_CREATE, ON_CAR_DELETE } from "../GraphQL/Subscription";


export default function Explore() {
  const [searchText, setSearchText] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);

  const [selected, setSelected] = useState("text");

  const {subscribeToMore, loading, error, data, refetch } = useQuery(GET_CARS);
  const toast = useRef(null);
  
  
  useEffect(() => {
    const subscribeToAdd=subscribeToMore({
      document:ON_CAR_CREATE,
      variables:{
        userId: parseInt(localStorage.getItem("userId")),
      },
      updateQuery:(prev,{subscriptionData})=>{
        console.log(prev);
        console.log(subscriptionData)
        const updatedCars=[subscriptionData.data.onCarCreate,...prev.cars]
        console.log(updatedCars)
        return {cars:updatedCars}
      }
    })
  
    const subscribeToDelete = subscribeToMore({
      document: ON_CAR_DELETE,
      variables: {
        userId: parseInt(localStorage.getItem("userId")),
      },
      updateQuery: (prev, { subscriptionData }) => {
        const updatedCars = prev.cars.filter(
          (item) => item.id !== subscriptionData.data.onCarDelete.id
        );
        console.log("on delete called in car card explore")
        return { cars: updatedCars };
      },
    });
    
    return () => {
      subscribeToAdd();
      subscribeToDelete();
    };
  }, [subscribeToMore]);

  if (loading) return "loading...";

  if (error) return `Error ${error.message}`;


  return (
    <Grid.Container justify="center">
      <Toast ref={toast}></Toast>
      <Grid xs={6} css={{ marginTop: "30px", marginLeft: "50px" }}>
        <Row>
          <Col>
            <Input
              label="Model"
              type="search"
              autoComplete="off"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col>
            <StateDropdown
              selected={selectedState}
              setSelected={setSelectedState}
            />
          </Col>
        </Row>
      </Grid>
      {!loading &&
        data.cars.map(
          (car) =>
            (!selectedState.currentKey ||
              selectedState.currentKey === "all" ||
              selectedState.currentKey.toLowerCase() === car.state.toLowerCase()) &&
            (searchText === "" ||
              car.model.toLowerCase().startsWith(searchText)) && (
              <>
                <PaymentModal
                toast={toast}
                  carId={car.id}
                  make={car.make}
                  model={car.model}
                  price={car.pricePerKm}
                  visible={visible}
                  setVisible={setVisible}
                />
                <Grid xs={7}>
                  <CarCard
                    name={car.make}
                    model={car.model}
                    reg={car.regNumber}
                    state={car.state}
                    kms={car.kmsDriven}
                    imageSource={car.imgUrl}
                    price={car.pricePerKm}
                    owner={car.owner}
                    bookings={car.bookings.length}
                    onClickHandler={handler}
                  />
                </Grid>
                <Grid xs={3}>
                  <ScrollPanel
                    style={{ width: "100%", height: "400px", padding: "5px" }}
                    className="custombar1"
                  >
                    <Text h5>Comments</Text>
                    {car.comments.map((comment) => (
                      <Comment comment={comment} />
                    ))}
                  </ScrollPanel>
                </Grid>
              </>
            )
        )}
    </Grid.Container>
  );
}
