const { resolve, getComponentEntries } = require('./utils')
const pub = require('./config.pub')
const CopyWebpackPlugin = require("copy-webpack-plugin") //引入插件

module.exports = {
  outputDir: resolve('dist'),
  assetsDir: resolve('public/onekit'),
  publicPath: resolve('./'),
  lintOnSave: 'warning', // 如果你不需要使用eslint，把lintOnSave设为false即可
  productionSourceMap: false, // 生产环境不产生未加密的map文件
  configureWebpack: {
    entry: {
      ...getComponentEntries('xr-frame'),
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
      library: 'xr-frame',
      chunkFilename: "[id]/index.js"
    },
    resolve: pub.resolve,

    plugins: [
      new CopyWebpackPlugin({
        patterns: [{
          from: "./public/onekit",
          to: 'public/onekit'
        }]
      })
    ]
  },
  css: {
    extract: false,
    sourceMap: true,
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('html')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
        return option
      })
  }
}
