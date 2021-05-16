import React, { useState, useEffect } from "react";
import { trainStations } from "../MapContainer/‏‏train_stations";
import styled from "styled-components";
const SearchComponent = () => {
   const [trains, setTrains] = useState([]);
   const [filterTrains, setFilterTrains] = useState([]);
   const [showList, setShowList] = useState(false);
   const [value, setValue] = useState("");
   let trainsNames = [];

   useEffect(() => {
      trainsNames = trainStations.map((t) => t.properties.name);
      setTrains(trainsNames);
   }, []);

   useEffect(() => {
      filter();
   }, [value]);
   const filter = () => {
      if (value !== "") {
         const filtered = trains.filter((t) => t.includes(t));
         setTrains(filtered);
         console.log(value);
      } else {
         setTrains(trainsNames);
      }
   };
   return (
      <Container>
         <input
            onFocus={() => setShowList(true)}
            onBlur={() => {
               //    setShowList(false);
            }}
            value={value}
            onChange={(e) => {
               setValue(e.target.value);
            }}
         ></input>
         {showList && (
            <List>
               {trains.map((t) => (
                  <p
                     onClick={(e) => {
                        setValue(e.target.outerText);
                     }}
                  >
                     {t}
                  </p>
               ))}
            </List>
         )}
      </Container>
   );
};
const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   input {
      height: 2rem;
      width: 15rem;
   }
`;
const List = styled.div`
   margin: 0 auto;
   padding: 1rem;
   text-align: center;
   width: 250px;
   height: 250px;
   overflow-y: scroll;
   border: 1px solid black;
   border-radius: 0.5rem;
   p {
      margin-top: 0.2rem;
   }
`;
export default SearchComponent;
