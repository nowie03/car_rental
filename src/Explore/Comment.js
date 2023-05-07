import React from "react";
import { Card, Avatar, Row, Text, Col } from "@nextui-org/react";

const Comment = ({ comment }) => {
  return (
    <Card variant="flat" css={{ margin: "5px 5px" }}>
      <Card.Body>{comment.message}</Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Text>{new Date(comment.createdAt).toLocaleString()}</Text>
          </Col>
          <Col>
            <Avatar squared text={comment.fromUser.email.split("@")[0]} />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default Comment;
