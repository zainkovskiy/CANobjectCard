import React from "react";

import './Linear.scss';

import LinearProgress from '@mui/material/LinearProgress';

export function Linear() {
  return (
    <div>
      <LinearProgress />
      <p className="linear__text">Идет загрузка...</p>
    </div>
  );
}