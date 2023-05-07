import React,{useState,useEffect} from "react";
import { Grid, Text } from "@nextui-org/react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { useMutation } from "@apollo/client";
import { DELETE_CAR } from "../GraphQL/Mutations";

const CardBodyNonEdit = ({
  id,
  name,
  model,
  year,
  state,
  reg,
  price,
  kms,
  rating,
  district,
  toast,
  setEditMode
}) => {
    const [changeLoading,setChangeLoading]=useState(false);
    const[label,setLabel]=useState("Delete");
    console.log(id)

    const [deleteCar,{loading,error,data}]=useMutation(DELETE_CAR);

    useEffect(()=>{
      if(error){
      console.log(error.message)
      toast.current.show({severity:"error",summary:"Cannot Delete ",detail:"cannot delete a car when its already booked"})
      }
    },[error])
    
      const items = [
          {
              label: 'Delete',
              icon: 'pi pi-times',
              command: () => {
                setLabel("Delete");
              }
          },
      ];
  
      const save = () => {
      //setChangeLoading(true);



        if(label==="Delete")
           {
            deleteCar({variables:{
              id:id
            }})
           }
       
    };
  
  return (
    <Grid.Container gap={3}>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          Make :
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>{name}</Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          Model :
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>{model}</Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          Registered On :
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>
          {year.split("T")[0]}
        </Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          State :
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>{state}</Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          District :
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>{district}</Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          Reg Number :
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>{reg}</Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          Price
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>
          {"$ " + price}
        </Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          Kilometers Driven
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>{kms}</Text>
      </Grid>
      <Grid xs={12} sm={6} justify="center">
        <Text h5 css={{}}>
          Rating:
        </Text>
        <Text css={{ color: "$accents8", marginLeft: "10px" }}>{rating}</Text>
      </Grid>

      <Grid xs={12} sm={6} justify="center">
        <SplitButton
          label={label}
          icon="pi pi-plus"
          onClick={save}
          model={items}
          loading={changeLoading}
        />
      </Grid>
    </Grid.Container>
  );
};

export default CardBodyNonEdit;
