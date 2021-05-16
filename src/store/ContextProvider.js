import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
   const [goToFromNaveBar, setGoToFromNaveBar] = useState();
   const [goCenter, setGoCenter] = useState();

   return (
      <Context.Provider
         value={{ goToFromNaveBar, setGoToFromNaveBar, goCenter, setGoCenter }}
      >
         {props.children}
      </Context.Provider>
   );
};

export default ContextProvider;
