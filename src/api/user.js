// import request from '@/utils/request'
import { request } from 'xy-utils'
import JSEncrypt from 'jsencrypt'
import { getRSAPublicKey } from '@/utils/util'
import backend from '@/config/constant/app.data.service'
export function auth(data) {
  return request({
    url: backend.uaaService + '/api/login/pubkey',
    method: 'post',
    needToken: false,
    data
  })
}

export function login(data) {
  return request({
    url: backend.uaaService + '/api/oauth/token/bak',
    method: 'post',
    needToken: false,
    data
  })
}
/**
 * 用户会话信息获取API
 */
export function getSessionInfoFn(data) {
  return request({
    url: backend.uaaService + '/api/session/info',
    method: 'POST',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 匹配密码加密
export function encryptPassword(pwd) {
  var encryptor = new JSEncrypt()
  encryptor.setPublicKey(getRSAPublicKey())
  return encryptor.encrypt(pwd)
}
