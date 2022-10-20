import Cookies from "js-cookie";
import JSEncrypt from "jsencrypt";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
// 匹配密码加密
export function encryptPassword(pwd) {
  var encryptor = new JSEncrypt();
  encryptor.setPublicKey(getRSAPublicKey());
  return encryptor.encrypt(pwd);
}
/**
 * 获取公钥字符串
 */
export function getRSAPublicKey() {
  return "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAYwQ81rc1KW8tTYpxrLS3ArVxB40otmbWyXwgDQRkLsCuQKiq6KZgAM/8sJuI12S1JVOXnMu5d420vKFFS/+Ibz4TxqjhLmgownaguMTbAGBzIPvfN5lL52mDmm/CvKu2YPCFvZV8YulNTCexvuj7OiWRUXpAbaQqu5tPOjGytQIDAQAB";
}
