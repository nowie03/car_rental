import React from "react";
import {
  Card,
  Row,
  Button,
  Text,
  Avatar,
  Grid,
  Modal,
  Textarea,
  Input,
  useInput,
} from "@nextui-org/react";
import { CREATE_COMMENT } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";


const BookingCard = ({ id, car, startDate, endDate, onPress,closeHandler ,visible,toast}) => {
  const { value: messageValue, reset, bindings } = useInput("");

  const [
    addComment,
    { loading: commentLoading, error: commentError, data: commentData },
  ] = useMutation(CREATE_COMMENT);  
 
  const commentAddHandler = async (car) => {
    await addComment({
      variables: {
        carId: parseInt(car.id),
        userId: parseInt(localStorage.getItem("userId")),
        message: messageValue,
      },
    });
    toast.current.show({
      severity: "success",
      summary: "comment added",
    });
    closeHandler()
  };
  return (
    <Card css={{ margin: "20px" }}>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Your
            <Text b size={18}>
              {" "}
              Comment
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Textarea
            {...bindings}
            label="Write your thoughts"
            placeholder="Enter your valuable feedback..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto color="warning" onPress={()=>commentAddHandler(car)}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
      <Card.Header>
        <Avatar
          squared
          alt="nextui logo"
          src={car.imgUrl}
          width="44px"
          height="44px"
        />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12} css={{ margin: "10px" }}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              {car.state.split(" ")[0][0] +
                car.state.split(" ")[1][0] +
                " " +
                car.regNumber}
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>
              {startDate.split("T")[0]} to {endDate.split("T")[0]}
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Divider />
      <Card.Footer>
        <Row justify="flex-end">
          <Button flat color="warning" size="sm" onPress={onPress}>
            Add Comment
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BookingCard;
