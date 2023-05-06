import React, { useEffect, useState, useRef } from "react";
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
  useInput,
  Loading,
} from "@nextui-org/react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKING } from "../GraphQL/Mutations";
import { Toast } from "primereact/toast";

const PaymentModal = ({ carId, make, model, price, visible, setVisible }) => {
  const [addBooking, { loading, error, data, reset }] =
    useMutation(CREATE_BOOKING);

  const toast = useRef(null);

  const {
    value: startDateValue,
    reset: startDateReset,
    bindings: startDateBindings,
  } = useInput("");

  const {
    value: endDateValue,
    reset: endDateReset,
    bindings: endDateBindings,
  } = useInput("");

  const [startDateStatus, setStartDateStatus] = useState({
    color: "",
    text: "",
  });
  const [endDateStatus, setEndDateStatus] = useState({ color: "", text: "" });

  const [validEndDate, setValidEndDate] = useState(true);

  const paymentHandler = () => {
    addBooking({
      variables: {
        userId: parseInt(localStorage.getItem("userId")),
        carId: carId,
        startDate: startDateValue,
        endDate: endDateValue,
      },
    });

    if(!loading && !error)
     { toast.current.show({
        severity: "success",
        summary: "Booked Car Successfully",
      });
      setTimeout(()=>
      setVisible(false),500);
    }
  };

  useEffect(() => {
    if (error)
      toast.current.show({
        severity: "error",
        summary: "Cannot Book Car",
        detail: "car is already booked",
      });
  }, [error]);

  useEffect(() => {
    if (startDateValue > endDateValue) setValidEndDate(false);
    else setValidEndDate(true);
  }, [startDateValue, endDateValue]);

  const closeHandler = () => {
    setVisible(false);
    startDateReset();
    endDateReset();
    console.log("closed");
  };
  return (
    <Modal blur noPadding open={visible} onClose={closeHandler}>
      <Toast ref={toast}></Toast>
      <Card>
        <Card.Header>
          <Text b>Rent car</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Grid.Container>
            <Grid>
              <Row>
                <Text size="$md" css={{ marginBottom: "10px" }}>
                  Are you sure you want to rent {make} {model} for ${price} per
                  km from{" "}
                  {startDateValue ? startDateValue : "<choose a start date>"} to{" "}
                  {endDateValue ? endDateValue : "<choose a end date>"}
                </Text>
              </Row>
              <Row>
                <Col>
                  <Input
                    id="#startDate"
                    {...startDateBindings}
                    autoComplete="off"
                    onClearClick={startDateReset}
                    color={startDateStatus.color}
                    status={startDateStatus.color}
                    helperText={startDateStatus.text}
                    helperColor={startDateStatus.color}
                    type="date"
                    label="start date"
                    css={{ marginRight: "30px" }}
                  />
                </Col>
                <Col>
                  <Input
                    id="#endDate"
                    {...endDateBindings}
                    autoComplete="off"
                    onClearClick={endDateReset}
                    color={endDateStatus.color}
                    status={endDateStatus.color}
                    initialValue="123"
                    helperText={endDateStatus.text}
                    helperColor={endDateStatus.color}
                    type="date"
                    label="end date"
                  />
                </Col>
              </Row>
            </Grid>
          </Grid.Container>
        </Card.Body>

        <Card.Footer>
          <Row justify="flex-end">
            <Button size="sm" light onClick={closeHandler}>
              Cancel
            </Button>
            {validEndDate ? (
              !loading ? (
                <Button size="sm" onClick={paymentHandler}>
                  Agree
                </Button>
              ) : (
                <Button disabled>
                  <Loading color="currentColor" size="sm" />
                </Button>
              )
            ) : (
              <Button disabled>Agree</Button>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </Modal>
  );
};

export default PaymentModal;
