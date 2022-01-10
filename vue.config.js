require('events').EventEmitter.defaultMaxListeners = 50;
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: ["babel-polyfill", "./src/main.js"],
  },
  // transpileDependencies: ['tiptap','tiptap-commands','tiptap-utils','vue-swipe-actions'],
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      // '/api': {
      //   // 프록시 요청을 보낼 서버의 주소
      //   target: 'http://localhost:3000'
      // },
      '/api/admin': {
        target: 'http://localhost:4001/api/admin',
        changeOrigin: true,
        pathRewrite: {
          '^/api/admin': ''
        }
      },
      '/api/login': {
        target: 'http://localhost:4001/api/login',
        changeOrigin: true,
        pathRewrite: {
          '^/api/login': ''
        }
      },
      '/api/mail': {
        target: 'http://localhost:4001/api/mail',
        changeOrigin: true,
        pathRewrite: {
          '^/api/mail': ''
        }
      },
      '/api/myinfo': {
        target: 'http://localhost:4001/api/myinfo',
        changeOrigin: true,
        pathRewrite: {
          '^/api/myinfo': ''
        }
      },
      '/api/languages': {
        target: 'http://localhost:4001/api/languages',
        changeOrigin: true,
        pathRewrite: {
          '^/api/languages': ''
        }
      },
      
    }
  },
  publicPath: '/',
  assetsDir: 'admin'
}