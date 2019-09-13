import React from 'react';
import ImageZoom from 'js-image-zoom';

interface ReactImageZoomProps {
  width: number;
  height?: number;
  zoomWidth: number;
  img: string;
  scale?: number;
  offset?: {
    vertical?: number;
    horizontal?: number;
  };
  zoomStyle?: string;
  zoomLensStyle?: string;
}

export default class ReactImageZoom extends React.PureComponent<ReactImageZoomProps> {
  private container: any;
  private imageZoom: any;

  public render() {
    return (
      <div style={this.containerStyle} ref={ref => (this.container = ref)}>
        {this.props.children}
      </div>
    );
  }

  public componentDidMount() {
    this.imageZoom = new ImageZoom(this.container, this.initProps);
  }

  public componentWillUnmount() {
    this.imageZoom.kill();
    this.imageZoom = void 0;
  }

  public componentDidUpdate(
    prevProps: Readonly<ReactImageZoomProps>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    if (prevProps !== this.props) {
      this.imageZoom.kill();
      this.imageZoom = new ImageZoom(this.container, this.initProps);
    }
  }

  private get initProps() {
    const { children: DONOTUSED, ...props } = this.props;
    return props;
  }

  private get containerStyle() {
    const { width } = this.props;
    return {
      /* fix: zoom lens did not unmount when mouseover from right border */ width: `${width}px`,
      /* fix: space */ fontSize: 0,
    };
  }
}
