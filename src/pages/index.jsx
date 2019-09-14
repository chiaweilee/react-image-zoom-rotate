import React, { useState } from 'react';
import { Button } from 'antd';
import ImageZoom from '../';
import img1 from '../assets/iu.jpeg';
import img2 from '../assets/iu2.jpeg';
import img3 from '../assets/iu3.jpeg';
import img4 from '../assets/iu4.jpeg';
import img5 from '../assets/iu5.jpeg';
import img7 from '../assets/iu7.jpeg';
import img8 from '../assets/iu8.jpeg';
import img10 from '../assets/iu10.jpeg';

const imgs = [img1, img2, img3, img4, img5, img7, img8, img10];

export default function() {
  const [imgIndex, setImgIndex] = useState(1);

  function setIndex(next) {
    if (next) {
      setImgIndex(imgIndex + 1);
    } else {
      setImgIndex(imgIndex - 1);
    }
  }

  return (
    <div className="demo">
      <Button onClick={setIndex} disabled={imgIndex >= imgs.length - 1}>
        next
      </Button>
      <Button onClick={setIndex.bind(null, false)} disabled={imgIndex === 1}>
        previous
      </Button>
      <ImageZoom
        rotate={(clockwise, antiClockwise) => {
          return (
            <div>
              <Button onClick={clockwise} style={{ position: 'absolute', right: 0, zIndex: 1 }}>
                clockwise
              </Button>
              <Button onClick={antiClockwise} style={{ position: 'absolute', left: 0, zIndex: 1 }}>
                anti-clockwise
              </Button>
            </div>
          );
        }}
        src={imgs[imgIndex]}
        width={400}
        zoomWidth={500}
      />
    </div>
  );
}
