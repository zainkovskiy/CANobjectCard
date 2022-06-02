import React from "react";

import './Description.scss';

export function Description(props){
  return(
    <div className="descrption">
      <span>Описание</span>
      { props.comment }
    </div>
  )
}