import React, { useContext } from "react";
import MarkersMap from "./MyMap/MyMap";
import { MapContainer, GeoJSON } from "react-leaflet";
import styled from "styled-components";
import rails from "./railways.js";
import Context from "../../store/Context";
const position = [31.90341, 34.806831];

export const MyMapContainer = () => {
   const context = useContext(Context);
   return (
      <>
         <GlobalContainer>
            <i
               className="fas fa-globe"
               onClick={() => context.setGoCenter([31.90341, 34.806831])}
            ></i>
         </GlobalContainer>
         <MapContainerStyled
            boundsOptions={{ padding: [50, 50] }}
            className="map"
            center={position}
            zoom={8}
            zoomControl={false}
         >
            <MarkersMap />
            <GeoJSON data={rails} style={{ color: "black" }} />
         </MapContainerStyled>
      </>
   );
};

const MapContainerStyled = styled(MapContainer)`
   position: absolute;
   top: 50%;
   right: 0;
   transform: translateY(-50%);
   height: 100%;
   width: 100%;
   margin: 0;
   padding: 0;
   border: 1px solid black;
   border-radius: 0.2rem;
   z-index: 0;
`;

const GlobalContainer = styled.div`
   position: absolute;
   z-index: 1;
   right: 0.5rem;
   top: 0.5rem;
   padding: 0.2rem;
   border-radius: 0.2rem;
   background-color: rgb(63, 81, 181);
   box-shadow: -1px 1px 14px -4px #1a1a1a;
   cursor: pointer;
   i {
      font-size: 2rem;
      color: white;
   }
`;
