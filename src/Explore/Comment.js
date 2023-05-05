import React from 'react'
import {Card,Text} from "@nextui-org/react"

const Comment = ({message}) => {
  return (
    <Card variant="flat" css={{margin:"5px 5px"}}>
    <Card.Body>
    {message}
    </Card.Body>
  </Card>
  )
}

export default Comment
