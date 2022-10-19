import request from '@/utils/request'
import JSEncrypt from 'jsencrypt'
import { getRSAPublicKey } from '@/utils/util'
export function auth(data) {
  return request({
    url: '/e4a/api/login/pubkey',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/e4a/api/oauth/token/bak',
    method: 'post',
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
