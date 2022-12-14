/* eslint camelcase: 0 */
import store from '@/store'
import { logger, clone, sessionStore } from '@/utils/util'
import { router } from '@/router'
import { getToken, putToken, logoutCleanFn } from '@/utils/oauth'
import {
  X_AUTHORIZATION,
  XIAO_YU_TOKEN
} from '@/config/constant/app.data.common'
import { showMessage, showMessageAlert, getBaseUrl } from '@/utils/util'
import { refreshTokenFn } from '@/api/common/oauth'
import { isdebug, resHeader, requestLoading } from '../index'
import { MessageBox, Loading } from 'yuwp-ui'
import { getLanguage } from '@/utils/i18n'
import { mock } from 'mockjs'
// const mockEnable = process.env.VUE_APP_MOCK_ENABLE === 'true'
const mockMode = process.env.VUE_APP_MOCK_MODE === 'true' // 模拟模式，true真实express服务，false XHR拦截方式

const qs = require('qs')
/**
 * 解析接口返回报文头
 * @param {Object} header 报文头信息
 * @return {Boolean} true|false 解析结果状态
 */
function analysisResponseHeader(header) {
  // 解析报文头
  let xyHead = header[resHeader]
  try {
    xyHead = xyHead ? JSON.parse(xyHead) : {}
  } catch (e) {
    logger.error(`解析HttpReponseHeader ${resHeader}错误`)
    xyHead = {}
    return false
  }
  // 流水序列号
  const seqNo = xyHead.seqNo
  let seqNoInfo = ''
  if (seqNo !== undefined && seqNo !== '') {
    seqNoInfo = '\n【' + seqNo + '】'
  }
  const retStatus = xyHead.retStatus
  // S-交易成功；F-交易失败；O-交易授权；C-交易确认；B-授权+确认；X-交易状态未知。
  switch (retStatus) {
    case 'S':
    case 'F':
    case 'X':
      {
        const retArray = xyHead.retArray || []
        const errMsg = []
        let errFlag = false
        let logoutFlag = false
        for (let i = 0, len = retArray.length; i < len; i++) {
          const ret = retArray[i]
          // 非000000，即交易出现异常
          if (ret.retCode !== '000000') {
            errFlag = true
            errMsg.push(
              '【' + ret.retCode + '】' + decodeURIComponent(ret.retMsg)
            )
          }
          if (ret.retCode === 'UA0001') {
            logoutFlag = true
          }
        }
        if (errFlag) {
          // event.code = 1
          // event.message = clone(retArray, {})
          if (logoutFlag) {
            // TODO 调用退出登录
            store.dispatch('oauth/logout').then(() => {
              window.location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          } else {
            seqNoInfo ? errMsg.push(seqNoInfo) : ''
            showMessageAlert(errMsg.join('\n'))
          }
          return false
        }
      }
      break
    case 'B':
    case 'O':
    case 'C':
      // B C O 不做任何处理，直接返回回调，由业务功能自行处理
      break
    default: {
      // mock为true时，不直接返回，因为mock无法模拟HttpResponseHeader--xyHead
      if (!mockMode) {
        showMessage(`【X】响应报文头无${resHeader}参数!${seqNoInfo}`)
        return false
      }
      break
    }
  }
  return true
}

/**
 * 配置信息
 * config: {
 *  url: '/user', // 是将用于请求的服务器URL
 *  method: 'post', //是发出请求时使用的请求方法,默认post
 *  baseURL: 'http://127.0.0.1:8012/api/', // 将被添加到`url`前面，除非`url`是绝对的。 // 可以方便地为 axios 的实例设置`baseURL`，以便将相对 URL 传递给该实例的方法。
 *  headers: {'X-Requested-With': 'XMLHttpRequest'}, // 是要发送的自定义 headers
 *  params: {
 *    ID: 12345
 *  }, // 是要与请求一起发送的URL参数 // 必须是纯对象或URLSearchParams对象 // 必须是纯对象或URLSearchParams对象
 *  data: {firstName: 'Fred'}, // 是要作为请求主体发送的数据
 *  timeout: 1000, // 指定请求超时之前的毫秒数。 // 如果请求的时间超过'timeout'，请求将被中止
 *  withCredentials: false, // 指示是否跨站点访问控制请求,默认值:true
 *  responseType: 'json', // 表示服务器将响应的数据类型,默认值：json,包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
 *  maxContentLength: 2000, // 定义允许的http响应内容的最大大小
 *  // 这将设置一个`Proxy-Authorization` header，覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers。
 *  proxy: {
 *    host: '127.0.0.1',
 *    port: 9000,
 *    auth: {
 *      username: 'mikeymike',
 *      password: 'rapunz3l'
 *    }
 *  }
 */
export const requestConfig = {
  // retry: false, // 失败后是否重试，数字时表示重试次数
  // retryDelay: 0, // 失败后重试时间
  // isHeader: false, // 是否解析返回头
  needToken: true, // 是否传认证Token值去后台
  // method: 'POST', // 默认POST，支持4种访问类型 GET/POST/PUT/DELETE
  // async: true, // 异步请求
  data: {}, // 请求数据
  headers: {
    'Accept-Language': getLanguage() === 'zh_CN' ? 'zh-CN' : 'en-US'
  }, // 后端实现多语言 前端配合传递标识参数
  // headers: { // http请求头
  //   'Content-Type': 'application/json; charset=UTF-8'
  //   // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // dataType: 'json', // 默认返回数据类型
  baseURL: process.env.VUE_APP_BASE_API // api 的 base_url
  // baseURL: getBaseUrl() // api 的 base_url
}
let _requests = [] // 等待请求列表
/**
 * 请求前置处理函数
 * @param {Object} config 配置参数
 * @return {Object} 将配置参数处理后,返回调用参数
 */
export function requestSuccessFunc(config) {
  // isdebug && logger.warn('【request-interceptor】', `url: ${config.url}`, config)
  // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
  // Do something before request is sent
  // 展示loading
  debugger
  let option
  // config.withCredentials = false; // 请求头中不携带cookie
  const target =
    (config.loadingUi && config.loadingUi.target) ||
    (config.loadingUi && config.loadingUi.option.target) ||
    requestLoading.target
  if ((config.loadingUi && !config.loadingUi.show) || requestLoading.show) {
    if (target) {
      option = {
        target: target, // Loading 需要覆盖的 DOM 节点
        body: true // 遮罩是否插入至 DOM 中的 body 中，true: 插入，false: 不插入，
      }
    } else {
      option = {
        fullscreen: true, // 遮罩是否全屏
        lock: true
      }
    }
    // 显示loading
    // 每个请求拥有一个loading实例
    // config.instance = Loading.service(option);
  }
  if (requestConfig.needToken === true && config.needToken === undefined) {
    config.needToken = requestConfig.needToken
  }
  // 对于默认没有传递，登录相关请求都是有传递该值
  if (config.needToken && !config.headers[X_AUTHORIZATION]) {
    // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    // const _refreshToken = isRefreshToken()
    const _refreshToken = false // todo 适应后端认真策略 关闭token刷新步骤
    if (_refreshToken === true) {
      refreshTokenFn({
        grant_type: 'refresh_token',
        refresh_token: sessionStore.get(XIAO_YU_TOKEN).refresh_token
      })
        .then((res) => {
          // 记录 access_token 时间（相对于浏览器客户端来说），默认减去1min中
          const { access_token, expires_in, refresh_token } = res
          if (access_token) {
            putToken({ access_token, expires_in, refresh_token })
          } else {
            logoutCleanFn()
          }
          _requests.forEach((cb) => cb(access_token))
          _requests = [] // 执行完成后，清空队列
        })
        .catch((res) => {
          logoutCleanFn()
        })
      return new Promise((resolve) => {
        _requests.push((access_token) => {
          config.headers[X_AUTHORIZATION] = access_token
          resolve(config)
        })
      })
    }

    const token = getToken()
    if (token) {
      config.headers[X_AUTHORIZATION] = token.access_token
    } else {
      // 若token不存在，表示会话过期，终止请求
      logger.warn('Session expiration request termination')
      return false
    }
  }
  // 传递参数转换
  if (config.method.toLowerCase() === 'post') {
    if (!config.data && config.params) {
      config.data = config.params
    }
  } else if (config.method.toLowerCase() === 'get') {
    if (!config.params && config.data) {
      config.params = config.data
    }
    // 修复axios在IE下缓存导致不重新请求数据的BUG
    if (!config.params) {
      config.params = {}
      config.params['timestamp'] = new Date().getTime()
    }
  }
  const contentType = config.headers['Content-Type']
  // 修改axios post请求默认headers值
  config.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
  if (
    contentType &&
    contentType.indexOf('application/x-www-form-urlencoded') > -1
  ) {
    config.data = qs.stringify(config.data || {})
  }
  if (requestConfig.baseURL) {
    config.baseURL = requestConfig.baseURL
  }
  config.headers['Accept-Language'] = requestConfig.headers['Accept-Language']
  // TODO 将数据根据请求类型，转换params 和 data参数
  return config
}

/**
 * 请求前置失败处理函数
 * @param {Object} config 配置参数
 * @return {Promise} 将配置参数处理后,返回调用参数
 */
export function requestFailFunc(error) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  return Promise.reject(error)
}

/**
 * 请求成功处理函数
 * @param {Object} response 返回对象
 * response: {
 *  config: {url: "adminsmlookupitem/weblist", method: "get", params: {…}, headers: {…}, baseURL: "", …}
 *  data: {data: {…}}
 *  headers: {date: "Tue, 03 Sep 2019 06:57:43 GMT", etag: "W/"95-n5AxojPuAQKqPigfmnzv5Sd505A"", x-mock-api: "xyMock", connection: "keep-alive", x-powered-by: "Express", …}
 *  request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 60000, withCredentials: true, upload: XMLHttpRequestUpload, …}
 *  status: 200
 *  statusText: "OK"
 * }
 */
// var successCode = ['20100003', '30100022', '30100026', '30100024', '30100034', '30100029', '30100035', '10100001'];
var successCode = [
  20100003,
  30100022,
  30100026,
  30100024,
  30100034,
  30100029,
  30100035,
  '00000000',
  '10000002'
]
export function responseSuccessFunc(res) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  const resData = res.data || res
  // 加延迟才可观察到loading的效果
  setTimeout(function () {
    // 关闭loading
    res && res.config.instance && res.config.instance.close()
  }, 100)
  // 解析报文头信息
  if (resHeader && res.headers && !analysisResponseHeader(res.headers)) {
    return Promise.reject(`解析HttpReponseHeader ${resHeader}错误`)
  }
  // 配置拦截信息,解析报文头
  // api/xxljobindex/triggerchartdate 接口返回code='200'
  const code = String(resData.code)
  if (
    resData &&
    code !== 'undefined' &&
    code !== '20000' &&
    code !== '200' &&
    code !== '0' &&
    successCode.indexOf(code) === -1
  ) {
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (
      code === '50008' ||
      code === '50012' ||
      code === '50014' ||
      code === '10000001'
    ) {
      // 请自行在引入 MessageBox
      // import { Message, MessageBox } from 'element-ui'
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('oauth/resetToken').then(() => {
          window.location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else {
      // 智能图谱系统专属错误代码处理  错误代码放在 msg中
      showMessage(resData.message || resData.msg, 'error')
    }
    return Promise.reject(res).catch(() => {
      // 关闭loading
      res &&
        res.config &&
        res.config.loadingUi &&
        res.config.loadingUi.option.loadingInstance.close()
    })
  } else {
    return resData
  }
}

/**
 * 请求失败处理函数
 * @param {Object} error 错误信息
 */
// todo 暂时配合后端调整码值，还需要标准化
// var strategyCode = ['10000001', '10000003', '10400000', '10000005', '10000006', '10000007', '10300005', '10300004', '10200005', '10300006', '10100020', '10300002', '10100021', '10100022', '10100023', '10100024', '10300007', '10000004']; //登录认证策略错误码，理论上只有登录页会拿到这些错误码，so交给登录页处理
export function responseFailFunc(error) {
  const getWayEorrCode = ['90000001', '90000002', '90000003'] // 网关401错误接口
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  const res = error && error.response
  // 错误信息中无其他数据信息，直接打印错误
  if (!res) {
    return Promise.reject(error)
  }
  const status = res.status
  // 对返回状态进行处理
  switch (status) {
    // mock数据问题，暂时跳过，所以break
    // case 401:
    //   // if (strategyCode.indexOf(res.data.code) > -1) {
    //   //   break;
    //   // }
    //   // 不是网关的，就是登录页的401，在登录页面做处理
    //   if (getWayEorrCode.indexOf(res.data.code) < 0) {
    //     break;
    //   }

    //   const errorMsg = getLanguage() === 'zh_CN' ? '会话已过期，请重新登录' : 'Session expired, please login again';
    //   showMessage(errorMsg, 'error');
    //   store.dispatch('oauth/logout', true).then(() => {
    //     window.location.reload(); // 为了重新实例化vue-router对象 避免bug
    //   });
    //   break;
    case 403:
      showMessage('您无权限访问，请联系系统管理员!')
      break
    case 404:
      showMessage('请求错误[404]')
      break
    default:
      showMessage('系统错误，请联系系统管理员!')
      break
  }
  if (status === 401 && getWayEorrCode.indexOf(res.data.code) < 0) {
    return Promise.reject(error, res)
  } else {
    return Promise.reject(error, res).catch((err) => {
      console.log(err)
      // 关闭loading
      res &&
        res.config &&
        res.config.loadingUi &&
        res.config.loadingUi.option.loadingInstance.close()
    })
  }
  // TODO 下面代码为接口报错后重试
  // const config = res.config
  // // 判断是否配置了重试
  // if (!config || !config.retry) return Promise.reject(err)
  // if (!config.shouldRetry || typeof config.shouldRetry !== 'function') return Promise.reject(err)

  // // 判断是否满足重试条件
  // if (!config.shouldRetry(err)) return Promise.reject(err)

  // // 设置重试次数
  // config.__retryCount = config.__retryCount || 0
  // if (config.__retryCount >= config.retry) return Promise.reject(err)

  // // 重试次数自增
  // config.__retryCount += 1

  // // 延时处理
  // var backoff = new Promise(function (resolve) {
  //   setTimeout(function () {
  //       resolve()
  //   }, config.retryDelay || 1)
  // })
  // config.data = qs.parse(config.data)
  // // 重新发起axios请求
  // return backoff.then(() => {
  //     return AxiosInst(config)
  // })
}
