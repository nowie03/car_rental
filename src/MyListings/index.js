import React, { useState,useRef } from "react";
import { Text, Grid, Input } from "@nextui-org/react";
import ListingCarCardEdit from "./ListingCarCardWithEdit";
import ListingCarCard from "./ListingCard";
import { ScrollPanel } from "primereact/scrollpanel";
import { SpeedDial } from 'primereact/speeddial'; 
import { Datapoint } from "gestalt";
import "gestalt/dist/gestalt.css";
import { useQuery } from "@apollo/client";
import { GET_LISTINGS } from "../GraphQL/Queries";
import { Toast } from 'primereact/toast';

const MyListings = () => {
  const [searchText, setSearchText] = useState("");
  const toast = useRef(null);

  const {loading,error,data,refetch}=useQuery(GET_LISTINGS);

  if(error){
    console.log(error)
    return <p>{error.message}</p>
  }
  console.log(data);

  

  
  return (

    <div style={{ position: 'relative',height:"100%"}}>
      <Toast ref={toast}></Toast>
      <Grid.Container justify="space-around">
        <Grid xs={12} css={{ marginTop: "30px" }}>
          <Text h3>Take A Look At Your Cars....</Text>
        </Grid>

        {!loading && data.ownedCars.map((car) => (
          <>
            <Grid xs={7}>
              <ListingCarCard
              toast={toast}
               name={car.make}
               model={car.model}
               reg={car.regNumber}
               state={car.state}
               kms={car.kmsDriven}
               year={car.year}
               rating={car.rating}
               imageSource={car.imgUrl}
               price={car.pricePerKm}
               owner={car.owner}
               bookings={car.bookings.length}
               district={car.district}
              />
            </Grid>
            <Grid xs={3}>
              <ScrollPanel
                style={{ width: "100%", height: "400px", padding: "5px" }}
                className="custombar1"
              >
                <Datapoint
                  size="sm"
                  title="Total Bookings"
                  tooltipText="The number of times your car has been booked"
                  trend={{ value: 30, accessibilityLabel: "Trending up" }}
                  value={car.bookings.length}
                />
                <Datapoint
                size="sm"
                title="Total Kms Driven"
                tooltipText="The total Kms driven since this car has been listed"
                trend={{ value: 10, accessibilityLabel: "Trending up" }}
                value={car.kmsDriven}
              />
                <Datapoint
                  size="sm"
                  title="Total Revenue"
                  tooltipText="The total revenue generated from this car"
                  trend={{ value: 10, accessibilityLabel: "Trending up" }}
                  value={parseInt(car.kmsDriven)*parseFloat(car.pricePerKm)}
                />
              </ScrollPanel>
            </Grid>
          </>
        ))}
      </Grid.Container>
    </div>
  );
};

export default MyListings;
