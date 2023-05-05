import React from 'react'
import {Image,Grid,Text} from "@nextui-org/react"
import { Divider } from 'gestalt'

const Car = () => {
  return (
  <Grid.Container >
  <Grid xs={12} css={{maxHeight:"350px"}}>
  <Image   
    showSkeleton
    objectFit="cover"
    height={"100%"}
    width={"100%"}
    maxDelay={10000}
    src="https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80"
    alt="Default Image"
    
  />
  </Grid>
  <Grid xs={6} css={{borderRight:"1px solid black"}}>
    <Text>Hello</Text>
  </Grid>
  <Grid xs={6}>
    <Text>Hello</Text>
  </Grid>
</Grid.Container>
  )
}

export default Car
