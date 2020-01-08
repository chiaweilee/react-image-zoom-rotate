// ref: https://umijs.org/config/
export default {
  base: '/react-image-zoom-rotate/',
  publicPath: '/react-image-zoom-rotate/',
  cssPublicPath: '/react-image-zoom-rotate/',
  runtimePublicPath: true,
  outputPath: 'docs',
  chainWebpack(config /* , { webpack } */) {
    config.plugins.delete('progress');
  },
};
