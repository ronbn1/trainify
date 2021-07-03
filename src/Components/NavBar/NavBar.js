import React, { useContext } from "react";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { trainStations } from "../MapContainer/train_stations";
import TextField from "@material-ui/core/TextField";
import Context from "../../store/Context";

const NavBar = () => {
   const [isOpen, setIsOpen] = React.useState(false);
   const context = useContext(Context);

   const onSearch = (e) => {
      const trainName = e.target.innerText;
      const trainObj = trainStations.filter(
         (t) => t.properties.name == trainName
      );
      const trainCoordinate = trainObj[0]?.geometry?.coordinates;
      context.setGoToFromNaveBar(trainCoordinate);
   };

   const onSelect = (e) => {
      switch (e?.target?.defaultValue) {
         case "דרום":
            context.setGoToFromNaveBar([
               34.766165920264456, 31.250806491219517,
            ]);
            break;
         case "מרכז":
            context.setGoToFromNaveBar([34.82490206582461, 32.168566019799705]);
            break;
         case "צפון":
            context.setGoToFromNaveBar([35.24717177529602, 32.66467863192663]);
            break;
      }
   };
   const list = () => (
      <SideBarMenu>
         <Logo>Trainify</Logo>
         <ShowBy>
            <FormLabel component="legend">הצג לפי איזור</FormLabel>
            <RadioGroup
               row
               aria-label="position"
               name="position"
               defaultValue="End"
               onChange={onSelect}
            >
               <FormControlLabel
                  value="דרום"
                  control={<Radio color="primary" />}
                  label="דרום"
               />
               <FormControlLabel
                  value="מרכז"
                  control={<Radio color="primary" />}
                  label="מרכז"
               />
               <FormControlLabel
                  value="צפון"
                  control={<Radio color="primary" />}
                  label="צפון"
               />
            </RadioGroup>
         </ShowBy>
         <Search>
            <Autocomplete
               id="combo-box-demo"
               onChange={onSearch}
               options={trainStations}
               getOptionLabel={(t) => {
                  return t.properties.name;
               }}
               style={{ width: 250 }}
               renderInput={(params) => {
                  return (
                     <TextField
                        {...params}
                        dir="rtl"
                        rtl
                        placeholder="בחר תחנה"
                        variant="outlined"
                     />
                  );
               }}
            />
         </Search>
      </SideBarMenu>
   );

   return (
      <Container>
            <Button
               onClick={() => {
                  setIsOpen(true);
               }}
               style={{ padding: "0" }}
            >
               <OpenBtn>
                  <span>
                     <i className="fas fa-chevron-right"></i>
                  </span>
               </OpenBtn>
            </Button>
            <Drawer
               open={isOpen}
               onClose={() => {
                  setIsOpen(false);
               }}
               root={{ position: "absolute", left: 0 }}
            >
               {list()}
            </Drawer>
      </Container>
   );
};

const Container = styled.div`
   position: relative;
   .MuiButton-root {
      position: absolute;
      left: 0;
   }
`;
const OpenBtn = styled.div`
   height: 100vh;
   width: 1rem;
   padding: 0;
   margin-left: -3rem;
   margin-top: 0rem;
   background-color: #ffffff;
   position: relative;
   right: 0;
   top: -1;
   z-index: 1;
   box-shadow: 1px 1px 20px -4px;
   display: flex;
   align-items: center;
   span {
      margin: 0.2rem;
   }
`;

const SideBarMenu = styled.div`
   position: relative;
   width: 300px;
`;

const Logo = styled.h1`
   font-family: "Comfortaa", cursive;
   font-size: rem;
   text-align: center;
   margin-top: 1rem;
`;
const ShowBy = styled.div`
   direction: rtl;
   margin: 2rem 1rem;
`;

const Search = styled.div`
   label {
      direction: rtl !important;
   }
   font-size: 1rem;
   text-align: right;
   margin-top: 1rem;
   display: flex;
   justify-content: center;
   .MuiAutocomplete-popper {
      display: flex;
      justify-content: center;
      color: red;
      span {
         justify-self: center;
         text-align: center;
      }
   }
`;

export default NavBar;