const utils = require('./utils')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'xr-frame': utils.resolve('xr-frame/index.js'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
}