const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end();
        config.plugins.delete(('prefetch'));
        // config.plugin('prefetch').tap(option => {
        //   option[0].fileBlacklist = option[0].fileBlacklist || [];
        //   option[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/);
        //   return option;
        // });
      }
    }
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false // 是否删除原文件
          })
        ]
      };
    }
  },
};
