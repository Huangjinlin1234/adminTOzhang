import request from '@/utils/request';

export function roleEditApi(params) {
  return request({
    url: '/console/api/s/role',
    method: 'POST',
    data: params
  });
}

export function roleViewApi(params) {
  return request({
    url: '/console/api/s/roles/user',
    method: 'POST',
    data: params
  });
}
export function cancelRoleApi(params) {
  return request({
    url: '/console/api/s/roles/user',
    method: 'POST',
    data: params
  });
}
