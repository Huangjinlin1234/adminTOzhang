/**
 * @created by pan
 * @updated by helin3 2019-04-06
 * @description vue-cli 配置
 */
'use strict'
const path = require('path')
const pkg = require('./package.json')
// const mocksServer = require("./mock/mocks-server.js");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const defaultSettings = require('./src/config')
const glob = require('glob')
const PAGES_PATH = path.resolve(__dirname, './src/pages')

const name = defaultSettings.title // 网页浏览器标题
const publicPath = process.env.VUE_APP_PUBLIC_PATH // 部署路径
const devPort = process.env.VUE_APP_DEV_PORT // dev默认端口号，启动被占用时自动+1
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir) // 当前目录，即项目根目录解析
const pages = {} // 多入口列表

/**
 * 开发模式，获取代理配置
 * 注: 若配置项VUE_APP_BASE_API包含协议、域名[IP]、端口[可选]，开发模式则默认配置代理
 */
const getProxyConfig = () => {
  const devEnv = process.env.NODE_ENV === 'development' // 开发环境
  const baseApi = process.env.VUE_APP_BASE_API // 应用服务前缀URL
  let proxyPrefix = process.env.VUE_APP_PROXY_PREFIX // 代理API前缀
  const match = /^(https?:\/\/[0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?/i // 匹配URL(协议+域名+端口)
  const matchResult = match.exec(baseApi)

  let devServerProxy = {} // 配置的代理对象，默认false，为空
  if (devEnv && matchResult) {
    // VUE_APP_BASE_API代理配置演示，/dev-proxy-api/xxx-api/* => https://172.16.20.92:8102/xxx-api/*
    // 详见: https://cli.vuejs.org/config/#devserver-proxy
    // 可数组配置多个
    if (Object.prototype.toString.call(proxyPrefix) === '[object String]') {
      proxyPrefix = proxyPrefix.split(',')
    }
    if (Array.isArray(proxyPrefix)) {
      proxyPrefix.forEach((item) => {
        devServerProxy[item] = {
          target: `${matchResult[1] + matchResult[2]}`, // 协议+域名
          changeOrigin: true
          // pathRewrite: {
          //   ['^' + item]: ''
          // }
        }
      })
    }
  }
  devServerProxy =
    JSON.stringify(devServerProxy) == '{}' ? false : devServerProxy
  console.log('配置代理', devServerProxy)
  return devServerProxy
}

console.log(name, pkg.version)

// 多页应用配置
if (defaultSettings.mpa) {
  // 配置 pages 目录下的多页面，通过循环获取每一个 page 文件夹下的 html 和 js
  glob.sync(PAGES_PATH + '/*/main.js').forEach((filePath) => {
    const pageName = path.basename(path.dirname(filePath))
    console.log('多页面路径', pageName, path.dirname(filePath))
    pages[pageName] = {
      entry: filePath,
      template: path.dirname(filePath) + '/index.html',
      filename: `${pageName}.html`,
      chunks: [
        'chunk-vendors',
        'chunk-common',
        pageName,
        `manifest.${pageName}`
      ]
    }
    if (pageName === 'login') {
      pages[pageName].inject = false
    }
  })
}
// 增加系统默认的index主页
pages['index'] = {
  entry: 'src/main.js',
  template: 'public/index.html',
  filename: 'index.html',
  chunks: [
    'chunk-libs',
    'chunk-YUWPUI',
    'chunk-common',
    'index',
    'manifest.index'
  ]
}

// 详细配置见：https://cli.vuejs.org/config/
// 可通过执行 yarn inspect 查看整个配置信息
const exportsConfig = {
  /**
   * APP应用若计划部署在应用服务器子目录，则需要设置publicPath,
   * 例如：你计划部署在GitHub Pages上，访问路径为：https://your.github.io/app/,则你此处应配置为：'/app/'
   * 默认配置为根：'/'
   */
  publicPath: publicPath,
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: process.env.NODE_ENV === 'development',
  runtimeCompiler: true,
  pages: pages,
  devServer: {
    disableHostCheck: true,
    port: devPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: getProxyConfig()
    // after: mocksServer,
  },
  configureWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    return {
      name: name,
      resolve: {
        alias: {
          '@': resolve('src'),
          assets: resolve('src/assets'),
          static: resolve('public/static')
        }
      },
      output: {
        filename: '[name].[hash:8].js'
      },
      externals: {
        //  需要将对应的js文件直接在index.html中引入
        // 为兼容多入口引入公共文件不一致
        vue: 'Vue',
        'vue-router': 'window.VueRouter || {}',
        vuex: 'window.Vuex || {}',
        // 'axios': 'window.axios || {}',
        // // 'xy-utils': 'window.XYUTILS || {}',
        xlsx: 'window.XLSX || {}',
        echarts: 'window.echarts || {}'
        // 'jquery': 'window.jQuery || {}',
        // 'tinymce': 'window.tinymce || {}'
      }
    }
  },
  chainWebpack(config) {
    // 单页时删除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 多入口时删除对应的预加载 vue-cli删除预加载时，匹配各入口名称
    var keys = Object.keys(pages)
    keys.forEach((k) => {
      config.plugins.delete(`prefetch-${k}`)
      config.plugins.delete(`preload-${k}`)
    })

    if (process.env.IS_ANALYZ) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // 修复HMR
    config.resolve.symlinks(true)
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
    // config.plugin("html").tap(args => {
    //   // 修复 Lazy loading routes Error
    //   args[0].chunksSortMode = "none";
    //   // html中添加cdn
    //   // args[0].cdn = cdn;
    //   return args;
    // })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/common/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/common/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // 图片压缩
    // config.module
    //   .rule("image-webpack-loader")
    //   .test(/\.(gif|png|jpe?g|svg)$/i)
    //   .use("file-loader")
    //   .loader("image-webpack-loader")
    //   .tap(() => ({
    //     disable: process.env.NODE_ENV !== "production"
    //   }))
    //   .end()
    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', (config) =>
      config.devtool('cheap-source-map')
    )
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        elementUI: {
          name: 'chunk-YUWPUI', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?yuwp-ui(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    })
    // config.optimization.runtimeChunk('single'),
    // {
    //   from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
    //   to:'./', //到根目录下
    // }
  },
  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    requireModuleExtension: false,
    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,
    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,
    loaderOptions: {
      sass: {
        implementation: require('sass') // This line must in sass option
      },
      css: {
        // options here will be passed to css-loader
        // exclude: /(main|main_ext).css/,
      }
    }
  }
}

module.exports = exportsConfig
