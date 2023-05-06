import React, { useState, useEffect } from "react";
import { Grid, Input, Modal, Text, Link, Card ,Button,Row,Col} from "@nextui-org/react";
import CarCard from "./carCard";
import { ScrollPanel } from "primereact/scrollpanel";
import Comment from "./Comment";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../GraphQL/Queries";
import StateDropdown from "./StateDropdown";
import KilometersRange from "./KilometersRange";
import { Typography } from "@mui/material";
import PaymentModal from "./PaymentModal";

export default function Explore() {
  const [searchText, setSearchText] = useState("");
  const [selectedState,setSelectedState]=useState("All")

  const [visible, setVisible] = React.useState(false);
  
    const handler = () => setVisible(true);


  const [selected,setSelected]=useState("text")

  const { loading, error, data, refetch } = useQuery(GET_CARS);

  if (loading) return "loading...";

  if (error) return `Error ${error.message}`;

  const list = [
    {
      title: "NISSAN",
      img: "https://images.unsplash.com/photo-1542228262-3d663b306a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
      price: "$5.50",
    },
    {
      title: "HYUNDAI",
      img: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80",
      price: "$3.00",
    },
    {
      title: "NISSAN",
      img: "https://images.unsplash.com/photo-1542228262-3d663b306a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
      price: "$5.50",
    },
    {
      title: "HYUNDAI",
      img: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80",
      price: "$3.00",
    },
    {
      title: "NISSAN",
      img: "https://images.unsplash.com/photo-1542228262-3d663b306a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
      price: "$5.50",
    },
    {
      title: "HYUNDAI",
      img: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80",
      price: "$3.00",
    },
    {
      title: "NISSAN",
      img: "https://images.unsplash.com/photo-1542228262-3d663b306a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
      price: "$5.50",
    },
    {
      title: "HYUNDAI",
      img: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80",
      price: "$3.00",
    },
  ];

  return (
    <Grid.Container justify="center">
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
           <StateDropdown selected={selectedState} setSelected={setSelectedState}/>
          </Col>
        </Row>
      </Grid>
      {console.log(selectedState.currentKey+" "+searchText+" "+data.cars[0].model.toLowerCase().startsWith(searchText))}
      {!loading &&
        data.cars.map((car) => (
         
          (!selectedState.currentKey || selectedState.currentKey==="all" || selectedState.currentKey===car.state) &&(searchText==="" || car.model.toLowerCase().startsWith(searchText)) &&
          <>
           <PaymentModal carId={car.id}  make={car.make} model={car.model} price={car.pricePerKm} visible={visible} setVisible={setVisible}/>
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
                  <Comment message={comment.message} />
                ))}
              </ScrollPanel>
            </Grid>
          </>
        ))}
    </Grid.Container>
  );
}
