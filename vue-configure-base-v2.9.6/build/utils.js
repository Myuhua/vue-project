// vue-cli的utils.js
'use strict'
// 引入nodejs路径模块
const path = require('path')
// 引入config目录下的index.js配置文件
const config = require('../config')
// 引入extract-text-webpack-plugin插件，用来将css提取到单独的css文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 引入package.json文件
const packageConfig = require('../package.json')
// exports其实就是一个对象，用来导出方法的，最终还是使用module.exports，此处导出assetsPath 资源路径
exports.assetsPath = function (_path) {
  //如果是生产环境，则为config/index.js 文件中build配置，否则为dev配置
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  // 返回一个干净的相对根路径。path.join和path.posix.join的区别就是，前者返回的是完整的路径（绝对路径，如C:a/a/b/xiangmu/b），后者返回的是完整路径的相对根路径（最后一级路径，如b）
  return path.posix.join(assetsSubDirectory, _path)
}

// 导出css加载器相关配置
exports.cssLoaders = function (options) {
  // options如果不为null或者undefined，0，""等等就原样，否则就是{}。在js里面,||运算符，A||B，A如果为真，直接返回A。如果为假，直接返回B（不会判断B是什么类型）
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    // options是用来传递参数给loader的
    // Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
    // 有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    //选用加载器并加入到数组
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        // Object.assign是es6的方法，主要用来合并对象的，浅拷贝
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // 注意这个extract是自定义的属性，可以定义在options里面，主要作用就是当配置为true就把文件单独提取，false表示不单独提取，这个可以在使用的时候单独配置。
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
    // 上面这段代码就是用来返回最终读取和导入loader，来处理对应类型的文件
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    // css对应 vue-style-loader 和 css-loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    // less对应 vue-style-loader 和 less-loader
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 下面这个主要处理import这种方式导入的文件类型的打包，上面的exports.cssLoaders是为这一步服务的
exports.styleLoaders = function (options) {
  const output = []
  // 下面就是生成的各种css文件的loader对象
  const loaders = exports.cssLoaders(options)
  // 把每一种文件的laoder都提取出来
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      // 把最终的结果都push到output数组中
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  //发送跨平台通知系统
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return
    //当报错时输出错误信息的标题，错误信息详情，副标题以及图标
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 注释参考来源 https://www.cnblogs.com/wulinzi/p/8072815.html
