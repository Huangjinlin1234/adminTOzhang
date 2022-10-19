/**
 * @created by kongqf
 * @description 公共组件-入口
 */
import Vue from 'vue'
import lookup from '@/config/lookup'
import license from '@/config/license'
import {
  requestConfig,
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from '@/config/interceptors/axios'
import XyUtils from 'xy-utils'
import backend from '@/config/constant/app.data.service'
// import * as filters from '@/utils/filters' // global filters
import service from '@/utils/yufp.ajax'
// import Dialog from '@/utils/dialog'
import * as xutils from '@/utils/xutils'

window.backend = backend // 为方便兼容，直接将对象挂载到全局 // 因app.data.service在mock服务中引用，window对象不存在
// console.log('字典管理配置', [lookup, XyUtils])

// XHR 方式注册拦截 mock api
const mockEnable = process.env.VUE_APP_MOCK_ENABLE === 'true'
const mockMode = process.env.VUE_APP_MOCK_MODE === 'true' // 模拟模式，true真实express服务，false XHR拦截方式

if (mockEnable && !mockMode) {
  const { mockXHR } = require('@/../mock')
  mockXHR()
}
Vue.use(XyUtils, {
  lookup: lookup,
  license: license,
  request: {
    config: requestConfig,
    requestSuccessFunc,
    requestFailFunc,
    responseSuccessFunc,
    responseFailFunc
  }
})
// 注册自定义Dialog插件
// Vue.use(Dialog)
Vue.prototype.$xutils = xutils
// 接口服务名注册至Vue全局
Vue.prototype.$backend = backend
Vue.prototype.$request = (param) => {
  // 为兼容旧组件同步方法使用 #TODO 其他方式禁止使用该方式，如果需要实现同步，可使用async/await
  if (param.async === false) {
    return service.request(param)
  } else {
    return XyUtils.request(param)
  }
}

// 全局注入一个date json格式化方法 // TODO 临时存放
/**
 * 日期默认格式
 * @returns {*}
 */
/* eslint no-extend-native: 0 */
Date.prototype.toJSON = function () {
  return XyUtils.dateFormat(this, '{y}-{m}-{d}')
}

// // 注册全局工具类过滤器.
// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key])
// })
/**
 * 递归触发事件
 * @param {String} eventName 事件名称
 * @param {Object} data 事件发送数据对象
 */
Vue.prototype.$dispatch = function (eventName, data) {
  let parent = this.$parent
  while (parent) {
    parent.$emit(eventName, data)
    parent = parent.$parent
  }
}
/**
 * 广播事件
 * @param {String} eventName 事件名称
 * @param {Object} data 事件发送数据对象
 */
Vue.prototype.$broadcase = function (eventName, data) {
  const broadcase = function () {
    this.$children.forEach((child) => {
      child.$emit(eventName, data)
      if (child.$children) {
        broadcase.call(child, eventName, data)
      }
    })
  }
  broadcase.call(this, eventName, data)
}
/**
 * 生成唯一识别号
 * @param {String} len 长度
 * @param {Object} radix
 */
Vue.prototype.genUUID = function (len, radix) {
  var chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = [];
  var i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

export * from 'xy-utils' // 内部已经注册 $lookup、$utils，在 vue 中可以通过 vm.$lookup/vm.$utils 直接使用
