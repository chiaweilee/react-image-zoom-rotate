import React, { useState } from 'react';
import { Button } from 'antd';
import ImageZoom from '../';
import img1 from '../assets/iu.jpeg';
import img2 from '../assets/iu2.jpeg';
import img3 from '../assets/iu3.jpeg';
import img4 from '../assets/iu4.jpeg';
import img5 from '../assets/iu5.jpeg';
import img6 from '../assets/iu6.jpeg';
import img7 from '../assets/iu7.jpeg';
import img8 from '../assets/iu8.jpeg';
import img9 from '../assets/iu9.jpeg';
import img10 from '../assets/iu10.jpeg';

const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function() {
  const [imgIndex, setImgIndex] = useState(1);

  function setIndex() {
    setImgIndex(imgIndex + 1);
  }

  return (
    <div className="demo">
      <Button onClick={setIndex}>next</Button>
      <ImageZoom
        rotate={(clockwise, antiClockwise) => {
          return (
            <div>
              <Button onClick={clockwise} style={{ position: 'absolute', left: 0, zIndex: 1 }}>
                顺时间
              </Button>
              <Button onClick={antiClockwise} style={{ position: 'absolute', right: 0, zIndex: 1 }}>
                逆时间
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
