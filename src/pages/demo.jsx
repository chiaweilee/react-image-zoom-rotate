import ImageZoom from '../';
import img from '../assets/iu.jpeg';

export default function() {
  return (
    <ImageZoom
      rotate={(clockwise, antiClockwise) => {
        return (
          <div>
            <button onClick={clockwise} style={{ position: 'absolute', left: 0, zIndex: 1 }}>
              顺时间
            </button>
            <button onClick={antiClockwise} style={{ position: 'absolute', right: 0, zIndex: 1 }}>
              逆时间
            </button>
          </div>
        );
      }}
      src={img}
      width={400}
      zoomWidth={500}
    />
  );
}
