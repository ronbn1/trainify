import React from "react";
import { MyMapContainer } from "./Components/MapContainer/MapContainer.js";
import NavBar from "./Components/NavBar/NavBar";
const App = () => {
   return (
      <div>
         <NavBar />
         <MyMapContainer />
      </div>
   );
};

export default App;
