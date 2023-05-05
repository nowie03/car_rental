import React, { useState } from "react";
import { Grid, Text, Row, Col, Input, Button } from "@nextui-org/react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";

const CardBodyEdit = ({
  name,
  model,
  imageSource,
  year,
  state,
  reg,
  price,
  kms,
  rating,
  district,
  toast,
  setEditMode,
}) => {
  const [changeLoading, setChangeLoading] = useState(false);
  const [label, setLabel] = useState("update");

  const items = [
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: () => {
        setLabel("Update");
        toast.current.show({
          severity: "success",
          summary: "Updated",
          detail: "Data Updated",
        });
      },
    },
    {
      label: "Delete",
      icon: "pi pi-times",
      command: () => {
        setLabel("Delete");

        toast.current.show({
          severity: "warn",
          summary: "Delete",
          detail: "Data Deleted",
        });
      },
    },
    {
      label: "Upload",
      icon: "pi pi-upload",
      command: () => {
        //router.push('/fileupload');
      },
    },
  ];

  const save = () => {
    setChangeLoading(true);

    setTimeout(() => {
      setChangeLoading(false);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Data Saved",
      });
    }, 2000);
  };

  return (
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
            <Button
              onClick={() => {
                toast.current.show({
                  severity: "success",
                  summary: "Updated",
                  detail: "Data Updated",
                });
                setEditMode(false);
              }}
              flat
              color="success"
              css={{ marginRight: "$11" }}
              auto
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button onClick={() => setEditMode(false)} flat color="error" auto>
              cancel
            </Button>
          </Col>
        </Row>
      </Grid>
    </Grid.Container>
  );
};

export default CardBodyEdit;
