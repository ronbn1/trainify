import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { renderToStaticMarkup } from "react-dom/server";
import { v4 as uuidv4 } from "uuid";

import L, { map } from "leaflet";
import { TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "./MarkersMap.css";
import { divIcon } from "leaflet";
import { trainStations } from "../train_stations";
import trainMarker from "./—Pngtree—blue sea map marker set_4809937.png";
import Context from "../../../store/Context";
const zoomedOutMarkers = [
   {
      name: "מכרז",
      geometry: {
         coordinates: [34.82490206582461, 32.168566019799705],
      },
   },
   {
      name: "דרום",
      geometry: {
         coordinates: [34.766165920264456, 31.250806491219517],
      },
   },
   {
      name: "צפון",
      geometry: {
         coordinates: [35.24717177529602, 32.66467863192663],
      },
   },
];
const MarkersMap = () => {
   const context = useContext(Context);
   const map = useMap();
   const [mapZoom, setMapZoom] = useState(map.getZoom());

   map.on("zoomend", () => {
      setMapZoom(map.getZoom());
   });

   const iconMarkup = renderToStaticMarkup(
      <Mark>
         <p>מרכז</p>
      </Mark>
   );
   useEffect(() => {
      if (context.goToFromNaveBar)
         map.flyTo(
            [context.goToFromNaveBar[1], context.goToFromNaveBar[0]],
            12
         );
   }, [context.goToFromNaveBar]);

   useEffect(() => {
      if (context.goCenter)
         map.flyTo([context.goCenter[0], context.goCenter[1]], 8);
   }, [context.goCenter]);

   const customMarkerIcon = divIcon({
      html: iconMarkup,
   });

   const handleCenterClick = (item) => {
      map.flyTo(
         [item.geometry.coordinates[1], item.geometry.coordinates[0]],
         10
      );
   };

   const renderZoomedOutMarkers = () => {
      const markers = zoomedOutMarkers.map((item, index) => {
         return (
            <Marker
               key={uuidv4()}
               position={[
                  parseFloat(item.geometry.coordinates[1]),
                  parseFloat(item.geometry.coordinates[0]),
               ]}
               eventHandlers={{
                  click: (e) => {
                     handleCenterClick(item);
                  },
               }}
            ></Marker>
         );
      });
      return markers;
   };
   const renderIsraelMarker = () => {
      return (
         <Marker
            key={uuidv4()}
            position={[32.168566019799705, 34.82490206582461]}
            eventHandlers={{
               click: (e) => {
                  map.flyTo([32.168566019799705, 34.82490206582461], 10);
               },
            }}
         ></Marker>
      );
   };

   return (
      <>
         <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {mapZoom >= 10
            ? trainStations.map((item, index) => {
                 return (
                    <Marker
                       key={uuidv4()}
                       position={[
                          parseFloat(item.geometry.coordinates[1]),
                          parseFloat(item.geometry.coordinates[0]),
                       ]}
                    >
                       <Popup style={{ maxHeight: "5rem" }}>
                          <h1 style={{ textAlign: "right" }}>
                             {item.properties.name}
                          </h1>
                          <h2 style={{ textAlign: "right" }}>
                             {item.properties.address}
                          </h2>
                          <p
                             style={{
                                textAlign: "right",
                             }}
                          >
                             קווים ישירים היוצאים מתחנה זו:
                          </p>
                          <div
                             style={{
                                display: "flex",
                                flexFlow: "column wrap",
                                maxHeight: "15rem",
                                overflowX: "auto",
                                flexWrap: "nowrap",
                                alignItems: "center",
                                direction: "ltr",
                             }}
                          >
                             {item.properties.direct_destination.map((d) => (
                                <p
                                   style={{
                                      textAlign: "right",
                                      margin: "1px",
                                   }}
                                >
                                   {` ${d} `}
                                </p>
                             ))}
                          </div>
                       </Popup>
                    </Marker>
                 );
              })
            : map.getZoom() >= 6
            ? renderZoomedOutMarkers()
            : renderIsraelMarker()}
      </>
   );
};
const Mark = styled.div`
   width: 4rem;
   height: 4rem;
   background-color: red;
   border-radius: 50%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   right: 1rem;
   bottom: 1rem;
   p {
      font-size: 1.5rem;
      font-weight: 500;
   }
`;

const icon = L.icon({
   //iconUrl: trainMarker,
   //    shadowUrl: leafShadow,
   iconSize: [30, 60], // size of the icon
   //    shadowSize: [50, 64], // size of the shadow
   //    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
   //    shadowAnchor: [4, 62], // the same for the shadow
   //    popupAnchor: [-3, -76],
});

// const Ic = L.icon({
//    iconUrl: CenterVector,
//    //shadowUrl: leafShadow,
//    iconSize: [30, 60], // size of the icon
//    shadowSize: [50, 64], // size of the shadow
//    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//    shadowAnchor: [4, 62], // the same for the shadow
//    popupAnchor: [-3, -76],
// });

export default MarkersMap;

// const MyMap = styled(MapContainer)`
//    height: 100%;
//    width: 100%;
// `;

// const SelectLayers = styled.div`
//    width: 10rem;
//    height: 10rem;
//    background-color: red;
//    position: absolute;
//    top: 1rem;
//    right: 2rem;
//    z-index: 1;
// `;
// const icon = L.icon({
//    iconUrl: SchoolVector,
//    //shadowUrl: leafShadow,
//    iconSize: [30, 60], // size of the icon
//    shadowSize: [50, 64], // size of the shadow
//    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//    shadowAnchor: [4, 62], // the same for the shadow
//    popupAnchor: [-3, -76],
// });

// const Ic = L.icon({
//    iconUrl: CenterVector,
//    //shadowUrl: leafShadow,
//    iconSize: [30, 60], // size of the icon
//    shadowSize: [50, 64], // size of the shadow
//    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//    shadowAnchor: [4, 62], // the same for the shadow
//    popupAnchor: [-3, -76],
// });
