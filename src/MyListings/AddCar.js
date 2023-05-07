import * as React from "react";
import { Grid, Card, Text, Input, Button, useInput } from "@nextui-org/react";
import ImageUpload from "./ImageUpload";
import { useMutation } from "@apollo/client";
import { ADD_CAR } from "../GraphQL/Mutations";

export default function ColorTabs() {
  const {
    value: carMakeValue,
    reset: carMakeReset,
    bindings: carMakeBindings,
  } = useInput("");
  const {
    value: carModelValue,
    reset: carModelReset,
    bindings: carModelBindings,
  } = useInput("");
  const {
    value: registrationNumberValue,
    reset: registrationNumberReset,
    bindings: registrationNumberBindings,
  } = useInput("");
  const {
    value: stateValue,
    reset: stateReset,
    bindings: stateBindings,
  } = useInput("");
  const {
    value: districtValue,
    reset: districtReset,
    bindings: districtBindings,
  } = useInput("");
  const {
    value: cityValue,
    reset: cityReset,
    bindings: cityBindings,
  } = useInput("");
  const {
    value: kmsValue,
    reset: kmsReset,
    bindings: kmsBindings,
  } = useInput("");
  const {
    value: priceValue,
    reset: priceReset,
    bindings: priceBindings,
  } = useInput("");
  const {
    value: yearValue,
    reset: yearReset,
    bindings: yearBindings,
  } = useInput("");

  const [imgUrl, setImgUrl] = React.useState();

  const [addCar, { loading, error, data }] = useMutation(ADD_CAR);

  const onClickHandler = () => {
    console.log(carMakeValue, carModelValue, priceValue);
    addCar({
      variables: {
        city: cityValue,
        district: districtValue,
        imgUrl: imgUrl,
        make: carMakeValue,
        model: carModelValue,
        kmsDriven: parseInt(kmsValue),
        ownerId: parseInt(localStorage.getItem("userId")),
        pricePerKm: parseFloat(priceValue),
        regNumber: registrationNumberValue,
        state: stateValue,
        year: yearValue,
      },
    });
  };

  const onUploadHandler = (event) => {
    const fileList = event.files;
    // Access the selected file(s) from the "fileList" array
    setImgUrl(fileList[0].objectURL);
    console.log(fileList);
  };

  React.useEffect(() => console.log(error), [error]);

  return (
    <Grid.Container css={{ marginLeft: "70px" }} justify="center">
      <Grid xs={12}>
        <ImageUpload onUploadHandler={onUploadHandler} />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input {...carMakeBindings} label="Car Make" placeholder="Toyota..." />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input
          {...carModelBindings}
          label="Car Model"
          placeholder="Glanza..."
        />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input
          {...registrationNumberBindings}
          label="Registration Number"
          placeholder="BA-1821"
        />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input {...stateBindings} label="State" placeholder="Karnataka.." />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input {...districtBindings} label="District" placeholder="Udupi.." />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input {...cityBindings} label="City" placeholder="Udupi...." />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input
          {...kmsBindings}
          label="Kilometers Driven"
          placeholder="10000"
          type="number"
        />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input
          {...priceBindings}
          label="Price Per Km"
          placeholder="21"
          type="number"
        />
      </Grid>
      <Grid xs={4} css={{ marginTop: "20px" }}>
        <Input
          {...yearBindings}
          label="Registered Date"
          placeholder="mm-dd-yy"
          type="string"
        />
      </Grid>
      <Grid xs={12} css={{ marginTop: "20px" }}>
        <Button flat shadow color="secondary" onClick={onClickHandler}>
          Submit
        </Button>
      </Grid>
    </Grid.Container>
  );
}
