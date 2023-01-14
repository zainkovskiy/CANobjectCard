import React from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { YMaps, Map, Placemark, FullscreenControl } from "react-yandex-maps";
import { Button } from "@mui/material";

export function Cords(props) {
  const { cords } = props;
  return (
    <>
    <DialogTitle>Карта</DialogTitle>
      <YMaps>
        <Map
          defaultState={
            {
              center: cords.length > 0 ? cords : [55.030204, 82.920430],
              zoom: 14,
            }}
          width={'100%'}
          height={400}
        >
          {
            cords.length > 0 &&
            <Placemark
              geometry={cords}
            />
          }
          <FullscreenControl />
        </Map>
      </YMaps>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          onClick={props.onClose}
        >
          Закрыть
        </Button>
      </DialogActions>
    </>
  )
}