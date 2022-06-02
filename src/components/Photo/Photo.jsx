import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';

import './Photo.scss';

export function Photo(props) {
  const { images } = props;

  const [full, setFull] = useState(false)

  return (
    <ImageGallery items={images.map(img => (
      {
        original: img.url,
        thumbnail: img.url,
        originalHeight: !full && 300
      }
    ))}
      thumbnailPosition={'left'}
      lazyLoad={true}
      autoPlay={true}
      slideDuration={300}
      onErrorImageURL={'https://crm.centralnoe.ru/dealincom/assets/img/placeholder.png'}
      onScreenChange={(event) => setFull(event)}
    />
  )
} 
