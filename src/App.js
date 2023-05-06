
import './App.css';
import Explore from './Explore';
import MyBooking from './MyBookings';
import MyListings from './MyListings';
import Navbar from "./Navbar/index";
import React,{useState} from "react";


function App() {
  const [isExploreSelected,setIsExploreSelected]=useState(true);
  const [isMyBookingsSelected,setIsMyBookingsSelected]=useState(false);
  const [isMyListingsSelected,setIsMyListingsSelected]=useState(false);

  console.log(localStorage.getItem('userId'))
 
  return (
    <>
    <Navbar isExploreSelected={isExploreSelected} isMyBookingsSelected={isMyBookingsSelected} isMyListingsSelected={isMyListingsSelected} setIsMyBookingsSelected={setIsMyBookingsSelected} setIsMyListingsSelected={setIsMyListingsSelected} setIsExploreSelected={setIsExploreSelected}/>
    {isExploreSelected && <Explore/>}
    {isMyBookingsSelected && <MyBooking/>}
    {isMyListingsSelected && <MyListings/>}
    </>
    );
}

export default App;
