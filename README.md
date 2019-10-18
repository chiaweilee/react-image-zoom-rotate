# react-image-zoom-rotate
🔍React image zoom and rotate component

# Install

```
npm install react-image-zoom-rotate --save
```

# Usage

```js
import ImageZoom from 'react-image-zoom-rotate';
```

```jsx
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
```
