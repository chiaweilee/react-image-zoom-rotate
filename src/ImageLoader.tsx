interface ImgCache {
  [key: number]: string;
}

export default class ImageLoader {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private img: HTMLImageElement;
  private imgCache: ImgCache;
  private src: string;
  private naturalWidth: number;
  private naturalHeight: number;
  private max: number;
  constructor(src: string) {
    this.src = src;
    this.imgCache = {};
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    return this;
  }

  draw(degrees = 0 as number, callback?: (blobURL: string) => void) {
    const cache = this.imgCache[degrees];
    if (typeof cache !== 'undefined') {
      if (typeof callback === 'function') {
        callback(cache);
      }
      return;
    }

    if (typeof this.img === 'undefined') {
      // not ready, retry after loaded
      this.loadOriginImage(this.src, () => {
        this.draw(degrees, callback);
      });
      return;
    }

    const { max, width, height, offset, clipX, clipY } = this.computeDrawWidthHeight(degrees);
    this.canvas.width = this.canvas.height = max;
    // rotate canvas
    this.ctx.translate(offset, offset);
    this.ctx.rotate((degrees * Math.PI) / 180);
    this.ctx.translate(-offset, -offset);
    // draw image
    this.ctx.drawImage(this.img, clipX, clipY);
    // copy image data
    const imageData = this.ctx.getImageData(0, 0, width, height);
    // reset canvas size
    this.canvas.width = width;
    this.canvas.height = height;
    // parse image data
    this.ctx.putImageData(imageData, 0, 0);
    //  dataURL
    const base64 = this.canvas.toDataURL();
    //  blob
    const blob = this.dataURLtoBlob(base64);
    //  blobUrl
    const blobURL = this.blobtoURL(blob);
    // write cache
    this.imgCache[degrees] = blobURL;
    // callback
    if (typeof callback === 'function') {
      // callback
      callback(blobURL);
    }
  }

  private loadOriginImage(src: string, callback?: () => void) {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      this.img = img;
      this.naturalWidth = img.naturalWidth;
      this.naturalHeight = img.naturalHeight;
      this.max = Math.max(img.naturalWidth, img.naturalHeight);
      if (typeof callback === 'function') {
        callback();
      }
    };
  }

  private computeDrawWidthHeight(degrees: number) {
    const width = this.naturalWidth;
    const height = this.naturalHeight;
    const max = this.max;
    const vertical = width < height;
    switch (degrees) {
      case 90:
        return {
          max,
          width: height,
          height: width,
          offset: max / 2,
          clipX: !vertical ? max - width : 0,
          clipY: !vertical ? max - height : 0,
        };
      case 270:
        return {
          max,
          width: height,
          height: width,
          offset: max / 2,
          clipX: !vertical ? 0 : max - width,
          clipY: !vertical ? 0 : 0,
        };
      case 180:
        return {
          max,
          width,
          height,
          offset: max / 2,
          clipX: max - width,
          clipY: max - height,
        };
      default:
    }
  }

  private dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  private blobtoURL(blob: Blob): string {
    return URL.createObjectURL(blob);
  }
}
