import request from '@/utils/request';

export function getUserList(params, url) {
  return request({
    url,
    method: 'POST',
    data: params
  });
}
export function userEdit(params) {
  return request({
    url: '/console/api/s/user',
    method: 'post',
    data: params
  });
}
export function queryUser(params) {
  return request({
    url: '/console/api/s/isTeller',
    method: 'post',
    data: params
  });
}
export function getTrfData(params) {
  return request({
    url: '/console/api/s/queryRoleAll',
    method: 'post',
    data: params
  });
}
export function saveTransfer(params, url) {
  return request({
    url,
    method: 'post',
    data: params
  });
}
