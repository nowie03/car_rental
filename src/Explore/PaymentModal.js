import React ,{useState}from 'react'
import { Grid, Input, Modal, Text, Link, Card ,Button,Row,Col} from "@nextui-org/react";


const PaymentModal = ({make,model,price,visible,setVisible}) => {
    
 
  
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <Modal blur noPadding open={visible} onClose={closeHandler}>
      <Card >
          <Card.Header>
            <Text b>Rent car</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>
            Are you sure you want to rent this {make} {model} for {price} per km
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm" light onClick={closeHandler}>
                Cancel
              </Button>
              <Button size="sm">Agree</Button>
            </Row>
          </Card.Footer>
        </Card>
      </Modal>
  )
}

export default PaymentModal
