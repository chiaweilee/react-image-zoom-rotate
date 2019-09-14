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
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
