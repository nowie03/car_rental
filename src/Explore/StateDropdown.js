import React,{useState} from 'react'
import { Dropdown } from '@nextui-org/react'

const StateDropdown = ({selected,setSelected}) => {

    const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry",
      ];
      
  return (
    <Dropdown>
    <Dropdown.Button
      flat
      color="secondary"
      css={{ tt: "capitalize" ,marginTop: "30px"}}
    >
      {selected}
    </Dropdown.Button>
    <Dropdown.Menu
      aria-label="Single selection actions"
      color="secondary"
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={selected}
      onSelectionChange={setSelected}
    >
    <Dropdown.Item  key="all">All</Dropdown.Item>
  {states.map((state) => (
    <Dropdown.Item key={state}>{state}</Dropdown.Item>
  ))}
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default StateDropdown
