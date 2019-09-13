import React from 'react';
import ReactImageZoom from './ImageZoom';
import ImageLoader from './ImageLoader';
import { defaultZoomStyle, defaultZoomLensStyle } from './style';
import { hyphenateCss } from 'aliba';
import { StyleObject } from 'aliba/types';

interface ImageZoomProps extends ReactImageZoomProps {
  rotate?: (clockwise: () => void, antiClockwise: () => void) => any;
}

interface ReactImageZoomProps {
  width: number;
  height?: number;
  zoomWidth: number;
  src: string;
  scale?: number;
  offset?: {
    vertical?: number;
    horizontal?: number;
  };
  zoomStyle?: StyleObject;
  zoomLensStyle?: StyleObject;
}

interface ImageZoomState {
  url: string;
  degree: number;
}

export default class ImageZoom extends React.PureComponent<ImageZoomProps, ImageZoomState> {
  private imageLoader: any;
  public state: any = {
    url: '',
    degree: 0,
  };

  public render() {
    return <ReactImageZoom {...this.reactImageZoomProps}>{this.renderChildren}</ReactImageZoom>;
  }

  public componentDidUpdate(
    prevProps: Readonly<ImageZoomProps>,
    prevState: Readonly<ImageZoomState>,
    snapshot?: any,
  ): void {
    if (!!this.props.rotate) {
      if (prevProps.src !== this.props.src) {
        // image changed
        // reload images
        delete this.imageLoader;
        this.loadRotateImage();
      } else if (prevState.degree !== this.state.degree) {
        // degree changed
        if (this.state.degree !== 0) {
          this.loadRotateImage();
        } else {
          // unnecessary to load image degree 0
          this.setState({
            url: '',
          });
        }
      }
    }
  }

  private get renderChildren() {
    if (typeof this.props.rotate === 'function') {
      return this.props.rotate(this.rotateIt.bind(this, true), this.rotateIt.bind(this, false));
    }

    return '';
  }

  private get reactImageZoomProps() {
    const { url } = this.state;
    const { width, height, zoomWidth, src, scale, offset, zoomStyle, zoomLensStyle } = this.props;
    return {
      width,
      height,
      zoomWidth,
      img: url || src,
      scale,
      offset,
      zoomStyle: hyphenateCss(Object.assign({}, defaultZoomStyle, zoomStyle)),
      zoomLensStyle: hyphenateCss(Object.assign({}, defaultZoomLensStyle, zoomLensStyle)),
    };
  }

  private rotateIt(clockwise = false as boolean) {
    this.setState(state => {
      if (state.degree === 270 && clockwise === true) {
        return {
          degree: 0,
        };
      } if (state.degree === 0 && clockwise === false) {
        return {
          degree: 270,
        };
      } else {
        if (clockwise === true) {
          return {
            degree: state.degree + 90,
          };
        } else {
          return {
            degree: state.degree - 90,
          };
        }
      }
    });
  }

  private loadRotateImage() {
    const { rotate, src } = this.props;
    const { degree } = this.state;

    if (!rotate && !degree) {
      // rotate not allowed
      // unnecessary to load degree 0
      return;
    }

    if (typeof this.imageLoader === 'undefined') {
      this.imageLoader = new ImageLoader(src);
    }

    this.imageLoader.draw(degree, (blobURL: string) => {
      this.setState({
        url: blobURL,
      });
    });
  }
}
