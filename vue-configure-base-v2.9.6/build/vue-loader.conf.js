//根据当前的开发环境对webpack中的vue-loader进行配置
'use strict'
//引入utils.js
const utils = require('./utils')
//引入config/index.js
const config = require('../config')
//判断是不是生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 根据所处环境是否生成sourceMap用于代码调试
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  // 配置在.vue文件中的css相关处理规则
  loaders: utils.cssLoaders({
    //是否开始sourceMap 用来调试
    sourceMap: sourceMapEnabled,
    //是否单独提取抽离css
    extract: isProduction
  }),
  //记录压缩的代码，用来找到源码位置
  cssSourceMap: sourceMapEnabled,
  //是否缓存破坏
  cacheBusting: config.dev.cacheBusting,
  //transformToRequire的作用是在模块编译的过程中，编译器可以将某些属性，比如src转换为require调用
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}

// 注释参考来源：https://blog.csdn.net/xiaoxiaoluckylucky/article/details/86218216
