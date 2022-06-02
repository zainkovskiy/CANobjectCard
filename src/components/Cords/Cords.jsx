import React from "react";
import { YMaps, Map, Placemark, FullscreenControl } from "react-yandex-maps";

export function Cords(props) {
  const { cords } =  props;
  return (
    <YMaps>
      <Map
        defaultState={
          { 
            center: cords.length > 0 ? cords : [55.030204, 82.920430], 
            zoom: 14 ,
          }}
        width={'100%'}
        height={300}
      >
        {
          cords.length > 0 &&
          <Placemark
            geometry={cords}
        />
        }
        <FullscreenControl/>
      </Map>
    </YMaps>
  )
}