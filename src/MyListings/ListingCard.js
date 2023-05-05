import {
  Card,
  Grid,
  Button,
  Row,
  Col,
  Collapse,
  Text,
  yellowDark,
} from "@nextui-org/react";
import { Icon, Flex } from "gestalt";
import React, { useState, useEffect,useRef } from "react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import CardBodyNonEdit from "./CardBodyNonEdit";
import CardBodyEdit from "./CarBodyEdit";

export default function ListingCarCard({toast,rating,district, name, imageSource,price,owner,year,model,state,reg,bookings,kms}) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
 

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
              height={250}
              alt={name+" "+model}
            />
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-end" }}>
            <Collapse css={{ width: "100%" }} title={name+" "+model} subtitle="More description...">

              {!editMode && <CardBodyNonEdit toast={toast} name={name} model={model} state={state} district={district}
              year={year} price={price} kms={kms} reg={reg} rating={rating} setEditMode={setEditMode}/>
}                {editMode && <CardBodyEdit toast={toast} name={name} model={model} state={state} district={district}
              year={year} price={price} kms={kms} reg={reg} rating={rating} setEditMode={setEditMode}/>}
            </Collapse>
          </Card.Footer>
        </Card>
      )}
    </>
  );
}
