import React, { useState } from 'react';

import SimpleImageSlider from "react-simple-image-slider";

import './CarouselImages.scss';
import fullScreenOpen from 'image/fullscreen-open.svg';
import fullScreenClose from 'image/fullscreen-close.svg';

export function CarouselImages(props) {
  const { images } = props;

  const [full, setFull] = useState(false)

  const normalStyle = {
    position: 'relative',
  }
  const fullStyle = {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0
  }

  return (
    <div style={!full ? normalStyle : {}}>
      <SimpleImageSlider
        width={'100%'}
        images={images}
        height={full ? '100%' : 300}
        showBullets={true}
        showNavs={true}
        bgColor={'#ccc'}
        style={full ? fullStyle : normalStyle}
      />
      <img
        className='carousel__close'
        src={full ? fullScreenClose : fullScreenOpen}
        onClick={() => setFull(!full)}
        alt="btn"
      />
    </div>
  )
}